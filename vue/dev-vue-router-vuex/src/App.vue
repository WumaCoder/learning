<template>
  <div>
    <router-link to="/main/home">Main</router-link>
    <router-link to="/admin/">后台</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style></style>
