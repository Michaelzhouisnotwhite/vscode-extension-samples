<script setup>
import { SheetItem } from '@/sheets/SheetTemplates';
// import { ElTable, ElTableColumn } from 'element-plus';
import TableRowEditor from './TableRowEditor.vue';
import { isDark } from '@/utils';
import { computed, ref, reactive, watch, onMounted } from 'vue';
import * as api from "../sheets/api"

const props = defineProps({
  sheetItem: SheetItem
})
const headers = computed(() => {
  return props.sheetItem.headerNames
})
const rowAddEditorShow = ref(false)
const rowEditEditorShow = ref(false);
const sheetItem = computed(() => props.sheetItem)
const tableKeys = computed(() => props.sheetItem.tableKeys);
const onAddRowClicked = () => {
  rowAddEditorShow.value = true;
}
const tableData = ref([]);
watch(sheetItem, (old,) => {
  console.log("props change");
  tableData.value = old.getJsonSheet(SheetItem.JSON_SHEET_TYPE.row_based)
})
onMounted(() => {
  console.log("table comp update");
  tableData.value = [...props.sheetItem.getJsonSheet(SheetItem.JSON_SHEET_TYPE.row_based)];
})

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

const onSaveTableClicked = () => {
  api.sheetSave(sheetItem.value.sheetName, tableData.value);
  // eslint-disable-next-line no-undef
  ElNotification({
    title: 'Success',
    message: '保存成功',
    type: 'success',
  })
}

</script>
<template>
  <div>
    <el-dialog v-model="rowAddEditorShow" title="编辑" width="500" align-center>
      <table-row-editor v-if="rowAddEditorShow" :tableKeys="tableKeys" @tableDataSave="onTableDataAddSave"></table-row-editor>
    </el-dialog>
    <el-dialog v-model="rowEditEditorShow" title="编辑" width="500" align-center>
      <table-row-editor v-if="rowEditEditorShow" :tableKeys="tableKeys" @tableDataSave="onTableDataEditSave" :initTableData="curRowDataProperty.data"></table-row-editor>
    </el-dialog>
    <el-button size="small" type="primary" @click="onAddRowClicked" style="width: fit-content; height: 40px;">添加一行</el-button>
    <el-button size="small" type="warning" @click="onSaveTableClicked" style="width: fit-content;height: 40px;">保存</el-button>
    <el-table border class="main-table" :class="isDark ? 'dark' : ''" :data="tableData" highlight-current-row height="calc(100vh - 100px)">
      <el-table-column type="index" width="min-content" />
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
  --el-table-text-color: #000;
  --el-table-header-text-color: black;
  --el-table-border-color: #e0e0e0;
}

.el-table__body-wrapper {
  background-color: #ddd;
}

.el-table__body-wrapper::-webkit-scrollbar {
  width: 8px !important;
  height: 8px !important;
}

.dark.main-table {
  --el-table-text-color: var(--el-text-color-regular);
  --el-table-header-text-color: white;
  --el-table-border-color: #838383;
  --el-bg-color: #262626;
  --el-fill-color-light: #18222c7c;
}
</style>