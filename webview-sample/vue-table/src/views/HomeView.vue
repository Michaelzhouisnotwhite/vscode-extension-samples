<script setup>
import SheetChooserSidebar from "../components/SheetChooserSidebar.vue"
import { SheetStorage } from "../sheets/SheetTemplates"
import TableComp from "@/components/TableComp.vue";
import SheetHeader from "@/components/SheetHeader.vue";
import { ref } from "vue"
import { sendToVscode } from "@/sheets/api";
// const example = ["abc", "bcd"];
const curSheetName = ref("choose a sheet");
const onShowSheet = (sheetName) => {
    curSheetName.value = sheetName;
}
const sideBarOpenFlag = ref(false);
const onSideBarOpen = (flag) => {
    sideBarOpenFlag.value = flag;
}
</script>

<template>
    <el-container class="h-screen bg-white dark:bg-neutral-800">
        <el-aside width="250px">
            <SheetChooserSidebar class="w-full" :keys="SheetStorage.ins().sheetNames" @sig-show-sheet="onShowSheet" @sig-open="onSideBarOpen"></SheetChooserSidebar>
        </el-aside>
        <el-container class="bg-white dark:bg-neutral-800">
            <el-header class="p-0 dark:bg-zinc-950">
                <sheet-header class="h-full py-4 pr-0 font-serif text-2xl text-black dark:text-gray-200 dark:bg-zinc-950"
                    @SaveExportAll="sendToVscode(SheetStorage.ins())">{{ curSheetName }}</sheet-header>
            </el-header>
            <el-main class="flex">
                <TableComp class="w-full p-0" v-if="SheetStorage.ins().get(curSheetName)" :sheet-item="SheetStorage.ins().get(curSheetName)"></TableComp>
            </el-main>
        </el-container>
    </el-container>
</template>
<style scoped>
.el-main {
    padding: 0;
}

.el-header {
    /* padding: 0 0; */
}
</style>
