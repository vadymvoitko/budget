<template>
  <transition name="fade-input-tips" mode="in-out">
    <span
      v-if="
        !validation.required &&
          validation.$invalid &&
          typeof validation.required !== 'undefined' &&
          validation.$dirty
      "
      class="global-error"
    >
      field is required
    </span>
    <span
      v-else-if="
        !validation.maxLength &&
          validation.$invalid &&
          typeof validation.maxLength !== 'undefined' &&
          validation.$dirty
      "
      class="global-error"
    >
      field shouldn't be longer then {{ maxInputLength }}
    </span>
    <span
      v-else-if="
        !validation.alpha &&
          validation.$invalid &&
          typeof validation.alpha !== 'undefined' &&
          validation.$dirty
      "
      class="global-error"
    >
      only letters allowed
    </span>
    <span
      v-else-if="
        !validation.minValue &&
          validation.$invalid &&
          typeof validation.minValue !== 'undefined' &&
          validation.$dirty
      "
      class="global-error"
    >
      negative values are not allowed
    </span>
    <span v-else-if="+exceedBudget" class="global-error">
      Only {{ exceedBudget }} is available. Get modest ;)
    </span>
  </transition>
</template>

<script>
export default {
  name: 'AErrorMessage',
  props: {
    validation: {
      default: null,
      type: Object
    },
    maxInputLength: {
      default: 30,
      type: Number
    },
    exceedBudget: {
      default: 0,
      type: [Number, String]
    }
  }
}
</script>

<style lang="scss" scoped>
.global-error {
  transition: 1s ease-in-out;
  position: absolute;
  opacity: 1;
  top: 38px;
  left: 5px;
  color: red;
}

.fade-input-tips-enter-active,
.fade-input-tips-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-input-tips-enter,
  .fade-input-tips-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
