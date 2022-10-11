<template>
	<main class="search-results">
		<nav id="nav-bar">
			<h3>{{ filteredDocuments.length }} resultados de su búsqueda</h3>
			<div class="nav-actions">
				<div class="search-bar">
					<i class="bx bx-search-alt-2"></i>
					<input
						type="text"
						placeholder="Bibliometrics, scientific, workflow"
						v-model="qsearch"
					/>
				</div>
				<div id="search-buttons">
					<div class="btn-content">
						<button type="button" @click="updateSearch()">Update Search</button>
					</div>
				</div>
			</div>
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
				<div v-if="filteredDocuments.length > 0" class="space-y-5">
					<pub-article
						v-for="(doc, i) of filteredDocuments"
						:key="i"
						:document="doc"
					></pub-article>
				</div>
				<div v-if="loading" class="lds-dual-ring"></div>
				<div v-if="filteredDocuments.length == 0 && !loading">
					<h3>No articles found</h3>
				</div>
			</section>
		</div>
	</main>
</template>

<script lang="ts">
	import PubArticle from "@/components/pub-article.vue";
	import axios from "axios";
	import Vue from "vue";

	import { Article } from "@/interfaces/article.interface";

	export default Vue.extend({
		components: { PubArticle },
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
					// {
					// 	title: "Tipo de documento",
					// 	categoryType: "Type",
					// 	options: [
					// 		{ name: "Article", checked: false },
					// 		{ name: "Conference", checked: false },
					// 		{ name: "Composium", checked: false },
					// 	],
					// },
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
				parameters: [] as string[],
				loading: false,
			};
		},
		methods: {
			async updateSearch() {
				this.getDocuments();
			},
			async getDocuments() {
				this.documents = [];
				this.filteredDocuments = [];
				this.loading = true;

				this.parameters = this.qsearch.split(",");
				const articlesByKeyword = await axios.post(
					`${process.env.VUE_APP_API_URL}/api/articles/search/keywords`,
					{ keywords: this.parameters }
				);
				const articlesByCategory = await axios.post(
					`${process.env.VUE_APP_API_URL}/api/articles/search/categories`,
					{ categories: this.parameters }
				);
				this.documents = [];
				this.filteredDocuments = [];
				this.documents = articlesByKeyword.data.content;
				this.documents.push(...articlesByCategory.data.content);
				const uniqueArray = this.documents.filter((value, index) => {
					const _value = JSON.stringify(value);
					return (
						index ===
						this.documents.findIndex((obj) => {
							return JSON.stringify(obj) === _value;
						})
					);
				});
				// this.documents.filter(
				// 	(v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
				// );
				this.documents = uniqueArray;
				this.filteredDocuments = this.documents;
				this.documents.map((item) => {
					item.publicationDate = new Date(item.publicationDate);
				});
				this.filteredDocuments.map((item) => {
					item.publicationDate = new Date(item.publicationDate);
				});
				this.loading = false;
			},
			filterDocuments() {
				const { years, types, quartiles } = this.filterOptions;
				this.filteredDocuments = this.documents.filter((article) => {
					const quartile = article.journal.metrics[0].score;
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
			this.qsearch = this.$route.query.q as string;
			this.getDocuments();
		},
		mounted() {
			this.qsearch = this.$route.query.q as string;
		},
	});
</script>

<style lang="scss" scoped>
	@import "../assets/styles/search-results-page/base-search-rs-page";

	.lds-dual-ring {
		display: inline-block;
		width: 80px;
		height: 80px;
	}
	.lds-dual-ring:after {
		content: " ";
		display: block;
		width: 64px;
		height: 64px;
		margin: 8px;
		border-radius: 50%;
		border: 6px solid #5860ff;
		border-color: #5860ff transparent #5860ff transparent;
		animation: lds-dual-ring 1.2s linear infinite;
	}
	@keyframes lds-dual-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
