<template>
	<header id="header-bar">
		<div id="title" class="flex items-center">
      <img src="../assets/images/upc.png" alt="" class="w-10 mr-2">
			<h2
				class="hover:cursor-pointer hover:brightness-90 transition ease-in-out"
				@click="goToHome()"
			>
				PRY20220169
			</h2>
		</div>
		<div id="account-actions">
			<div class="btn-outline">
				<button type="button" @click="$router.push('/login')">Log In</button>
			</div>
			<div class="btn-content">
				<button type="button" @click="$router.push('/signup')">Sign Up</button>
			</div>
		</div>
	</header>
</template>

<script>
	export default {
		name: "header-bar",
		methods: {
			goToHome() {
				if (this.$route.path !== "/") {
					this.$router.push("/");
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "../assets/styles/header-bar/base-header-bar";
</style>
