<template>
	<v-app id="app" class="h-screen flex flex-col">
		<header-bar
			v-if="!$route.meta.hideNavbar && !this.$store.state.isLogged"
		></header-bar>
		<logged-header-bar
			v-if="!$route.meta.hideNavbar && this.$store.state.isLogged"
		></logged-header-bar>
		<div class="flex h-full max-h-full">
			<sidebar
				class="flex-none h-full"
				v-if="!$route.meta.hideNavbar"
			></sidebar>
			<router-view class="w-full h-full" />
		</div>
	</v-app>
</template>

<style lang="scss">
	* {
		padding: 0;
		margin: 0;
	}
	#app {
		height: 100vh;
	}
</style>
<script>
	import HeaderBar from "@/components/header-bar";
	import LoggedHeaderBar from "@/components/header-bar-logged";
	import Sidebar from "@/components/sidebar.vue";
	export default {
		components: { HeaderBar, Sidebar, LoggedHeaderBar },
	};
</script>
