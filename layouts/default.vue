<template>
  <div>
    <aside
      :class="{
        root__aside: true,
        'aside-open': sidebarOpen
      }"
    >
      <!-- <AsideContent/> -->
    </aside>
    <nav
      :class="{
        root__nav: true,
        'nav-open': sidebarOpen
      }"
    >
      <button class="nav-button" @click="sidebarOpen = !sidebarOpen">
        jkshg
      </button>
    </nav>
    <div class="container">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Default',
  data() {
    return {
      sidebarOpen: false
    }
  }
}
</script>

<style>
.root__aside {
  position: fixed;
  width: 300px;
  height: 100%;
  background-color: #f2f1f1;
  box-shadow: 3px 4px 7px 1px rgba(161, 115, 115, 0.33);
  transition: all 0.1s ease-in-out;
  transform: translateX(-305px);
}

.root__nav {
  position: fixed;
  height: 50px;
  background-color: #fff;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2);
  transition: all 0.1s ease-in-out;
  width: 100%;
}

.nav-button {
  align-items: center;
  background-color: #87151500;
  border-color: #87151500;
  display: inline-flex;
  height: 100%;
  flex: 0 0 auto;
  font-size: 14px;
  font-weight: 500;
  justify-content: center;
  min-width: 88px;
  outline: 0;
  text-transform: uppercase;
  text-decoration: none;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), color 1ms;
  position: relative;
  vertical-align: middle;
}

.nav-button:hover {
  background-color: #ebebeb1a;
  cursor: pointer;
}

.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 90%;
  margin: auto;
}

.aside-open {
  transform: translateX(0);
}

.nav-open {
  width: calc(100% - 300px);
  margin-left: 300px;
}
</style>
