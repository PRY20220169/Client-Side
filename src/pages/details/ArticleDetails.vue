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
					<p
						class="inline-block underline cursor-pointer transition ease-in-out mb-0"
					>
						{{ getNameAuthor(article.authors.length - 1, i, author) }}
					</p>
				</a>
			</h3>
			<v-dialog v-model="dialogCompose" width="500">
				<v-card>
					<v-card-title> My Collections </v-card-title>
					<v-card-text class="pa-5">
						<div
							v-for="collection in collections"
							:key="collection.id"
							@click="addArticleToCollection(collection)"
						>
							<p class="text-black hover:cursor-pointer">
								Add to:
								<span class="text-main underline hover:cursor-pointer">{{
									collection.name
								}}</span>
							</p>
						</div>
					</v-card-text>
					<v-card-actions class="pa-5">
						<v-btn
							class="ml-auto"
							@click="closeModal()"
							outlined
							color="primary"
							>Close</v-btn
						>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<div class="flex space-x-2">
				<div
					class="w-fit border rounded-lg border-main text-center text-main font-normal text-sm py-2.5 px-6 hover:cursor-pointer hover:bg-main hover:text-white transition ease-in-out"
					@click="getCollections({})"
				>
					Add to Collection
				</div>
				<div
					v-if="isSelected"
					class="w-fit border rounded-lg border-main text-center text-main font-normal text-sm py-2.5 px-6 hover:cursor-pointer hover:bg-main hover:text-white transition ease-in-out"
					@click="removeArticleFromComparePage"
				>
          Remove Article to compare
				</div>
				<div
					v-if="!isSelected"
					class="w-fit border rounded-lg border-main text-center text-main font-normal text-sm py-2.5 px-6 hover:cursor-pointer hover:bg-main hover:text-white transition ease-in-out"
					@click="addArticleToComparePage"
				>
					Compare Article
				</div>
			</div>
      <div class="flex space-x-2">
        <div class="btn-content">
          <div
              class="flex items-center w-fit border rounded-lg bg-main text-white text-center font-normal text-sm py-2.5 px-6 hover:cursor-pointer hover:brightness-75 transition ease-in-out"
              @click="CopyCitationToClipboard()"
          >
            <img src="../../assets/icons/quote.svg" alt="" class="ml-n1 mr-3" />
            Copy Citation to Clipboard
          </div>
        </div>
      </div>
			<div>
        <span class="text-2xl transition ease-in-out mt-4 font-semibold">
          Journal:
        </span>
				<a
					class="text-2xl inline-block underline cursor-pointer transition ease-in-out mt-4"
					@click="$router.push(`/journal-details/${article.journal.id}`)"
					>{{ article.journal.name }}</a
				>
				<div id="journal-details">
					<h3 class="text-lg mt-5">
						Published:
						<span class="font-normal"
							>{{
								article.publicationDate.toLocaleString("EN", { month: "long" })
							}}
							{{ article.publicationDate.getFullYear() }}</span
						>
					</h3>
					<h3 class="text-lg mt-1">
						Document Type: <span class="font-normal">Article</span>
					</h3>
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
				try {
					const { data } = await axios.get(
						`${process.env.VUE_APP_API_URL}/api/articles/${this.idArticle}`
					);
					this.article = JSON.parse(JSON.stringify(data));
					this.article.publicationDate = new Date(this.article.publicationDate);
					this.updateSelectedProperty();
				} catch (error) {
					this.$swal.fire({
						icon: "error",
						title: "Could Not Get Articles",
						text: "Please Try Again Later",
					});
				}
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
				if (this.$store.getters.getArticles.length < 2) {
					this.$store.dispatch("addArticleToCompare", this.article);
					this.isSelected = true;
					this.$swal.fire({
						icon: "success",
						title: "Added Article To Compare",
						showConfirmButton: false,
						timer: 1000,
					});
				} else {
					this.$swal.fire({
						icon: "error",
						title: "Cannot Add More Than 2 Articles",
					});
				}
			},
			removeArticleFromComparePage() {
				this.$store.dispatch("removeArticleOfComparison", this.article);
				this.isSelected = false;
				this.$swal.fire({
					icon: "success",
					title: "Removed Article From Compare",
					showConfirmButton: false,
					timer: 1000,
				});
			},
			getNameAuthor(length: number, position: number, author: Author) {
				if (length === position)
					return `and ${author.lastName}, ${author.firstName.substring(0, 1)}.`;
				return `${author.lastName}, ${author.firstName.substring(0, 1)}.`;
			},
			async getCollections() {
				this.dialogCompose = true;
				try {
					let { data } = await axios.get(
						`${process.env.VUE_APP_API_URL}/api/users/${this.$store.state.userId}/account/collections`
					);
					this.collections = data.content;
				} catch (error) {
					this.$swal.fire({
						icon: "error",
						title: "Could Not Get Collections",
						text: "Please Try Again Later",
					});
				}
			},
			closeModal() {
				this.dialogCompose = false;
			},
			async addArticleToCollection(collection: any) {
				try {
					let { data } = await axios.get(
						`${process.env.VUE_APP_API_URL}/api/collections/${collection.id}`
					);
					const found = data.articles.some(
						(item: any) => item.id === this.article.id
					);
					if (!found) {
						const res = await axios.post(
							`${process.env.VUE_APP_API_URL}/api/collections/${collection.id}/articles/${this.article.id}`
						);
						this.$swal.fire({
							icon: "success",
							title: "Article Added to Collection",
							showConfirmButton: false,
							timer: 1000,
						});
					} else {
						this.$swal.fire({
							icon: "error",
							title: "Article Already Exists In This Collection",
							text: "Please Choose Another Collection",
						});
					}
				} catch (error) {
					console.log(error);
					this.$swal.fire({
						icon: "error",
						title: "Could Not Add Article",
						text: "Please Try Again Later",
					});
				}
				this.dialogCompose = false;
			},
      async CopyCitationToClipboard() {
        try {
          let { data } = await axios.get(
              `${process.env.VUE_APP_API_URL}/api/articles/${this.$route.params.id}/reference`
          );
          await navigator.clipboard.writeText(data.reference);
          this.$swal.fire({
            icon: "success",
            title: "Citation Copied To Clipboard",
            showConfirmButton: false,
            timer: 1000,
          });
        } catch (error) {
          this.$swal.fire({
            icon: "error",
            title: "Could Not Copy Citation",
            text: "Please Try Again Later",
          });
        }
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
