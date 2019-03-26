<template>
  <div>
    <div class="form__overlay" @click="$emit('toggleBudgetForm')" />
    <div class="form">
      <div class="form__close" @click="$emit('toggleBudgetForm')">x</div>
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
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AInput from './../AInput'
export default {
  name: 'AForm',
  components: {
    AInput
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
    }
  },
  data() {
    return {
      formOpen: false
    }
  },
  computed: {}
}
</script>

<style lang="scss">
.form {
  position: fixed;
  left: 25%;
  top: 25%;
  max-width: 50%;
  width: 400px;
  height: 300px;
  background-color: #fff;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  text-decoration: none;
  z-index: 1000;

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
    right: 5px;
    top: 5px;

    &:hover {
      cursor: pointer;
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
      width: 100%;
      justify-content: space-between;
    }

    &__input-label {
      text-transform: capitalize;
      padding-left: 20px;
    }
  }
}
</style>
