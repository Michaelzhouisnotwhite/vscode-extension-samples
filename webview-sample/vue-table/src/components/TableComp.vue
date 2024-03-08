<script setup>
import { SheetItem, TableKeys } from '@/sheets/SheetTemplates';
// import { ElTable, ElTableColumn } from 'element-plus';
import TableRowEditor from './TableRowEditor.vue';
import { computed, ref } from 'vue';
const props = defineProps({
  sheetItem: SheetItem
})
const headers = computed(() => {
  return props.sheetItem.headerNames;
})
const rowEditorShow = ref(false)
const onAddRowClicked = () => {
  rowEditorShow.value = !rowEditorShow.value
  tableKeys.value = props.sheetItem.tableKeys;
}
const tableKeys = ref(new TableKeys("", ""));
</script>
<template>
  <table-row-editor v-if="rowEditorShow" :tableKeys="tableKeys"></table-row-editor>
  <el-table border>

    <el-table-column v-for="header in headers" :key="header" :label="header" :prop="header" />
    <el-table-column>
      <template #header>
        <el-button size="small" type="success" @click="onAddRowClicked">添加一行</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>