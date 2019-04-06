<template>
  <AForm
    header="Create budget"
    close-action="toggleBudgetForm"
    :inputs="inputs"
    :validation="$v"
    :max-input-length="30"
    @toggleBudgetForm="toggleBudgetForm"
    @inputValue="inputValue"
    @touchValue="touchValue"
  >
    <template v-slot:buttons="{ formData }">
      <AButton
        text="+ Create"
        :styles="{ margin: '10px' }"
        @click="createBudget(formData)"
      />
      <AButton
        text="Cancel"
        :styles="{ margin: '10px' }"
        @click="toggleBudgetForm"
      />
    </template>
  </AForm>
</template>

<script>
import AForm from '~/components/shared/AForm'
import AButton from '~/components/shared/AButton'
import { mapActions, mapGetters } from 'vuex'
import { required, maxLength, alpha, minValue } from 'vuelidate/src/validators'
export default {
  name: 'CreateBudget',
  components: {
    AForm,
    AButton
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
      sum: ''
    }
  },
  computed: {
    ...mapGetters({
      getAvailableCurrencies: 'currency-store/getAvailableCurrencies'
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
    },
    toggleBudgetForm() {
      this.$router.go(-1)
    }
  }
}
</script>
