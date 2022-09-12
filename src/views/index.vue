<template>
  <div>
    <!-- <p>
      <router-link to="/login">Login</router-link>
      &nbsp;&nbsp;
      <router-link to="/dashboard">Dashboard</router-link>
    </p> -->
    <Layout />
    <div class="content">
      <router-view v-slot="{ Component }">
        <keep-alive v-if="$route.meta.keepAlive">
          <component :is="Component" />
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.keepAlive" />
      </router-view>
    </div>
  </div>
  <!-- <Top /> -->
</template>

<script setup lang="ts">
import Layout from "@/Layout/index.vue";
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  height: auto;
  box-sizing: border-box;
}
</style>