<template>
  <section class="container">
    <div class="budget__card">
      <h1>Budget info</h1>
      <div class="budget__table">
        <div
          v-for="(value, key) in getBudget"
          :key="key"
          class="budget__table-line"
        >
          <p>{{ key }}</p>
          <p>{{ value }}</p>
        </div>
      </div>
    </div>
    <div class="budget__transactions">
      Transactions
    </div>
    <div class="budget__transactions-list">
      <div
        v-for="value in getTransactionsByBudgetId($route.params.id)"
        :key="value.id"
        class="budget__transactions-item"
      >
        <div class="budget__transactions-list__text">
          <div class="budget__transactions-cell">
            {{ value.purpose }}
          </div>
          <div class="budget__transactions-cell">
            {{ value.sum }}
          </div>
          <div class="budget__transactions-cell">
            {{ value.currency }}
          </div>
        </div>
        <div class="budget__transactions-cell right">
          <AButton flat text="delete" />
        </div>
      </div>
    </div>
    <div class="budget__transactions">
      <AButton text="+ New transaction" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import AButton from '~/components/shared/AButton'
export default {
  components: {
    AButton
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
  }
}
</script>

<style lang="scss">
.container {
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.budget {
  &__card {
    width: 400px;
    min-height: 350px;
    background-color: #fff;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  }

  &__table {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
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
    padding: 15px;
    height: 30px;
    width: 100%;
    font-weight: bold;
    font-size: 30px;
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
