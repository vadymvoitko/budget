<template>
  <div class="budget-by-id__transactions-list">
    <div
      v-for="value in getTransactionsByBudgetId(this.$route.params.id)"
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
  computed: {
    ...mapGetters({
      getTransactionsByBudgetId: 'getTransactionsByBudgetId'
    })
  },
  methods: {
    ...mapActions(['deleteTransaction'])
  }
}
</script>

<style lang="scss">
.budget-by-id {
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
