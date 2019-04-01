<template>
  <section class="budget__container">
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
      <AButton text="+ Add budget" @click="$emit('toggleBudgetForm')" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import AButton from '~/components/shared/AButton'
export default {
  name: 'Budget',
  computed: {
    ...mapGetters({ getBudgets: 'getBudgets' })
  },
  components: {
    AButton
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
  }

  &__list {
    width: 100%;
    padding: 0 0 18px;
  }

  &__list-item {
    padding-left: 37px;
    height: 40px;
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
  }
}
</style>
