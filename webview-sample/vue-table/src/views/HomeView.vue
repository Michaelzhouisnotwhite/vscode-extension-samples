<script setup>
import SheetChooserSidebar from "../components/SheetChooserSidebar.vue"
import { SheetStorage } from "../sheets/SheetTemplates"
import TableComp from "@/components/TableComp.vue";
import SheetHeader from "@/components/SheetHeader.vue";
import { ref } from "vue"
import { sendToVscode } from "@/sheets/api";
// const example = ["abc", "bcd"];
const curSheetName = ref("");
const onShowSheet = (sheetName) => {
    curSheetName.value = sheetName;
}
const sideBarOpenFlag = ref(false);
const onSideBarOpen = (flag) => {
    sideBarOpenFlag.value = flag;
}
</script>

<template>
    <el-container class="h-screen bg-white">
        <el-aside width="250px">
            <SheetChooserSidebar class="w-full" :keys="SheetStorage.ins().sheetNames" @sig-show-sheet="onShowSheet" @sig-open="onSideBarOpen"></SheetChooserSidebar>
        </el-aside>
        <el-container class="light bg-white">
            <el-header>
                <sheet-header class="h-full py-4 font-serif text-2xl" @SaveExportAll="sendToVscode(SheetStorage.ins())">{{ curSheetName }}</sheet-header>
            </el-header>
            <el-main>
                <TableComp class="w-full p-0" v-if="SheetStorage.ins().get(curSheetName)" :sheet-item="SheetStorage.ins().get(curSheetName)"></TableComp>
            </el-main>
        </el-container>
    </el-container>
</template>
<style scoped>
.el-main {
    padding: 0;
}
</style>
