<template>
  <div>
    <AForm
      header="Create transaction"
      :inputs="inputs"
      :buttons="buttons"
      closeAction="toggleTransactionForm"
      @toggleTransactionForm="$emit('toggleTransactionForm')"
      @createTransaction="createTransaction"
    />
  </div>
</template>

<script>
import AForm from '~/components/shared/AForm'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CreateTransaction',
  components: {
    AForm
  },
  props: {},
  data() {
    return {
      buttons: [
        {
          text: 'Create',
          action: 'createTransaction'
        },
        {
          text: 'Cancel',
          action: 'toggleTransactionForm'
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
          field: 'target',
          placeholder: 'target',
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
    ...mapActions(['addTransaction']),
    createTransaction(data) {
      this.addTransaction({ budgetId: this.$route.params.id, ...data })
      this.$emit('toggleTransactionForm')
    }
  }
}
</script>
