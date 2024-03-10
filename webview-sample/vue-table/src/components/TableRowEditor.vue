<script setup>
import { TableKeys } from '@/sheets/SheetTemplates';
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
  tableKeys: Array[TableKeys],
  initTableData: Object
})
const tableKeys = computed(() => {

  return props.tableKeys;
})

const tableData = ref({})
onMounted(() => {
  tableData.value = props.initTableData ? props.initTableData : {};
  if (!props.initTableData) {
    tableKeys.value.forEach(element => {
      console.log(element);
      tableData.value[element.keyName] = "";
    });
  }
})

// const tempInput = ref("")
// console.log(`${props.tableKeys}`);
const emits = defineEmits({
  tableDataSave: Object,
})
const onRowEditorSave = () => {
  emits("tableDataSave", tableData.value)
  console.log("tableDataSave", tableData.value);
}
</script>
<template>
  <el-form label-position="top" label-width="auto">
    <el-form-item v-for="tk in tableKeys" :key="tk.keyName" :label="tk.keyName">
      <div>{{ tk.keyComment }}</div>
      <el-input v-model="tableData[tk.keyName]"></el-input>
    </el-form-item>
  </el-form>
  <el-button type="primary" @click="onRowEditorSave">保存</el-button>
</template>