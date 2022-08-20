<template>
	<div id="app">

		<!--<nav>
			<router-link to="/">Home</router-link> |
			<router-link to="/login">Login</router-link>
		</nav>-->
    <header-bar></header-bar>
    <router-view />
	</div>
</template>

<style lang="scss">
	*{
    padding: 0;
    margin: 0;
  }

  #app{
    height: 100vh;
  }
</style>
<script>
import HeaderBar from "@/components/header-bar";
export default {
  components: { HeaderBar }
}
</script>