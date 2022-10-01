<template>
	<main class="compare">
		<nav class="m-5 flex justify-center space-x-10">
			<router-link
				class="hover:cursor-pointer text-lg font-medium underline"
				exact-active-class="text-main"
				to="/compare"
				>Article</router-link
			>
			<router-link
				class="hover:cursor-pointer text-lg font-medium underline"
				exact-active-class="text-main"
				to="/compare/author-compare"
				>Author</router-link
			>
			<router-link
				class="hover:cursor-pointer text-lg font-medium underline"
				exact-active-class="text-main"
				to="/compare/journal-compare"
				>Journal</router-link
			>
		</nav>
		<router-view></router-view>
	</main>
</template>

<script>
	export default {};
</script>

<style></style>
