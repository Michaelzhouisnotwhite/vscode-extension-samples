<script setup>
  
</script>
<template>
  <div class="flex justify-between">
    <slot></slot>
    <el-button @click="$emit('SaveExportAll')" type="success">保存所有数据并生成所有</el-button>
  </div>
</template>