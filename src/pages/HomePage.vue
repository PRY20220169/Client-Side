<template>
	<main class="home">
		<div id="home-content">
			<div id="content-title">
				<h1>Search Papers, Journals <br />and Authors</h1>
			</div>
			<div id="content-actions">
				<div id="search-options">
					<CustomSelect
						:options="['Article']"
						:default="'Article'"
						@selectedOption="setSelectedOption"
					/>
					<div class="search-bar">
						<i class="bx bx-search-alt-2"></i>
						<input
							type="text"
							placeholder="Bibliometrics, scientific, workflow"
							v-model="searchText"
						/>
					</div>
					<custom-multiple-select
						:options="[
							{ name: 'AND', checked: false },
							{ name: 'OR', checked: false },
							{ name: 'AND NOT', checked: false },
						]"
					/>
				</div>
				<div id="search-buttons">
					<div class="btn-content">
						<button
							type="button"
							@click="
								$router.push({
									name: 'search-results',
									query: { q: searchText },
								})
							"
						>
							Search
						</button>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
	import CustomSelect from "@/components/custom-select";
	import CustomMultipleSelect from "@/components/custom-multiple-select";
	export default {
		components: { CustomMultipleSelect, CustomSelect },
		data() {
			return {
				selectedOption: "",
				searchText: "",
			};
		},
		methods: {
			setSelectedOption(option) {
				this.selectedOption = option;
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "../assets/styles/home-page/base-home-page";
</style>
