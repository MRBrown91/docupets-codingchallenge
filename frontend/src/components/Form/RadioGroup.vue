<template>
  <div :class="type==='button' ? 'btn-group' : ''">
    <template v-for="(name, key) in options">
      <RadioButton
        :id="field + '-' + key"
        :option="key"
        :label="name"
        :checked="modelValue === key"
        :type="type"
        @input="(value) => $emit('input', value)"/>
    </template>
  </div>
</template>

<script>
import RadioButton from "./RadioButton.vue";

export default {
  name: 'RadioGroup',
  emits: ['input'],
  components: {RadioButton},
  props: {
    modelValue: {
      default: undefined,
      type: String
    },
    field: {
      required: true,
      type: String
    },
    options: {
      required: true,
      type: Object
    },
    type: {
      default: 'button',
      type: String
    }
  }
}
</script>