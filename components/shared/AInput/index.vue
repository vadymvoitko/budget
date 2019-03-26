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
              !errorMsg.email &&
                errorMsg.$invalid &&
                typeof errorMsg.email !== 'undefined' &&
                errorMsg.$dirty
            "
            class="help global-error"
            >{{ $l('SFNIPFieldEmail') }}</span
          >
          <span
            v-else-if="
              !errorMsg.nameNotContainsNumbersOrSymbols &&
                errorMsg.$invalid &&
                typeof errorMsg.nameNotContainsNumbersOrSymbols !==
                  'undefined' &&
                errorMsg.$dirty
            "
            class="help global-error"
            >{{ $l('SFNIPFieldName') }}</span
          >
          <span
            v-else-if="
              !errorMsg.passwordContainsAlpha &&
                errorMsg.$invalid &&
                typeof errorMsg.passwordContainsAlpha !== 'undefined' &&
                errorMsg.$dirty
            "
            class="help global-error"
            >{{ $l('SFNIPPasswordOneLetter') }}</span
          >
          <span
            v-else-if="
              !errorMsg.passwordContainsNumeric &&
                errorMsg.$invalid &&
                typeof errorMsg.passwordContainsNumeric !== 'undefined' &&
                errorMsg.$dirty
            "
            class="help global-error"
            >{{ $l('SFNIPPasswordOneNumeric') }}</span
          >
          <span
            v-else-if="
              !errorMsg.passwordLength &&
                errorMsg.$invalid &&
                typeof errorMsg.passwordLength !== 'undefined' &&
                errorMsg.$dirty
            "
            class="help global-error"
            >{{ $l('SFNIPPasswordLength') }}</span
          >
          <span
            v-else-if="
              !errorMsg.numeric &&
                errorMsg.$invalid &&
                typeof errorMsg.numeric !== 'undefined' &&
                errorMsg.$dirty
            "
            class="help global-error"
            >{{ $l('SFNIPFieldNumeric') }}</span
          >
          <!-- <span class="help global-error"
								v-else-if="!errorMsg.skype && errorMsg.$invalid && typeof errorMsg.skype !== 'undefined'  && errorMsg.$dirty">{{ $l('YErrorInvalidSkype') }}</span> -->
          <span
            v-else-if="
              !errorMsg.minLength &&
                errorMsg.$invalid &&
                typeof errorMsg.minLength !== 'undefined' &&
                errorMsg.$dirty
            "
            class="help global-error"
            >{{ $l('SFNIPFieldTooShort') }}</span
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
          <span
            v-else-if="
              !errorMsg.isValidAmount &&
                errorMsg.$invalid &&
                typeof errorMsg.isValidAmount !== 'undefined' &&
                errorMsg.$dirty
            "
            class="help global-error"
            >{{ $l('SFNIPInvalidAmount') }}</span
          >
          <span
            v-else-if="
              !errorMsg.checkMaxAmount &&
                errorMsg.$invalid &&
                typeof errorMsg.checkMaxAmount !== 'undefined' &&
                errorMsg.$dirty
            "
            class="help global-error"
            >{{ $l('SFNIPInvalidAmount') }}</span
          >
          <!-- <span class="help global-error" v-else-if="!errorMsg.isEmail && errorMsg.$invalid && typeof errorMsg.isEmail !== 'undefined' && errorMsg.$dirty">{{ $l('YErrorInvalidEmail') }}</span> -->
          <!--<span class="help global-error"-->
          <!--v-else-if="!errorMsg.passwordRequired && errorMsg.$invalid && typeof errorMsg.passwordRequired !== 'undefined' && errorMsg.$dirty">Должен содержать буквы, и хотя бы 1 цифру</span>-->
          <span
            v-else-if="
              !errorMsg.phoneNumberValid &&
                errorMsg.$invalid &&
                typeof errorMsg.phoneNumberValid !== 'undefined' &&
                errorMsg.$dirty
            "
            class="help global-error"
            >{{ $l('SFNIPInvalidPhone') }}</span
          >
          <span
            v-else-if="
              !errorMsg.sameAsPassword &&
                errorMsg.$invalid &&
                typeof errorMsg.sameAsPassword !== 'undefined' &&
                errorMsg.$dirty
            "
            class="help global-error"
            >{{ $l('SFNIPPasswordTheSame') }}</span
          >
          <span
            v-else-if="
              !errorMsg.notSameAsPassword &&
                errorMsg.$invalid &&
                typeof errorMsg.notSameAsPassword !== 'undefined' &&
                errorMsg.$dirty
            "
            class="help global-error"
            >{{ $l('SFNIPPasswordNotTheSame') }}</span
          >
          <!-- <span class="help global-error"
								v-else-if="!errorMsg.notSameAsEmail && errorMsg.$invalid && typeof errorMsg.notSameAsEmail !== 'undefined' && errorMsg.$dirty">Новый e-mail не может быть равен старому</span> -->
          <!-- <span class="help global-error"
								v-else-if="!errorMsg.cyrillicName && errorMsg.$invalid && typeof errorMsg.cyrillicName !== 'undefined' && errorMsg.$dirty">Это поле может содержать только кирилицу</span> -->
          <span
            v-else-if="
              !errorMsg.alpha &&
                errorMsg.$invalid &&
                typeof errorMsg.alpha !== 'undefined' &&
                errorMsg.$dirty
            "
            class="help is-error global-error"
            >{{ $l('SFNIPOnlyAlpha') }}</span
          >
          <!-- <span class="help is-error global-error"
								v-else-if="!errorMsg.userAlreadyExists && errorMsg.$invalid && typeof errorMsg.userAlreadyExists !== 'undefined' && errorMsg.$dirty">{{ $l('YErrorUserExists') }}</span> -->
          <!-- <span class="help is-error global-error"
								v-else-if="!errorMsg.companyAlreadyExists && errorMsg.$invalid && typeof errorMsg.companyAlreadyExists !== 'undefined' && errorMsg.$dirty">{{ $l('YErrorCompanyExists') }}</span> -->
          <!-- <span class="help is-error global-error"
								v-else-if="!errorMsg.url && errorMsg.$invalid && typeof errorMsg.url !== 'undefined' && errorMsg.$dirty">{{ $l('YErrorInvalidUrl') }}</span> -->
          <!-- <span class="help is-error global-error"
								v-else-if="!errorMsg.addressIsValid && errorMsg.$invalid && typeof errorMsg.addressIsValid !== 'undefined' && errorMsg.$dirty">{{ $l('YErrorInvalidAddress') }}</span> -->
          <!--<span class="help global-error"-->
          <!--v-else-if="!errorMsg.passwordContainsAlpha && errorMsg.$invalid && typeof errorMsg.passwordContainsAlpha !== 'undefined' && errorMsg.$dirty">Пароль должен содержать хотя бы 1 букву</span>-->
          <!--<span class="help global-error"-->
          <!--v-else-if="!errorMsg.passwordContainsNumeric && errorMsg.$invalid && typeof errorMsg.passwordContainsNumeric !== 'undefined' && errorMsg.$dirty">Пароль должен содержать хотя бы 1 цифру</span>-->
          <!--<span class="help global-error"-->
          <!--v-else-if="!errorMsg.passwordLength && errorMsg.$invalid && typeof errorMsg.passwordLength !== 'undefined' && errorMsg.$dirty">Пароль слишком короткий</span>-->
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
    imgUrl: {
      type: String,
      default: ''
    },
    addon: {
      value: String
    },
    isPassword: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    size: {
      type: String,
      default: 'normal'
    },
    error: {
      type: Boolean,
      default: false
    },
    errorMsg: {
      default: null
    },
    name: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean
    },
    maxInputLength: {
      type: Number
    },
    theme: {
      type: String,
      default: 'default'
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
    },
    showValue(e) {
      if (this.isPassword) {
        this.initialType = 'text'
      }
    },
    hideValue(e) {
      if (this.isPassword) {
        this.initialType = 'password'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/scss/settings/_colors.scss';

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
  /*
		input:-webkit-autofill,
		input:-webkit-autofill:hover,
		input:-webkit-autofill:focus,
		input:-webkit-autofill,
		textarea:-webkit-autofill,
		textarea:-webkit-autofill:hover,
		textarea:-webkit-autofill:focus,
		select:-webkit-autofill,
		select:-webkit-autofill:hover,
		select:-webkit-autofill:focus {
			background-color: white !important;
			color: gray !important;
		}
		*/

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
    color: $c--input-text-color;
    font-weight: 500;
    line-height: 24px;
    background: white;
    border-radius: 5px;
    font-size: 18px;
    padding: 0 8px;
    width: 100%;

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
      color: $c--input-text-color;
      outline: none;
    }

    &.is-error {
      border-bottom-color: $c--red;
    }

    &.is-correct {
      border-bottom: 1px solid $c--input-border;
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
    color: $c--input-text-color;
    font-size: 14px;
    font-weight: 400;
    line-height: 35px;
  }

  .help {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    width: 100%;
    color: $c--error-msg;
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
      // color: $c--input-login-color;
      // background-color: $c--input-login-bg;
    }

    .input::placeholder {
      color: $c--input-text-color;
      font-size: 14px;
      font-weight: 300;
    }

    .control {
      margin: 0 0 10px;
    }
  }

  &-theme-grey {
    .input {
      background: $c--input-background-grey;
      border: 2px solid transparent;
      transition: border-color 0.2s ease-in, color 0.2s ease-in;

      &:hover,
      &:focus {
        border: 2px solid $c--input-border;
      }
    }
  }
}
</style>
