<template>
  <header id="header-bar">
    <div id="title">
      <h2>PRY20220169</h2>
    </div>
    <div id="account-actions">
      <div class="btn-outline">
        <button type="button">Log In</button>
      </div>
      <div class="btn-content">
        <button type="button">Sign Up</button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "header-bar"
};
</script>

<style scoped lang="scss">
@import "../assets/styles/header-bar/base-header-bar";
</style>