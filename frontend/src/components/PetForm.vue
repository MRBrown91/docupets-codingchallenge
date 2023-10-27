<template>
  <div class="container border rounded">
    <template v-if="loading">
      <div class="d-flex justify-content-center">
        <div class="spinner-border text-primary" role="status"></div>
      </div>
    </template>
    <template v-else>
      <div class="page-header">
        <h2 v-if="!isExisting">Tell us about your {{ typeDisplay }}</h2>
        <h2 v-else>Update us about your {{ typeDisplay }}</h2>
      </div>
      <div class="row">
        <div class="col-sm-10">
          <div
              v-if="hasServerError"
              class="alert alert-danger alert-dismissible fade show"
              role="alert">
            {{ getServerError }}
            <button type="button" class="btn-close" @click="closeError"></button>
          </div>
          <div
              v-if="hasSuccess"
              class="alert alert-success alert-dismissible fade show"
              role="alert">
            {{ getSuccess }}
            <button type="button" class="btn-close" @click="closeSuccess"></button>
          </div>

          <Field
              field-key="type"
              field-name="What type of pet do you have?"
              :field-errors="errors.type">
            <br>
            <RadioGroup :options="types" field="pet-types" :model-value="type" @input="(value) => this.type=value" />
            <br>
          </Field>

          <Field
              field-key="name"
              :field-name="'What is your ' + typeDisplay + 's name?'"
              :field-errors="errors.name">
            <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.name }"
                id="name"
                name="name"
                v-model="name"
            />
          </Field>

          <Field
              field-key="breed"
              :field-name="'What breed are they?'"
              :field-errors="errors.breed">
            <v-select :options="breedList" :filter="breedSearch" :disabled="!breedLoaded" v-model="breed"></v-select>
            <div v-if="noBreed" class="ps-lg-5 ps-xl-5">
              <label>Choose One</label>
              <RadioGroup
                  :options="nobreedReasons"
                  :model-value="noBreedReason"
                  @input="(value) => this.noBreedReason=value"
                  field="noBreedReason"
                  type="form"/>
              <input
                  v-if="isMix"
                  type="text"
                  class="form-control"
                  id="mixBreed"
                  name="mixBreed"
                  placeholder="Collie, poodle, lab"
                  v-model="mixBreed"/>
            </div>

          </Field>

          <Field
              field-key="gender"
              field-name="What gender are they?"
              :field-errors="errors.gender">
            <br>
            <RadioGroup :options="genders" field="gender" :model-value="gender" @input="(value) => this.gender=value" />
            <br>
          </Field>

          <button v-if="submitting" class="btn btn-primary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
          </button>
          <button
              v-else @click="save"
              class="btn btn-success"
              :disabled='hasError'>
            Submit
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Field from './Form/Field.vue'
import Radio from "./Form/RadioGroup.vue";
import RadioGroup from "./Form/RadioGroup.vue";

export default {
  name: 'PetForm',
  components: {RadioGroup, Radio, Field},
  data: () => ({
    types: {dog: "Dog", cat: "Cat"},
    genders: {female: "Female", male: "Male"},
    nobreedReasons: {unknown: "I don't know", mix: "It's a mix"},
  }),
  computed: {
    loading: {
      get () {
        return this.$store.state.pet.loading
      }
    },
    submitting: {
      get () {
        return this.$store.state.pet.submitting
      }
    },
    redirect: {
      get () {
        return this.$store.state.pet.redirect
      }
    },
    name: {
      get () {
        return this.$store.state.pet.name
      },
      set (value) {
        this.$store.commit('pet/updateName', value)
        this.$store.dispatch('pet/validateName')
      }
    },
    type: {
      get () {
        return this.$store.state.pet.type
      },
      set (value) {
        this.$store.commit('breeds/updateType', value)
        this.$store.commit('pet/updateType', value)
        this.$store.dispatch('pet/validateType')
      }
    },
    breed: {
      get () {
        return this.$store.state.pet.breed
      },
      set (value) {
        this.$store.commit('pet/updateBreed', value)
        this.$store.dispatch('pet/validateBreed')
      }
    },
    noBreedReason: {
      get () {
        return this.$store.state.pet.noBreedReason
      },
      set (value) {
        this.$store.commit('pet/updateNoBreedReason', value)
        this.$store.dispatch('pet/validateBreed')
      }
    },
    mixBreed: {
      get () {
        return this.$store.state.pet.mixBreed
      },
      set (value) {
        this.$store.commit('pet/updateMixBreed', value)
        this.$store.dispatch('pet/validateBreed')
      }
    },
    gender: {
      get () {
        return this.$store.state.pet.gender
      },
      set (value) {
        this.$store.commit('pet/updateGender', value)
        this.$store.dispatch('pet/validateGender')
      }
    },
    ...mapState('pet', {
      'success': state => state.success,
      'hasError': state => state.hasError,
      'errors': state => state.errors
    }),
    ...mapGetters('pet', ['isExisting', 'typeDisplay', 'noBreed', 'isMix', 'hasError', 'hasServerError', 'getServerError', 'hasSuccess', 'getSuccess']),
    ...mapGetters('breeds', ['breedLoaded', 'breedList'])
  },
  watch: {
    redirect(newValue) {
      if (newValue) {
        this.$router.push(newValue);
      }
    }
  },
  methods: {
    save() {
      this.$store.dispatch('pet/validateName')
      this.$store.dispatch('pet/validateType')
      this.$store.dispatch('pet/validateBreed')
      this.$store.dispatch('pet/validateGender')
      if (!this.hasError) {
        if (this.isExisting) {
          this.$store.dispatch('pet/editPet')
        } else {
          this.$store.dispatch('pet/addPet')
        }
      }
    },
    closeError() {
      this.$store.commit("pet/setError", null);
    },
    closeSuccess() {
      this.$store.commit("pet/setSuccess", null);
    },
    breedSearch(options, search) {
      return options.filter((option) => option.includes(search) || option === 'Can\'t find it?');
    },
  },
  created() {
    this.$store.dispatch('breeds/loadList')
    if (this.$route.params.id) {
      this.$store.commit('pet/setId', this.$route.params.id)
      this.$store.dispatch('pet/loadPet')
    }
  }
};
</script>