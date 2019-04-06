<template>
  <section class="budget-by-id__container">
    <div class="budget-by-id__card">
      <h1>Budget info</h1>
      <div class="budget-by-id__table">
        <div
          v-for="(value, key) in getBudget"
          :key="key"
          class="budget-by-id__table-line"
        >
          <p>{{ key | transformKey }}</p>
          <p>{{ value }}</p>
        </div>
      </div>
    </div>
    <div class="budget-by-id__transactions">
      Transactions
    </div>
    <Transactions :budgetId="getTransactionsByBudgetId($route.params.id)" />
    <div class="budget-by-id__transactions">
      <nuxt-link
        :to="{ name: 'createTransaction', params: { id: $route.params.id } }"
      >
        <AButton text="+ New transaction" />
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AButton from '~/components/shared/AButton'
import Transactions from '~/components/Transactions'

export default {
  components: {
    AButton,
    Transactions
  },
  data() {
    return {
      transactionFormOpen: false
    }
  },
  filters: {
    transformKey(val) {
      const pairs = {
        id: 'ID',
        name: 'Name',
        currency: 'Currency',
        sum: 'Initial Amount',
        remBudget: 'Remaining Budget',
        minTransaction: 'Minimal Transaction',
        maxTransaction: 'Maximal Transaction',
        averageTransaction: 'Average Transaction'
      }
      return pairs[val] || val
    }
  },
  computed: {
    ...mapGetters({
      getTransactionsByBudgetId: 'getTransactionsByBudgetId',
      getBudgetById: 'getBudgetById'
    }),
    getBudget() {
      const budget = { ...this.getBudgetById(this.$route.params.id) }
      delete budget.transactions
      return budget
    }
  },
  methods: {
    ...mapActions(['deleteTransaction']),
    toggleTransactionForm() {
      this.transactionFormOpen = !this.transactionFormOpen
    }
  }
}
</script>

<style lang="scss">
.budget-by-id {
  &__card {
    width: 450px;
    min-height: 350px;
    background-color: #fff;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  }
  &__container {
    width: 100%;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  &__table {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    padding-bottom: 20px;
    width: 100%;
    justify-content: space-between;
  }

  &__table-line {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;

    & p {
      text-align: left;
      width: 100%;
      padding-left: 50px;
    }
  }

  &__transactions {
    padding: 25px;
    height: 30px;
    width: 100%;
    font-weight: bold;
    font-size: 30px;

    & > a {
      text-decoration: none;
    }
  }

  &__transactions-list {
    width: 100%;

    &__text {
      display: flex;
      width: 85%;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
    }
  }

  &__transactions-item {
    width: 100%;
    margin: 5px auto;
    height: 50px;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #80808000;

    &:hover {
      border: 1px solid #808080;
      cursor: pointer;
    }
  }
}
</style>
