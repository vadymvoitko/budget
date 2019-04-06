<template>
  <AForm
    header="Create transaction"
    close-action="toggleTransactionForm"
    :inputs="inputs"
    :validation="$v"
    :max-input-length="30"
    :exceed-budget="availableBudget.toFixed(2)"
    @toggleTransactionForm="toggleTransactionForm"
    @inputValue="inputValue"
    @touchValue="touchValue"
  >
    <template v-slot:buttons="{ formData }">
      <AButton
        text="+ Create"
        :styles="{ margin: '10px' }"
        @click="createTransaction(formData)"
      />
      <AButton
        text="Cancel"
        :styles="{ margin: '10px' }"
        @click="toggleTransactionForm"
      />
    </template>
  </AForm>
</template>

<script>
import { Decimal as D } from 'decimal.js'
import AForm from '~/components/shared/AForm'
import { mapActions, mapGetters } from 'vuex'
import { required, maxLength, alpha, minValue } from 'vuelidate/src/validators'
import AButton from '~/components/shared/AButton'
export default {
  name: 'CreateTransaction',
  components: {
    AForm,
    AButton
  },
  props: {},
  validations: {
    target: {
      required,
      alpha,
      maxLength: maxLength(30)
    },
    currency: {
      required
    },
    sum: {
      required,
      minValue: minValue(0)
    }
  },
  data() {
    return {
      target: '',
      currency: '',
      sum: '',
      availableBudget: 0
    }
  },
  computed: {
    ...mapGetters({
      getAvailableCurrencies: 'currency-store/getAvailableCurrencies',
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
      if (
        !this.checkEnoughBudget(
          this.getBudgetById(this.$route.params.id),
          this.currency
        )
      )
        return
      this.addTransaction({ budgetId: this.$route.params.id, ...data })
      this.$router.go(-1)
    },
    checkEnoughBudget(budgetById, enteredCurrency) {
      const budgetCurrency = budgetById && budgetById.currency
      const budgetRemain = budgetById && budgetById.remBudget
      let currencyRate =
        this.getCurrencyPairs[budgetCurrency] &&
        this.getCurrencyPairs[budgetCurrency][enteredCurrency]
      currencyRate = currencyRate ? new D(currencyRate) : new D(1)
      if (
        budgetRemain &&
        new D(new D(this.sum).div(currencyRate).toFixed(2)).gt(budgetRemain)
      ) {
        // one side effect below can be avoided in perspective
        this.availableBudget = budgetRemain.times(currencyRate)
        return false
      } else {
        this.availableBudget = new D(0)
        return true
      }
    },
    inputValue(field, value) {
      this[field] = value
    },
    touchValue(field) {
      this.$v[field].$touch()
    },
    toggleTransactionForm() {
      this.$router.go(-1)
    }
  }
}
</script>
