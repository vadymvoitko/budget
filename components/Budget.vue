<template>
  <section class="budget__container">
    <h1 class="budget__header">Budgets</h1>
    <ul class="budget__list">
      <nuxt-link
        v-for="value in getBudgets"
        :key="value.id"
        class="budget__list-item"
        :to="{ name: 'budget-id', params: { id: value.id } }"
      >
        {{ value.name }}
      </nuxt-link>
    </ul>
    <div class="budget__add">
      <nuxt-link to="/createBudget">
        <AButton text="+ Add budget" />
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import AButton from '~/components/shared/AButton'
export default {
  name: 'Budget',
  components: {
    AButton
  },
  computed: {
    ...mapGetters({ getBudgets: 'getBudgets' })
  }
}
</script>

<style lang="scss">
.budget {
  &__container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    text-align: center;
  }

  &__header {
    width: 100%;
    padding: 11px 0;
    font-size: 25px;
    box-shadow: 1px 1px 8px 0px #cbc9c9;
    transform: translateX(-1px);
    margin: 0;
  }

  &__list {
    width: 100%;
    padding: 0 0 18px;
  }

  &__list-item {
    padding-left: 37px;
    height: 50px;
    display: flex;
    font-size: 30px;
    font-weight: bold;
    align-items: center;
    text-decoration: none;
    color: #47494e;

    &:hover {
      cursor: pointer;
      background-color: #ebebeb;
    }

    &:before {
      content: '•';
      padding: 0 20px 3px 0;
    }
  }

  &__button {
    align-items: center;
    padding: 15px;
    border-radius: 5px;
    display: inline-flex;
    font-size: 18px;
    font-weight: bold;
    justify-content: center;
    outline: 0;
    text-decoration: none;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), color 1ms;
    position: relative;

    &:hover {
      background-color: #ebebeb1a;
      cursor: pointer;
    }
  }

  &__add {
    margin: 0 auto;
    padding: 10px 0;
    box-shadow: -1px 0px 3px #dad5d5;
    width: 100%;

    & > a {
      text-decoration: none;
    }
  }
}
</style>
