<script setup>
import { TableKeys } from '@/sheets/SheetTemplates';
import { computed } from 'vue';

const props = defineProps({
  tableKeys: Array[TableKeys]
})

const tableKeys = computed(()=>{
  return props.tableKeys;
})
console.log(`${props.tableKeys}`);
</script>
<template>
  <el-form label-position="top" label-width="auto">
    <el-form-item v-for="tk in tableKeys" :key="tk.keyName" :label="tk.keyName">
      <el-input></el-input>
    </el-form-item>
  </el-form>
</template>