<template>
  <transition name="fade-input-tips" mode="in-out">
    <span
      v-if="
        !errorMsg.required &&
          errorMsg.$invalid &&
          typeof errorMsg.required !== 'undefined' &&
          errorMsg.$dirty
      "
      class="global-error"
    >
      field is required
    </span>
    <span
      v-else-if="
        !errorMsg.maxLength &&
          errorMsg.$invalid &&
          typeof errorMsg.maxLength !== 'undefined' &&
          errorMsg.$dirty
      "
      class="global-error"
    >
      field shouldn't be longer then {{ maxInputLength }}
    </span>
    <span v-else-if="exceedBudget" class="global-error">
      Only {{ exceedBudget }} is available. Get modest ;)
    </span>
  </transition>
</template>

<script>
export default {
  name: 'AErrorMessage',
  props: {
    errorMsg: {
      default: null
    },
    maxInputLength: {
      type: Number
    },
    exceedBudget: {
      type: Number
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
