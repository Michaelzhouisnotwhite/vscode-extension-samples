<script setup>
import { SheetItem, TableKeys } from '@/sheets/SheetTemplates';
// import { ElTable, ElTableColumn } from 'element-plus';
import TableRowEditor from './TableRowEditor.vue';
import { computed, ref, reactive } from 'vue';
const props = defineProps({
  sheetItem: SheetItem
})
const headers = computed(() => {
  return props.sheetItem.headerNames
})
const rowAddEditorShow = ref(false)
const rowEditEditorShow = ref(false);

const tableKeys = ref(new TableKeys("", ""));
const onAddRowClicked = () => {
  rowAddEditorShow.value = true;
  tableKeys.value = props.sheetItem.tableKeys;
}
const tableData = ref([]);

const onTableDataAddSave = (data) => {
  tableData.value.push(data)
  rowAddEditorShow.value = false;
}

const curRowDataProperty = reactive(
  {
    data: {},
    idx: 0
  }
)
const onTableRowEdit = (idx) => {
  curRowDataProperty.data = { ...tableData.value[idx] }
  curRowDataProperty.idx = idx;
  rowEditEditorShow.value = true;
}

const onTableDataEditSave = (data) => {
  tableData.value[curRowDataProperty.idx] = data;
  rowEditEditorShow.value = false;
}

const onTableRowRemoved = (idx) => {
  tableData.value.splice(idx, 1)
}

</script>
<template>
  <div>

    <table-row-editor v-if="rowAddEditorShow" :tableKeys="tableKeys" @tableDataSave="onTableDataAddSave"></table-row-editor>
    <table-row-editor v-if="rowEditEditorShow" :tableKeys="tableKeys" @tableDataSave="onTableDataEditSave" :initTableData="curRowDataProperty.data"></table-row-editor>
    <el-button size="small" type="primary" @click="onAddRowClicked" style="width: fit-content;">添加一行</el-button>
    <el-table border class="main-table" :data="tableData" highlight-current-row>
      <el-table-column type="index" width="25" />
      <el-table-column v-for="header in headers" :key="header" :label="header" :prop="header" width="auto" />
      <el-table-column fixed="right" width="150">
        <template #header>
          <div>操作</div>
        </template>
        <template #default="scope">
          <el-button link type="primary" size="small" @click.prevent="onTableRowEdit(scope.$index)">
            Edit
          </el-button>
          <el-button link type="primary" size="small" @click.prevent="onTableRowRemoved(scope.$index)">
            Remove
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>
<style scoped>
.main-table {
  width: 100%;
  --el-table-text-color: var(--el-table-border);
  --el-table-header-text-color: black;
  --el-table-border-color: #e0e0e0;
}
</style>