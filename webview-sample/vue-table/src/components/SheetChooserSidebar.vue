<script setup>
import { computed, ref } from "vue"
const props = defineProps({
  keys: Array[String]
})
const emitWithParam = defineEmits({
  sigShowSheet: String
})
const sheetKeys = computed(() => {
  return props.keys;
})
const isOpen = ref(true)
const onSideBarKeyClicked = (keyName) => {
  console.log(keyName);
  emitWithParam("sigShowSheet", keyName)
}
</script>

<template>
  <!-- <div class="flex"> -->
  <div :class="isOpen ? 'w-60' : 'w-40'" class="flex-none flex-col h-screen p-3 duration-300 bg-gray-800 shadow">
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-white">Sheet Name</h2>
        <button @click="isOpen = !isOpen">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
    </div>
    <div class="flex-1">
      <ul class="pt-2 pb-4 space-y-1 text-sm">

        <li v-for="_key in sheetKeys" :key="_key" class="rounded-sm">
          <div class="flex items-center p-2 space-x-3 rounded-md pointer-cursor">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-100">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>

            <button class="text-gray-100" @click="onSideBarKeyClicked(_key)">{{ _key }}</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style>
.pointer-cursor {
  cursor: pointer;
}
</style>