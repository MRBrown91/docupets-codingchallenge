<template>
  <input
      type="radio"
      :class="type==='form' ? 'form-check-input' : 'btn-check'"
      :id="id"
      :value="option"
      :checked="checked"
      @change="$emit('input', $event.target.value)"/>
  <label
      :class="type==='form' ? 'form-check-label' : 'btn btn-outline-primary'"
      :for="id">
    {{ label }}
  </label>
</template>

<script>
export default {
  name: 'RadioButton',
  emits: ['input'],
  props: {
    id: {
      required: true,
      type: String,
    },
    label: {
      required: true,
      type: String,
    },
    option: {
      required: true,
      type: String,
    },
    checked: {
      default: false,
      type: Boolean,
    },
    type: {
      default: 'button',
      type: String,
    }
  }
}
</script>