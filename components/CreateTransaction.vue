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
import { mapActions } from 'vuex'
export default {
  name: 'CreateTransaction',
  components: {
    AForm
  },
  props: {},
  data() {
    return {
      inputs: [
        {
          type: 'text',
          field: 'target',
          placeholder: 'target',
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
          action: 'createTransaction'
        },
        {
          text: 'Cancel',
          action: 'toggleTransactionForm'
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
