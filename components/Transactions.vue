<template>
  <div class="budget-by-id__transactions-list">
    <div
      v-for="value in budgetId"
      :key="value.id"
      class="budget-by-id__transactions-item"
    >
      <div class="budget-by-id__transactions-list__text">
        <div class="budget-by-id__transactions-cell">{{ value.target }}</div>
        <div class="budget-by-id__transactions-cell">{{ value.sum }}</div>
        <div class="budget-by-id__transactions-cell">{{ value.currency }}</div>
      </div>
      <div class="budget-by-id__transactions-cell right">
        <AButton
          flat
          text="delete"
          @click="
            deleteTransaction({
              budgetId: $route.params.id,
              transactionId: value.id
            })
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AButton from '~/components/shared/AButton'

export default {
  components: {
    AButton
  },
  data() {
    return {
      transactionFormOpen: false
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
  props: ['budgetId'],
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
