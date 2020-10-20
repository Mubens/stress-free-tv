<template>
  <input
    :class="{ error: isError, focus: isFocus && !isError }"
    :type="type"
    :value="value"
    :placeholder="placeholder"
    @input="handleInput"
    @focus="isFocus = true"
    @blur="isFocus = false"
  />
</template>

<script>
export default {
  props: {
    type: { type: String, default: 'text' },
    value: { type: String, default: '' },
    placeholder: { type: String, default: '' }
  },
  data () {
    return {
      isFocus: false
    }
  },
  inject: ['formItem', 'getErrMsg'],
  computed: {
    isError () {
      return this.getErrMsg() || this.formItem.validateStatus === 'error'
    }
  },
  watch: {
    value () {
      if (!this.isError) {
        this.$emit('success')
      }
    }
  },
  methods: {
    handleInput (e) {
      const value = e.target.value
      this.$emit('input', value)
      this.formItem.$emit('validate', value)
    }
  }
}
</script>

<style scoped>
.error {
  border-color: #ff6b6b;
}
.focus {
  border-color: #00a1d6;
}

input {
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 0 15px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  color: #888;
}
</style>