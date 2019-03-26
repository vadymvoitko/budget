<template>
  <div class="a-input" :class="wrapperClasses">
    <slot name="label"></slot>
    <div class="input-group">
      <div v-show="addon" class="addon">
        <span>{{ addon }}</span>
      </div>
      <p class="control has-icon has-icon-right">
        <input
          class="main-input"
          :name="name"
          :class="classes"
          :placeholder="placeholder"
          :autocomplete="autocomplete ? autocomplete : null"
          :required="required"
          :value="value"
          :type="type"
          :disabled="disabled"
          :maxlength="maxInputLength"
          @blur="onBlur"
          @change="onChange"
          @focus="onFocus"
          @input="updateValue"
          @keyup.enter="emitKeyUpEnter"
        />
        <transition
          v-if="errorMsg && errorMsg.$invalid"
          name="fade-input-tips"
          mode="in-out"
        >
          <span
            v-if="
              !errorMsg.required &&
                errorMsg.$invalid &&
                typeof errorMsg.required !== 'undefined' &&
                errorMsg.$dirty
            "
            class="help global-error"
            >{{ $l('SFNIPFieldIsRequired') }}</span
          >
          <span
            v-else-if="
              !errorMsg.maxLength &&
                errorMsg.$invalid &&
                typeof errorMsg.maxLength !== 'undefined' &&
                errorMsg.$dirty
            "
            class="help global-error"
            >{{ $l('SFNIPFieldTooLong') }}</span
          >
        </transition>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AInput',
  props: {
    value: {
      type: [String, Number]
    },
    type: {
      type: String,
      default: 'text'
    },
    errorMsg: {
      default: null
    },
    placeholder: {
      type: String
    },
    maxInputLength: {
      type: Number
    }
  },
  data() {
    return {
      isActive: false,
      isTouched: false,
      initialValue: this.value,
      initialType: this.type
    }
  },
  computed: {
    classes() {
      const classes = [
        `input-${this.size}`,
        'input',
        { 'is-disabled': this.disabled },
        { 'input-has-addon': this.addon }
      ]
      const isErrorMsg =
        typeof this.errorMsg === 'object' &&
        this.errorMsg !== null &&
        Object.keys(this.errorMsg).length !== 0
      if (isErrorMsg) {
        const errorClasses = [
          { 'is-error': this.errorMsg.$invalid && this.errorMsg.$dirty },
          { 'is-correct': this.errorMsg.$dirty && !this.errorMsg.$invalid }
        ]
        classes.concat(errorClasses)
      }
      return classes
    },
    wrapperClasses() {
      return [`a-input-theme-${this.theme}`]
    }
  },
  methods: {
    updateValue(e) {
      this.$emit('input', e.target.value)
    },
    onChange(e) {
      this.$emit('change', e.target.value, e)
    },
    onFocus(e) {
      this.isActive = true
      this.$emit('focus', e)
    },
    onBlur(e) {
      this.isActive = false
      this.$emit('blur', e)
    },
    emitKeyUpEnter(e) {
      this.$emit('keyup', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
/*@import 'assets/scss/settings/_colors.scss';*/

.input-group {
  display: flex;
  width: 100%;

  .addon {
    height: 40px;
    padding: 0 15px;
    background: #d2d1d1;
    border: 1px solid #ccc;
    border-right: none;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;

    span {
      line-height: 2.5;
    }
  }
}

.a-input {
  input::placeholder {
    color: #7c7c82;
    font-weight: 400;
  }

  input[type='number'] {
    &::-webkit-inner-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    -moz-appearance: textfield;
    -webkit-appearance: none;
    appearance: none;
  }

  .control {
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 0 0 25px;
    padding: 0;
    width: 100%;

    .show-pass {
      position: absolute;
      right: 10px;
      line-height: 45px;
      -moz-user-select: none;
      -khtml-user-select: none;
      user-select: none;

      img {
        max-width: 25px;
        cursor: pointer;
      }
    }

    input::placeholder {
      color: #7c7c82;
      // text-transform: uppercase;
    }
  }

  .input {
    font-weight: 500;
    line-height: 24px;
    background: white;
    border-radius: 5px;
    font-size: 18px;
    padding: 0 8px;
    width: 90%;

    &-normal {
      height: 40px;
    }

    &-small {
      height: 36px;
    }

    &-verify {
      height: 38px;
    }

    &-small {
      height: 20px;
    }

    &:active,
    &:focus {
      outline: none;
    }

    &.is-error {
      border-bottom-color: red;
    }

    &_normal {
      height: 40px;
    }

    &.is-disabled {
      border: 1px solid white;
      pointer-events: none;
    }

    &-has-addon {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .label {
    font-size: 14px;
    font-weight: 400;
    line-height: 35px;
  }

  .help {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    width: 100%;
    font-size: 15px;
    line-height: 15px;
    font-weight: 700;
  }

  &-theme-boxed {
    box-shadow: 0 2px 8px 2px #e7e7e9;

    .input {
      height: 47px;
      padding: 0 8px;
      font-size: 16px;
      line-height: 52px;
      font-weight: 400;
    }

    .input::placeholder {
      font-size: 12px;
      font-weight: 300;
    }

    .control {
      margin: 0 0 10px;
    }
  }

  &-theme-boxed-grey {
    height: 52px;
    box-shadow: 0 2px 8px 2px #e7e7e9;

    .input {
      height: 52px;
      margin-bottom: 25px;
      font-size: 16px;
      font-weight: 400;
      padding: 0 22px;
    }

    .input::placeholder {
      font-size: 14px;
      font-weight: 300;
    }

    .control {
      margin: 0 0 10px;
    }
  }

  &-theme-grey {
    .input {
      border: 2px solid transparent;
      transition: border-color 0.2s ease-in, color 0.2s ease-in;
    }
  }
}
</style>
