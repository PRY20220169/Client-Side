<template>
	<main class="article-compare">
		<h3 id="article-compare__description">
			Comparing {{ articles.length }} articles
		</h3>
		<div id="article-compare__content">
			<div class="article-card" v-for="(art, i) of articles" :key="i">
				<div class="card__title">
					<h3>{{ art.title }}</h3>
				</div>
				<div class="card__details">
					<hr />
					<h3 class="text-main">Cuartil: {{ art.journal.metrics[0].score }}</h3>
					<hr />
					<h3 class="">
						Journal Inpact Factor: {{ art.journal.metrics[1].score }}
					</h3>
					<hr />
					<h3 class="text-main">H-Index: {{ art.journal.metrics[2].score }}</h3>
					<hr />
					<h3 class="">Año de publicación: {{ art.publicationDate }}</h3>
					<hr />
					<h3 class="text-main">Journal: {{ art.journal.name }}</h3>
					<div
						class="w-fit border rounded-lg bg-secondary text-white text-center font-normal text-sm py-2.5 px-6 hover:cursor-pointer hover:border-secondary hover:bg-white hover:text-secondary transition ease-in-out mx-auto mt-5"
						@click="removeArticleFromComparePage(art)"
					>
						Remove Article
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
	import Vue from "vue";
	import { Article } from "@/interfaces/article.interface";
	export default Vue.extend({
		name: "article-compare",
		data() {
			return {
				articles: [],
			};
		},
		methods: {
			removeArticleFromComparePage(art: any) {
				this.$store.dispatch("removeArticleOfComparison", art);
				this.articles = this.$store.getters.getArticles;
			},
		},
		created() {
			this.articles = this.$store.getters.getArticles;
		},
	});
</script>

<style lang="scss" scoped>
	@import "../../assets/styles/article-compare-page/base-article-compare.scss";
</style>
