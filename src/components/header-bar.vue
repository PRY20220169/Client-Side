<template>
	<header id="header-bar">
		<div id="title">
			<h2
				class="hover:cursor-pointer hover:brightness-90 transition ease-in-out"
				@click="$router.push('/')"
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
	};
</script>

<style scoped lang="scss">
	@import "../assets/styles/header-bar/base-header-bar";
</style>
