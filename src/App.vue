<template>
	<div id="app">

		<!--<nav>
			<router-link to="/">Home</router-link> |
			<router-link to="/login">Login</router-link>
		</nav>-->
		<!--<router-view />-->
    <header-bar></header-bar>
	</div>
</template>

<style lang="scss">
	*{
    padding: 0;
    margin: 0;
  }
</style>
<script>
import HeaderBar from "@/pages/components/header-bar";
export default {
  components: { HeaderBar }
}
</script>