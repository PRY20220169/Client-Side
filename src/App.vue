<template>
	<div id="app">
		<header-bar v-if="!$route.meta.hideNavbar"></header-bar>
		<router-view />
	</div>
</template>

<style lang="scss">
	* {
		padding: 0;
		margin: 0;
	}

	#app {
		height: 99vh;
	}
</style>
<script>
	import HeaderBar from "@/components/header-bar";
	export default {
		components: { HeaderBar },
	};
</script>
