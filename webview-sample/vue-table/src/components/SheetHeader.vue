<script setup>
import { onMounted, watch } from "vue"
import { toggleDark } from "@/utils";
import { useDark } from '@vueuse/core'

const darkMode = useDark();
watch(darkMode, (_, newNotDark) => {
    toggleDark(!newNotDark);
});
onMounted(() => {
  darkMode.value = useDark();
})



</script>
<template>
  <div class="flex justify-between">
    <slot />
    <div>
      <el-switch v-model="darkMode" size="large" active-text="Dark Mode" inactive-text="Light Mode" />
      <el-button @click="$emit('SaveExportAll')" type="success">保存所有数据并生成所有</el-button>
    </div>
  </div>
</template>
<style scoped>
.el-switch {
  margin-right: 20px;
}
</style>