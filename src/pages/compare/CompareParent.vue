<template>
	<main class="compare">
		<nav class="m-5 flex justify-center space-x-10">
			<router-link
				class="hover:cursor-pointer text-lg font-medium underline"
				exact-active-class="text-main"
				to="/compare"
				>Articles</router-link
			>
			<router-link
				class="hover:cursor-pointer text-lg font-medium underline"
				exact-active-class="text-main"
				to="/compare/author-compare"
				>Authors</router-link
			>
			<router-link
				class="hover:cursor-pointer text-lg font-medium underline"
				exact-active-class="text-main"
				to="/compare/journal-compare"
				>Journals</router-link
			>
		</nav>
		<router-view></router-view>
	</main>
</template>

<script>
	export default {};
</script>

<style scoped></style>
