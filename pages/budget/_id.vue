<template>
  <section class="container">
    <ul>
      <li v-for="(value, key) in getBudget" :key="value.id">
        {{ key }} - {{ value }}
      </li>
    </ul>
    <ul>
      <li
        v-for="value in getTransactionsByBudgetId($route.params.id)"
        :key="value.id"
      >
        {{ value.purpose }}
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
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

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
