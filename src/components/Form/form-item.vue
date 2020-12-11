<template>
  <div class="item">
    <slot></slot>
    <p class="tips" v-if="errMsg || validateStatus === 'error'">
      {{ errMsg || errorMessage }}
    </p>
  </div>
</template>

<script>
import Schema from 'async-validator'

export default {
  props: {
    prop: { type: String, default: '' },
    errMsg: { type: String, default: '' }
  },
  data () {
    return {
      validateStatus: '',
      errorMessage: ''
    }
  },
  provide () {
    return {
      formItem: this,
      getErrMsg: () => this.errMsg
    }
  },
  inject: ['form'],
  methods: {
    validate (val) {
      const validator = new Schema({ [this.prop]: this.form.rules[this.prop] })

      validator.validate({ [this.prop]: val }, err => {
        if (err) {
          this.validateStatus = 'error'
          this.errorMessage = err[0].message
        } else {
          this.validateStatus = ''
          this.errorMessage = ''
        }
      })
    }
  },
  created () {
    this.$on('validate', this.validate)
  },
  beforeDestroy () {
    this.$off('validate', this.validate)
  }
}
</script>

<style>
</style>