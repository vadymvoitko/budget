<template>
  <div>
    <AForm
      header="Create budget"
      :inputs="inputs"
      :buttons="buttons"
      @toggleBudgetForm="$emit('toggleBudgetForm')"
      @createBudget="createBudget"
    />
  </div>
</template>

<script>
import AForm from '~/components/shared/AForm'
import { mapActions } from 'vuex'
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
          field: 'name',
          placeholder: 'name',
          value: ''
        },
        {
          type: 'text',
          field: 'currency',
          placeholder: 'currency',
          value: ''
        },
        {
          type: 'text',
          field: 'sum',
          placeholder: 'sum',
          value: ''
        }
      ],
      buttons: [
        {
          text: 'Create',
          action: 'createBudget'
        },
        {
          text: 'Cancel',
          action: 'toggleBudgetForm'
        }
      ]
    }
  },
  methods: {
    ...mapActions(['addBudget']),
    createBudget(data) {
      this.addBudget(data)
      this.$emit('toggleBudgetForm')
    }
  }
}
</script>
