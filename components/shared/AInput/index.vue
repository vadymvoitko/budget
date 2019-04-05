<template>
  <div class="a-input">
    <div class="input-group">
      <p
        v-if="type === 'text' || type === 'number'"
        class="control has-icon has-icon-right"
      >
        <label>
          <input
            class="main-input"
            placeholder=" "
            :value="value"
            :type="type"
            @input="updateValue"
            @blur="touchValue"
          />
          <span class="main-input__placeholder">{{ placeholder }}</span>
        </label>
        <!-- eslint-disable -->
        <AErrorMessage
          v-bind="{
            validation,
            maxInputLength,
            exceedBudget
          }"
        />
      </p>
      <div v-if="type === 'select'" class="selectable">
        <select name="select" @input="updateValue">
          <option
            disabled
            selected
            value
          >
            -- select {{ placeholder }} --
          </option>
          <option
            v-for="(elem, index) in options"
            :key="index"
            :value="elem"
          >
            {{ elem }}
          </option>
        </select>
        <AErrorMessage
          :validation="validation"
          :maxInputLength="maxInputLength"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AErrorMessage from '@/components/shared/AErrorMessage'
export default {
  name: 'AInput',
  components: {
    AErrorMessage
  },
  props: {
    value: {
      type: [String, Number, Object],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    validation: {
      type: Object,
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    },
    maxInputLength: {
      type: Number,
      default: 30
    },
    options: {
      type: Array,
      default: () => []
    },
    exceedBudget: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {}
  },
  methods: {
    updateValue(e) {
      this.$emit('input', e.target.value)
    },
    touchValue() {
      this.$emit('touchValue')
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

.selectable {
  position: relative;
  border-bottom: 1px solid #abaaaa;
  margin-right: 10px;
  height: 35px;
}

.main-input {
  border: 0;

  &__placeholder {
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

  &:focus {
    outline: none;
    &::placeholder {
      transform: translateY('-20px');
    }
  }
}

.global-error {
  transition: 1s ease-in-out;
  position: absolute;
  opacity: 1;
  top: 38px;
  left: 5px;
  color: red;
}

select[name='select'] {
  width: 185px;
  height: 34px;
  border: 0;
  outline: none;

  &:hover {
    cursor: pointer;
  }
}

label {
  position: relative;
  display: inline-block;
}

input {
  padding: 10px;
}

input:focus + span,
input:not(:placeholder-shown) + span {
  opacity: 1;
  transform: scale(0.65) translateY(-50%) translateX(-30px);
}

input:focus + span,
input:not(:-ms-input-placeholder) + span {
  opacity: 1;
  transform: scale(0.65) translateY(-50%) translateX(-30px);
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
