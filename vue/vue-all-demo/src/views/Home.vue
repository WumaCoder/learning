<template>
  <div>
    <span>Home</span>
    <div @click="$store.commit('increment')">{{ $store.state.count }}</div>
    <div @click="$store.dispatch('increment')">{{ $store.state.count }}</div>
    <div @click="$store.commit('addPrefix')">
      {{ $store.getters.prefixCount }}
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
