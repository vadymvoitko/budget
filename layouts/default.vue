<template>
  <div>
    <aside
      :class="{
        root__aside: true,
        'aside-open': sidebarOpen
      }"
    >
      <Budget />
    </aside>
    <nav
      :class="{
        root__nav: true,
        'nav-open': sidebarOpen
      }"
    >
      <AButton
        flat
        :text="sidebarOpen ? 'Hide Budgets' : 'Show Budgets'"
        @click="sidebarOpen = !sidebarOpen"
      />
    </nav>
    <div class="root__container" @click.stop="sidebarOpen = false">
      <nuxt />
    </div>
  </div>
</template>

<script>
import Budget from '~/components/budget'
import AButton from '~/components/shared/AButton'
import { mapActions } from 'vuex'
export default {
  name: 'Default',
  components: {
    Budget,
    AButton
  },
  data() {
    return {
      sidebarOpen: false,
      transactionFormOpen: false
    }
  },
  created() {
    this.generateCurrencyPairs()
  },
  mounted() {
    this.deriveDataFromStorage()
  },
  methods: {
    ...mapActions({
      generateCurrencyPairs: 'currency-store/generateCurrencyPairs',
      deriveDataFromStorage: 'deriveDataFromStorage'
    })
  }
}
</script>

<style lang="scss">
.root {
  &__aside {
    position: fixed;
    text-align: center;
    width: 300px;
    height: 100%;
    background-color: #fffefe;
    box-shadow: 3px 4px 7px 1px rgba(161, 115, 115, 0.33);
    transition: all 0.1s ease-in-out;
    transform: translateX(-305px);
  }
  &__nav {
    position: fixed;
    height: 50px;
    background-color: #fff;
    box-shadow: 0px 2px 7px -1px rgba(0, 0, 0, 0.2);
    transition: all 0.1s ease-in-out;
    width: 100%;
  }
  &__container {
    padding-top: 60px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 90%;
    margin: auto;
  }
}

.nav-button {
  align-items: center;
  background-color: #87151500;
  border-color: #87151500;
  display: inline-flex;
  height: 100%;
  flex: 0 0 auto;
  font-size: 14px;
  font-weight: bold;
  justify-content: center;
  min-width: 88px;
  outline: 0;
  text-decoration: none;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), color 1ms;
  position: relative;
  vertical-align: middle;

  &:hover {
    background-color: #ebebeb1a;
    cursor: pointer;
  }
}

.aside-open {
  transform: translateX(0);
}

.nav-open {
  width: calc(100% - 300px);
  margin-left: 300px;
}

body {
  margin: 0 !important;
  font: 400 13.33px Arial;
}
</style>
