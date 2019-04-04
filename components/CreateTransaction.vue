<template>
  <div>
    <AForm
      header="Create transaction"
      :inputs="inputs"
      :buttons="buttons"
      :error-msg="$v"
      :max-input-length="30"
      :exceed-budget="availableBudget"
      close-action="toggleTransactionForm"
      @toggleTransactionForm="$emit('toggleTransactionForm')"
      @createTransaction="createTransaction"
      @inputValue="inputValue"
      @touchValue="touchValue"
    />
  </div>
</template>

<script>
import { Decimal as D } from 'decimal.js'
import AForm from '~/components/shared/AForm'
import { mapActions, mapGetters } from 'vuex'
import { required, maxLength } from 'vuelidate/src/validators'
export default {
  name: 'CreateTransaction',
  components: {
    AForm
  },
  props: {},
  validations: {
    target: {
      required,
      maxLength: maxLength(30)
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
      sum: new D(0),
      availableBudget: new D(0),
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
      getAvailableCurrencies: 'getAvailableCurrencies',
      getBudgetById: 'getBudgetById',
      getCurrencyPairs: 'getCurrencyPairs'
    }),
    inputs() {
      return [
        {
          type: 'text',
          field: 'target',
          placeholder: 'target',
          value: this.target
        },
        {
          type: 'select',
          field: 'currency',
          placeholder: 'currency',
          options: this.getAvailableCurrencies,
          value: this.currency
        },
        {
          type: 'number',
          field: 'sum',
          placeholder: 'sum',
          value: this.sum
        }
      ]
    }
  },
  methods: {
    ...mapActions(['addTransaction']),
    createTransaction(data) {
      this.$v.$touch()
      if (this.$v.$anyError) return
      const budgetById = this.getBudgetById(this.$route.params.id)
      const budgetCurrency = budgetById && budgetById.currency
      const budgetRemain = budgetById && budgetById.remBudget
      if (
        this.getCurrencyPairs[budgetCurrency] &&
        this.sum
          .div(this.getCurrencyPairs[budgetCurrency][this.currency])
          .gt(budgetRemain)
      ) {
        this.availableBudget = budgetRemain.times(
          this.getCurrencyPairs[budgetCurrency][this.currency]
        )
        return
      } else {
        this.availableBudget = new D(0)
      }
      this.addTransaction({ budgetId: this.$route.params.id, ...data })
      this.$emit('toggleTransactionForm')
    },
    inputValue(field, value) {
      this[field] = value
    },
    touchValue(field) {
      this.$v[field].$touch()
    }
  }
}
</script>
