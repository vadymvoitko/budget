<template>
  <button
    :class="{ 'shared-button': true, flat: flat }"
    :style="styles"
    @click="$emit('click')"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'AButton',
  props: {
    text: {
      required: true,
      type: String
    },
    styles: {
      type: Object
    },
    flat: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss">
.shared-button {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  font-size: 14px;
  font-weight: bold;
  padding: 15px;
  justify-content: center;
  min-width: 88px;
  outline: 0;
  text-decoration: none;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), color 1ms;
  position: relative;
  vertical-align: middle;
  border-radius: 4px;
  border: none;
  box-shadow: 1px 1px 3px 1px #8080803b;

  &:hover {
    background-color: #ebebeb8c !important;
    cursor: pointer;
  }
}

.flat {
  height: 100%;
  border: none;
  border-radius: 0 !important;
  box-shadow: unset !important;
  background: inherit;
}
</style>
