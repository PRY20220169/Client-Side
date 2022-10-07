<template>
	<main class="author-details m-10">
		<div id="content-author-details">
			<div id="author-card">
				<div class="">
					<img
						class="w-36 h-36 rounded-full mb-10"
						:src="getImgUrl(author)"
						alt="profile image"
					/>
					<div class="info__data">
						<h2 class="mb-10">{{ author.lastName }}, {{ author.firstName }}</h2>
						<h4 v-for="(org, i) of author.organizations" :key="i">
							- {{ org }}
						</h4>
						<div v-if="isSelected" class="btn-content">
							<button type="button" @click="removeAuthorFromComparePage">
								Unmark Author
							</button>
						</div>
						<div v-else class="btn-outline">
							<button type="button" @click="addAuthorToComparePage">
								Compare Author
							</button>
						</div>
					</div>
				</div>
				<div class="card__metrics">
					<h3 class="metrics__title">Metrics</h3>
					<span class="metrics__subtitle">Publication Metrics</span>
					<div class="pub-metrics">
						<div
							class="metrics__metric"
							v-for="(metric, i) of author.metrics"
							:key="i"
						>
							<h3 v-if="i < 4">{{ metric.score }}</h3>
							<h4 v-if="i < 4">{{ metric.name }}</h4>
						</div>
					</div>
				</div>
			</div>
			<div id="author-publications">
				<div class="publications__header">
					<h2>Top publications</h2>
					<a>See all publications</a>
				</div>
				<div class="publications">
					<div
						class="publications__publication"
						v-for="(article, i) of author.articles"
						:key="i"
					>
						<div class="publication__info">
							<div class="info__title">
								<h3>{{ article.title }}</h3>
							</div>
							<div class="info__authors">
								<h4 v-for="(authorArt, i) of article.authors" :key="i">
									{{ getNameAuthor(article.authors.length - 1, i, authorArt) }}
								</h4>
							</div>
							<div class="info__journal">
								<h5>Published {{ getArticleDate(article.publicationDate) }}</h5>
								<a>{{ article.journal.name }}</a>
							</div>
						</div>
						<div class="publication__metric">
							<h1>3</h1>
							<h3>Times <br />cited</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
	import Vue from "vue";
	import axios from "axios";
	import { Article } from "@/interfaces/article.interface";
	import { Metric } from "@/interfaces/metric.interface";
	import { Author } from "@/interfaces/author.interface";

	export default Vue.extend({
		name: "author-details",
		data() {
			return {
				authorId: 0,
				author: {
					id: 0,
					firstName: "",
					lastName: "",
					address: "",
					email: "",
					organizations: [] as string[],
					metrics: [] as Metric[],
					articles: [] as Article[],
				} as Author,
				isSelected: false,
			};
		},
		methods: {
			async getAuthorById() {
				this.authorId = parseInt(this.$route.params.authorId);
				const { data } = await axios.get(
					`${process.env.VUE_APP_API_URL}/api/authors/${this.authorId}`
				);
				this.author = JSON.parse(JSON.stringify(data));
				this.updateSelectedProperty();
			},
			getNameAuthor(length: number, position: number, author: Author) {
				if (length === position)
					return `${author.lastName}, ${author.firstName}`;
				return `${author.lastName}, ${author.firstName};`;
			},
			getArticleDate(dateString: string) {
				const dateArticle = new Date(dateString);
				return `${dateArticle
					.toLocaleString("EN", { month: "long" })
					.substring(0, 3)} ${dateArticle.getFullYear()}`;
			},
			updateSelectedProperty() {
				const authr: Author[] = this.$store.getters.getAuthors;

				let aux: Author | undefined;
				aux = authr.find((e) => e.id === this.author.id);

				if (typeof aux !== "undefined") {
					this.isSelected = true;
				}
			},
			addAuthorToComparePage() {
				if (this.$store.getters.getAuthors.length < 2) {
					this.$store.dispatch("addAuthorToCompare", this.author);
					this.isSelected = true;
					this.$swal.fire({
						icon: "success",
						title: "Added Author To Compare",
						showConfirmButton: false,
						timer: 1000,
					});
				} else {
					this.$swal.fire({
						icon: "error",
						title: "Cannot Add More Than 2 Authors",
					});
				}
			},
			removeAuthorFromComparePage() {
				this.$store.dispatch("removeAuthorOfComparison", this.author);
				this.isSelected = false;
				this.$swal.fire({
					icon: "success",
					title: "Removed Author From Compare",
					showConfirmButton: false,
					timer: 1000,
				});
			},
			getImgUrl(author: any) {
				return (
					"https://avatars.dicebear.com/api/initials/" +
					author.firstName +
					"-" +
					author.lastName +
					".svg"
				);
			},
		},
		created() {
			this.getAuthorById();
		},
	});
</script>

<style lang="scss" scoped>
	@import "../../assets/styles/author-details-page/base-author-details.scss";
</style>
