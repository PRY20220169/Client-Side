<template>
	<main class="article-details">
		<router-view ref="rv"></router-view>
		<div id="container-article" v-show="isParentActive">
			<h2>{{ article.title }}</h2>
			<h3>
				By:
				<a
					v-for="(author, i) of article.authors"
					:key="i"
					@click="
						$router.push({
							name: 'author-details',
							params: { authorId: author.id.toString() },
						})
					"
				>
					{{ getNameAuthor(article.authors.length - 1, i, author) }}
				</a>
			</h3>
			<a @click="getCollections({})">+ Add to Collection</a>
			<v-dialog v-model="dialogCompose" width="500">
				<v-card>
					<v-card-title> My Collections </v-card-title>
					<v-card-text class="pa-5">
						<div
							v-for="collection in collections"
							:key="collection.id"
							@click="addArticleToCollection(collection)"
						>
							<p class="text-main underline hover:cursor-pointer">
								Add to: {{ collection.name }}
							</p>
						</div>
					</v-card-text>
					<v-card-actions class="pa-5">
						<v-btn
							class="ml-auto"
							@click="closeModal()"
							outlined
							color="primary"
							>Cancel</v-btn
						>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<div v-if="isSelected" class="btn-content">
				<button type="button" @click="removeArticleFromComparePage">
					Uncheck compare item
				</button>
			</div>
			<div v-else class="btn-outline">
				<button type="button" @click="addArticleToComparePage">
					Mark item to compare
				</button>
			</div>

			<div id="article-journal">
				<span>{{ article.journal.name }}</span>
				<div id="journal-details">
					<div>
						Volume:
						<h3>{{ article.volume }}</h3>
					</div>
					<div>
						DOI:
						<h3>10.1016/j.cmpb.2010.10.003</h3>
					</div>
					<div>
						Published:
						<h3>
							{{
								article.publicationDate.toLocaleString("EN", { month: "long" })
							}}
							{{ article.publicationDate.getFullYear() }}
						</h3>
					</div>
					<div>
						Document Type:
						<h3>{{ article.typeArticle }}</h3>
					</div>
				</div>
			</div>
			<h3>Abstract</h3>
			<p>{{ article.description }}</p>
		</div>
	</main>
</template>

<script lang="ts">
	import axios from "axios";
	import { Article } from "@/interfaces/article.interface";
	import Vue from "vue";
	import { Journal } from "@/interfaces/journal.interface";
	import { Author } from "@/interfaces/author.interface";

	export default Vue.extend({
		name: "article-details",

		data() {
			return {
				dialog: false,
				article: {
					authors: [],
					categories: [],
					description: "",
					id: 0,
					journal: {} as Journal,
					journalId: 0,
					keywords: [],
					numberOfCitations: 0,
					numberOfReferences: 0,
					publicationDate: new Date(),
					title: "",
					typeArticle: "",
					volume: "",
				} as Article,
				collections: [],
				idArticle: 0,
				isParentActive: true,
				isSelected: false,
				dialogCompose: false,
			};
		},
		methods: {
			async getArticleById() {
				this.idArticle = parseInt(this.$route.params.id);
				const { data } = await axios.get(
					`${process.env.VUE_APP_API_URL}/article/${this.idArticle}`
				);
				this.article = JSON.parse(JSON.stringify(data));
				this.article.publicationDate = new Date(this.article.publicationDate);
				this.updateSelectedProperty();
			},
			updateSelectedProperty() {
				const arts: Article[] = this.$store.getters.getArticles;

				let aux: Article | undefined;
				aux = arts.find((e) => e.id === this.article.id);

				if (typeof aux !== "undefined") {
					this.isSelected = true;
				}
			},
			addArticleToComparePage() {
				this.$store.dispatch("addArticleToCompare", this.article);
				this.$router.push({ name: "article-compare" });
			},
			removeArticleFromComparePage() {
				this.$store.dispatch("removeArticleOfComparison", this.article);
				this.isSelected = false;
			},
			getNameAuthor(length: number, position: number, author: Author) {
				if (length === position)
					return `and ${author.lastName}, ${author.firstName.substring(0, 1)}.`;
				return `${author.lastName}, ${author.firstName.substring(0, 1)}.`;
			},
			async getCollections() {
				this.dialogCompose = true;
				let { data } = await axios.get(
					`${process.env.VUE_APP_API_URL}/collections`
				);
				this.collections = data;
			},
			closeModal() {
				this.dialogCompose = false;
			},
			async addArticleToCollection(collection: any) {
				//TODO: Verify if POST accepts an object or an array
				const res = await axios.post(
					`${process.env.VUE_APP_API_URL}/collections/${collection.id}/articles`,
					this.article
				);
				console.log("Collection ID" + collection.id);
				console.log("Article ID" + this.article.id);
				this.dialogCompose = false;
			},
		},
		updated() {
			this.isParentActive = typeof this.$refs.rv === "undefined";
		},
		mounted() {
			this.isParentActive = typeof this.$refs.rv === "undefined";
		},
		created() {
			this.getArticleById();
		},
	});
</script>

<style lang="scss" scoped>
	@import "../../assets/styles/article-details-page/base-article-details";
</style>
