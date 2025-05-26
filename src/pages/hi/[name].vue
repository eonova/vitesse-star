<script setup lang="ts">
const params = useRoute('/hi/[name]').params
const router = useRouter()
const { updateCount, count } = useStore('home')
</script>

<template>
  <div>
    <div i-twemoji-alien text-4xl inline-block />
    <p>
      Hi, {{ params.name }}
    </p>
    <p>{{ count }}</p>
    <p text-sm op50>
      <em>Dynamic route!</em>
    </p>
    <div>
      <button text-sm m-3 mt-8 btn @click="updateCount">
        add
      </button>
      <button text-sm m-3 mt-8 btn @click="router.back()">
        Back
      </button>
    </div>
  </div>
</template>
