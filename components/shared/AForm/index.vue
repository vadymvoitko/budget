<template>
  <div>
    <div class="form__overlay" @click="$emit(closeAction)" />
    <div class="form">
      <div class="form__close" @click="$emit(closeAction)">x</div>
      <div class="form__content">
        <h1>{{ header }}</h1>
        <div
          v-for="(item, key) in inputs"
          :key="key"
          class="form__content__input-pair"
        >
          <div class="form__content__input-label">{{ item.placeholder }}</div>
          <AInput
            :type="item.type"
            :placeholder="item.placeholder"
            :value="item.value"
            :options="item.options"
            @input="enterInput(item, $event)"
          />
        </div>
        <div class="form__actions">
          <AButton
            v-for="(item, index) in buttons"
            :key="index"
            :text="item.text"
            :styles="{ margin: '10px' }"
            @click="$emit(item.action, formData)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AInput from './../AInput'
import AButton from './../AButton'
export default {
  name: 'AForm',
  components: {
    AInput,
    AButton
  },
  props: {
    header: {
      required: true,
      type: String,
      default: 'Header'
    },
    inputs: {
      required: true,
      type: Array
    },
    buttons: {
      required: true,
      type: Array
    },
    closeAction: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      formOpen: false,
      formData: {}
    }
  },
  methods: {
    enterInput(item, value) {
      this.formData[item.field] = value
    }
  }
}
</script>

<style lang="scss">
.form {
  position: fixed;
  left: calc(50% - 200px);
  top: calc(50% - 200px);
  width: 400px;
  min-height: 350px;
  background-color: #fff;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  text-decoration: none;
  z-index: 1000;
  border-radius: 3px;
  border: 7px solid #b1b1b1;

  &__overlay {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #47494ec2;
  }

  &__close {
    position: absolute;
    right: 7px;
    top: 6px;
    padding: 5px;
    width: 18px;
    border: 1px solid #d2cccc4f;
    box-shadow: 1px 1px 4px #8080808c;
    border-radius: 50%;
    text-align: center;

    &:hover {
      cursor: pointer;
      background: #ebebeb;
    }
  }

  &__content {
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    align-content: center;

    &__input-pair {
      display: flex;
      flex: 1 1 auto;
      padding: 10px 0;
      width: 100%;
      justify-content: space-between;
      align-items: center;
    }

    &__input-label {
      text-transform: capitalize;
      padding-left: 20px;
    }
  }

  &__actions {
    display: flex;
    flex: 1 1 auto;
    padding: 30px 0;
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
