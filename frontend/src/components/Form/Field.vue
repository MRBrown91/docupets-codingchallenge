<template>
  <div class="form-group">
    <label :for="fieldKey">{{ fieldName }}</label>
    <slot></slot>
    <small v-if="fieldErrors" v-for="error in fieldErrors" class="text-danger">
      <span>{{error}}</span>
    </small>
  </div>
</template>


<script>
export default {
  name: 'Field',
  props: ['fieldName', 'fieldKey', 'fieldErrors']
};
</script>