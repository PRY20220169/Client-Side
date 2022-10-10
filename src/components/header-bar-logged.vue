<template>
	<header id="header-bar">
		<div id="title">
			<h2
				class="hover:cursor-pointer hover:brightness-90 transition ease-in-out"
				@click="goToHome()"
			>
				PRY20220169
			</h2>
		</div>
		<div id="account-actions">
			<div class="btn-outline">
				<button type="button" @click="logout()">Log out</button>
			</div>
		</div>
	</header>
</template>

<script>
	export default {
		name: "header-bar",
		methods: {
			logout() {
				this.$router.push({ name: "login" });
				this.$store.dispatch("logout");
			},
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
