<template>
  <div>
    <AForm :inputs="inputs" @toggleBudgetForm="$emit('toggleBudgetForm')">
    </AForm>
  </div>
</template>

<script>
import AForm from '~/components/shared/AForm'
export default {
  name: 'CreateBudget',
  components: {
    AForm
  },
  props: {},
  data() {
    return {
      inputs: [
        {
          type: 'text',
          placeholder: 'name',
          value: ''
        },
        {
          type: 'text',
          placeholder: 'currency',
          value: ''
        },
        {
          type: 'text',
          placeholder: 'sum',
          value: ''
        }
      ]
    }
  }
}
</script>

<style scoped></style>
