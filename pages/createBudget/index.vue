<template>
  <div>
    <AForm
      header="Create budget"
      close-action="toggleBudgetForm"
      :inputs="inputs"
      :buttons="buttons"
      :validation="$v"
      :max-input-length="30"
      @toggleBudgetForm="$router.go(-1)"
      @createBudget="createBudget"
      @inputValue="inputValue"
      @touchValue="touchValue"
    />
  </div>
</template>

<script>
import AForm from '~/components/shared/AForm'
import { mapActions, mapGetters } from 'vuex'
import { required, maxLength, alpha, minValue } from 'vuelidate/src/validators'
export default {
  name: 'CreateBudget',
  components: {
    AForm
  },
  props: {},
  validations: {
    name: {
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
      name: '',
      currency: '',
      sum: '',
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
          value: this.name
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
    ...mapActions(['addBudget']),
    createBudget(data) {
      this.$v.$touch()
      if (this.$v.$anyError) return
      this.addBudget(data)
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
