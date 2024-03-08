<script setup>
// import { RouterLink, RouterView } from 'vue-router'
// import {ref} from "vue"
import HomeView from './views/HomeView.vue';
// const message_ref = ref("waiting message ...")
// eslint-disable-next-line no-undef
// const vscode = acquireVsCodeApi();
// window.addEventListener("message", event=>{
//   const message = event.data;
//   message_ref.value = message.command;
//   vscode.postMessage({command: "received.message"})
// })
</script>

<template>
  <!-- <header> -->

    <!-- <div class="container mx-auto rounded-md border-2 border-gray-800 px-4">
      <HelloWorld msg="You did it!" />
      <h1>{{ message_ref }}</h1> -->
      <!-- <nav> -->
        <!-- <RouterLink to="/">Home</RouterLink> -->
      <!-- </nav> -->
    <!-- </div> -->
  <!-- </header> -->

  <HomeView></HomeView>
</template>

<style scoped>

</style>
