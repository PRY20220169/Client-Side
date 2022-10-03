<template>
	<main class="article-collection search-results">
		<nav id="nav-bar">
			<h3>{{ $route.params.name }}</h3>
			<div class="nav-actions"></div>
		</nav>
		<div id="search-results-content">
			<aside id="aside">
				<div class="filter-block" v-for="(category, i) of filters" :key="i">
					<h3>{{ category.title }}</h3>
					<div class="filter-options">
						<div
							class="option-check"
							v-for="(option, i) of category.options"
							:class="{ checked: option.checked }"
							:key="i"
						>
							<div
								class="check"
								@click="
									handlerFilterOptions(
										category.categoryType,
										option.name,
										option.checked
									);
									option.checked = !option.checked;
								"
							>
								<i
									class="bx check-icon"
									:class="{ 'bx-check': option.checked }"
								></i>
							</div>
							<h4>{{ option.name }}</h4>
						</div>
					</div>
				</div>
			</aside>
			<section id="content-section">
				<list-article-collection
					v-for="(doc, i) of filteredDocuments"
					:key="i"
					:document="doc"
				></list-article-collection>
			</section>
		</div>
	</main>
</template>

<script lang="ts">
	import ListArticleCollection from "@/components/list-article-collection.vue";
	import axios from "axios";
	import { Article } from "@/interfaces/article.interface";
	export default {
		components: { ListArticleCollection },
		data() {
			return {
				filters: [
					{
						title: "Año de publicación",
						categoryType: "Year",
						options: [
							{ name: "2022", checked: false },
							{ name: "2021", checked: false },
							{ name: "2020", checked: false },
							{ name: "2019", checked: false },
						],
					},
					{
						title: "Tipo de documento",
						categoryType: "Type",
						options: [
							{ name: "Article", checked: false },
							{ name: "Conference", checked: false },
							{ name: "Composium", checked: false },
						],
					},
					{
						title: "Quartil",
						categoryType: "Quartile",
						options: [
							{ name: "Q1", checked: false },
							{ name: "Q2", checked: false },
						],
					},
				],
				documents: [] as Article[],
				filteredDocuments: [] as Article[],
				filterOptions: {
					years: [] as string[],
					types: [] as string[],
					quartiles: [] as string[],
				},
				qsearch: "",
			};
		},
		methods: {
			async getArticlesFromCollection() {
				let { data } = await axios.get(
					`${process.env.VUE_APP_API_URL}/collections/${this.$route.params.id}`
				);

				// TODO: Remove this when API is implemented
				data = data.articles;
				this.documents = JSON.parse(JSON.stringify(data));
				this.filteredDocuments = JSON.parse(JSON.stringify(data));

				this.documents.map((item) => {
					item.publicationDate = new Date(item.publicationDate);
				});

				this.filteredDocuments.map((item) => {
					item.publicationDate = new Date(item.publicationDate);
				});
			},
			filterDocuments() {
				const { years, types, quartiles } = this.filterOptions;
				this.filteredDocuments = this.documents.filter((article) => {
					const quartile = article.journal.metrics[0].score; //osea sy quartil
					return (
						(years.length > 0
							? years
									.map((e) => {
										return e;
									})
									.includes(article.publicationDate.getFullYear().toString())
							: true) &&
						(types.length > 0
							? types
									.map((e) => {
										return e;
									})
									.includes(article.typeArticle)
							: true) &&
						(quartiles.length > 0
							? quartiles
									.map((e) => {
										return e;
									})
									.includes(quartile)
							: true)
					);
				});
			},
			handlerFilterOptions(category: string, option: string, checked: boolean) {
				if (checked) {
					this.removeFilterOption(category, option);
				} else {
					this.addFilterOption(category, option);
				}
				this.filterDocuments();
			},
			// eslint-disable-next-line
			addFilterOption(category: string, option: any) {
				switch (category) {
					case "Year":
						this.filterOptions.years.push(option);
						break;
					case "Type":
						this.filterOptions.types.push(option);
						break;
					case "Quartile":
						this.filterOptions.quartiles.push(option);
						break;
				}
			},
			// eslint-disable-next-line
			removeFilterOption(category: string, option: any) {
				switch (category) {
					case "Year":
						this.filterOptions.years = this.filterOptions.years.filter(
							(opt) => {
								return opt != option;
							}
						);
						break;
					case "Type":
						this.filterOptions.types = this.filterOptions.types.filter(
							(opt) => {
								return opt != option;
							}
						);
						break;
					case "Quartile":
						this.filterOptions.quartiles = this.filterOptions.quartiles.filter(
							(opt) => {
								return opt != option;
							}
						);
						break;
				}
			},
		},
		created() {
			this.getArticlesFromCollection();
		},
		mounted() {
			this.qsearch = this.$route.query.q as string;
		},
	};
</script>

<style lang="scss" scoped>
	@import "../../assets/styles/search-results-page/base-search-rs-page";
</style>
