<template>
  <nav text-xl mt-6 inline-flex gap-2>
    <div flex="~ items-center" m-t-20 justify-center class="logo-link">
      <a href="https://vitejs.dev" target="_blank">
        <img src="@/assets/images/vite.svg" class="logo" alt="Vite logo">
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="@/assets/images/vue.svg" class="logo vue" alt="Vue logo">
      </a>
      <a href="https://pinia.vuejs.org/zh/" target="_blank">
        <img src="@/assets/images/pinia.svg" class="logo pinia" alt="Pinia logo">
      </a>
      <a href="https://alfred-skyblue.github.io/" target="_blank">
        <img src="@/assets/images/unocss.svg" class="logo unocss" alt="UnoCss logo">
      </a>
      <a href="https://alova.js.org/zh-CN/" target="_blank">
        <img src="@/assets/images/alova.svg" class="logo alova" alt="Alova logo">
      </a>
      <a href="https://cn.vitest.dev/" target="_blank">
        <img src="@/assets/images/vitest.png" class="logo pinia" alt="Vitest logo">
      </a>
    </div>
  </nav>
</template>

<style scoped>
.logo {
  padding: 1em;
  height: 6em;
  transition: filter 300ms;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.pinia:hover {
  filter: drop-shadow(0 0 2em #ffd552);
}

.logo.alova:hover {
  filter: drop-shadow(0 0 2em #00b0ed);
}

.logo.unocss:hover {
  filter: drop-shadow(0 0 2em #586c43);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
