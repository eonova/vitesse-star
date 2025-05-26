<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

const router = useRouter()

const name = ref('')
const { msg } = useStore('home')

/**
 * 跳转链接
 * Navigates to the "hi" route with the value of the "name" input field
 *
 * @return {void}
 */
function go(): void {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}
</script>

<template>
  <TheStudy />
  <div font="bold" text-6 font-bold mx-auto gradient="linear-gradient(to right, #0c02ba, #00ff95)">
    {{ msg }}
  </div>
  <div class="card">
    <p color-gray>
      Click on the  logos to learn more
    </p>
    <TheInput
      v-model="name"
      placeholder="What's your name?"
      autocomplete="false"
      @keydown.enter="go"
    />
    <div>
      <button
        type="submit"
        mt-2
        class="btn-primary btn-soft btn"
        :disabled="!name"
        @click="go"
      >
        Go
      </button>
    </div>
  </div>
</template>
