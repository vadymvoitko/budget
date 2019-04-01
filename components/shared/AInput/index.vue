<template>
  <div class="a-input">
    <div class="input-group">
      <p class="control has-icon has-icon-right">
        <label>
          <input
            class="main-input"
            placeholder=" "
            :value="value"
            :type="type"
            :maxlength="maxInputLength"
            @blur="onBlur"
            @change="onChange"
            @focus="onFocus"
            @input="updateValue"
            @keyup.enter="emitKeyUpEnter"
          />
          <span>{{ placeholder }}</span>
        </label>
        <!-- eslint-disable -->
        <transition v-if="errorMsg && errorMsg.$invalid" name="fade-input-tips" mode="in-out">
          <span
            v-if="
              !errorMsg.required &&
                errorMsg.$invalid &&
                typeof errorMsg.required !== 'undefined' &&
                errorMsg.$dirty
            "
            class="help global-error"
          >required</span>
          <span
            v-else-if="
              !errorMsg.maxLength &&
                errorMsg.$invalid &&
                typeof errorMsg.maxLength !== 'undefined' &&
                errorMsg.$dirty
            "
            class="help global-error"
          >too long</span>
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
.input-group {
  display: flex;
  width: 100%;
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
    margin: 0 10px 25px;
    padding: 0;
    border-bottom: 1px solid grey;
    width: 185px;
    transform: translateY(5px);

    input::placeholder {
      color: #7c7c82;
    }
  }
}

.main-input {
  border: 0;
  &:focus {
    outline: none;
    &::placeholder {
      transform: translateY('-20px');
    }
  }
}

label {
  position: relative;
  display: inline-block;
}

span {
  padding: 10px;
  pointer-events: none;
  position: absolute;
  left: 0;
  top: 0;
  transition: 0.2s;
  transition-timing-function: ease;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  opacity: 0.5;
}

input {
  padding: 10px;
}

input:focus + span,
input:not(:placeholder-shown) + span {
  opacity: 1;
  transform: scale(0.75) translateY(-100%) translateX(-30px);
}

input:focus + span,
input:not(:-ms-input-placeholder) + span {
  opacity: 1;
  transform: scale(0.75) translateY(-100%) translateX(-30px);
}
</style>
