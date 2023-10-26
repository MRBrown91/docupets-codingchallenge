<template>
  <div class="container border rounded">
    <div class="page-header">
      <h2>Tell us about your {{ petTypeDisplay }}</h2>
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

        <Field
            field-key="petType"
            field-name="What type of pet do you have?"
            :field-errors="errors.petType">
          <br>
          <RadioGroup :options="petTypes" field="pet-types" :model-value="petType" @input="(value) => this.petType=value" />
          <br>
        </Field>

        <Field
            field-key="petName"
            :field-name="'What is your ' + petTypeDisplay + 's name?'"
            :field-errors="errors.petName">
          <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.petName }"
              id="petName"
              name="petName"
              v-model="petName"
          />
        </Field>

        <Field
            field-key="breed"
            :field-name="'What breed are they?'"
            :field-errors="errors.breed">
          <v-select :options="breeds" :filter="breedSearch" v-model="breed"></v-select>
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

        <button v-if="loading" class="btn btn-primary" type="button" disabled>
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
    petTypes: {dog: "Dog", cat: "Cat"},
    genders: {female: "Female", male: "Male"},
    nobreedReasons: {unknown: "I don't know", mix: "It's a mix"},
    breeds: ['corgi', 'lab', 'dalmation', 'Can\'t find it?']
  }),
  computed: {
    loading: {
      get () {
        return this.$store.state.pet.loading
      }
    },
    redirect: {
      get () {
        return this.$store.state.pet.redirect
      }
    },
    petName: {
      get () {
        return this.$store.state.pet.petName
      },
      set (value) {
        this.$store.commit('pet/updatePetName', value)
        this.$store.dispatch('pet/validatePetName')
      }
    },
    petType: {
      get () {
        return this.$store.state.pet.petType
      },
      set (value) {
        this.$store.commit('pet/updatePetType', value)
        this.$store.dispatch('pet/validatePetType')
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
    ...mapGetters('pet', ['isExisting', 'petTypeDisplay', 'noBreed', 'isMix', 'hasError', 'hasServerError', 'getServerError'])
  },
  watch: {
    redirect(newValue) {
      if (newValue) {
        this.$store.commit('pets/setSuccess', this.success)
        this.$router.push(newValue);
      }
    },
    '$route.params.id': {
      handler: function (id) {
        this.$store.commit('pet/setRedirect', null)
        if (id) {
          this.$store.commit('pet/setPetId', id)
          this.$store.dispatch('pet/loadPet')
        } else {
          this.$store.commit('pet/unsetPet')
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    save() {
      this.$store.dispatch('pet/validatePetName')
      this.$store.dispatch('pet/validatePetType')
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
    breedSearch(options, search) {
      return options.filter((option) => option.includes(search) || option === 'Can\'t find it?');
    },
  }
};
</script>