<template>
  <div>
    <AForm
      header="Create budget"
      :inputs="inputs"
      :buttons="buttons"
      close-action="toggleBudgetForm"
      @toggleBudgetForm="$emit('toggleBudgetForm')"
      @createBudget="createBudget"
    />
  </div>
</template>

<script>
import AForm from '~/components/shared/AForm'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CreateBudget',
  components: {
    AForm
  },
  props: {},
  data() {
    return {
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
  computed: {
    ...mapGetters({
      getAvailableCurrencies: 'getAvailableCurrencies'
    }),
    inputs() {
      return [
        {
          type: 'text',
          field: 'name',
          placeholder: 'name',
          value: ''
        },
        {
          type: 'select',
          field: 'currency',
          placeholder: 'currency',
          options: this.getAvailableCurrencies,
          value: ''
        },
        {
          type: 'number',
          field: 'sum',
          placeholder: 'sum',
          value: ''
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
