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
					<h3 class="details__purple">
						Cuartil: {{ art.journal.metrics[0].score }}
					</h3>
					<hr />
					<h3 class="details__dark">
						Journal Inpact Factor: {{ art.journal.metrics[1].score }}
					</h3>
					<hr />
					<h3 class="details__purple">
						H-Index: {{ art.journal.metrics[2].score }}
					</h3>
					<hr />
					<h3 class="details__dark">
						Año de publicación: {{ art.publicationDate }}
					</h3>
					<hr />
					<h3 class="details__purple">Journal: {{ art.journal.name }}</h3>
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
				articles: [] as Article[],
			};
		},
		created() {
			this.articles = this.$store.getters.getArticles;
		},
	});
</script>

<style scoped lang="scss">
	@import "../../assets/styles/article-compare-page/base-article-compare.scss";
</style>
