<template>
  <div>
    <AForm
      header="Create transaction"
      :inputs="inputs"
      :buttons="buttons"
      :errorMsg="$v"
      closeAction="toggleTransactionForm"
      @toggleTransactionForm="$emit('toggleTransactionForm')"
      @createTransaction="createTransaction"
      @inputValue="inputValue"
    />
  </div>
</template>

<script>
import AForm from '~/components/shared/AForm'
import { mapActions, mapGetters } from 'vuex'
import { required } from 'vuelidate/src/validators'
export default {
  name: 'CreateTransaction',
  components: {
    AForm
  },
  props: {},
  validations: {
    target: {
      required
    },
    currency: {
      required
    },
    sum: {
      required
    }
  },
  data() {
    return {
      target: '',
      currency: '',
      sum: '',
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
    },
    inputValue(field, value) {
      this[field] = value
      this.$v[field].$touch()
      console.log(this.$v[field])
    }
  },
  created() {
    console.log(this.$v)
  }
}
</script>
