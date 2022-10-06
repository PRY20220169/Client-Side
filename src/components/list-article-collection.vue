<template>
	<article class="sc-article">
		<div class="num-article">
			<div class="check"></div>
			<span>{{ document.id + 1 }}</span>
		</div>
		<div class="info-article">
			<a @click="$router.push(`/article-details/${document.id}`)">
				<h5>{{ document.title }}</h5>
			</a>
			<h6>
				<a
					v-for="(author, i) of document.authors"
					:key="i"
					@click="$router.push(`/author-details/${author.id}`)"
				>
					{{ getNameAuthor(document.authors.length - 1, i, author) }}
				</a>
			</h6>
			<span
				>{{ document.publicationDate.toLocaleString("EN", { month: "long" }) }}
				{{ document.publicationDate.getFullYear() }} |
				<a href="#">{{ document.journal.name }}</a> {{ document.volume }}</span
			>
			<p>
				{{ document.description }}
			</p>
			<a @click="removeFromCollection({})">- Remove From Collection</a>
		</div>
		<div class="bb-data-article">
			<div
				class="metadata-art"
				v-for="(metric, i) of document.journal.metrics"
				:key="i"
			>
				<div class="metadata-type">
					<h2>{{ metric.score }}</h2>
					<i class="bx bx-link-external"></i>
				</div>

				<div>
					<h5>{{ metric.name }}</h5>
					<h6>From {{ metric.source }}</h6>
				</div>
				<hr />
			</div>
		</div>
	</article>
</template>

<script lang="ts">
	import { Article } from "@/interfaces/article.interface";
	import { PropType } from "vue";
	import { Author } from "@/interfaces/author.interface";
	import axios from "axios";

	export default {
		name: "list-article-collection",
		props: {
			document: {
				type: Object as PropType<Article>,
				required: true,
			},
		},
		methods: {
			getNameAuthor(length: number, position: number, author: Author) {
				if (length === position)
					return `and ${author.lastName}, ${author.firstName.substring(0, 1)}.`;
				return `${author.lastName}, ${author.firstName.substring(0, 1)}.`;
			},
			async removeFromCollection() {
				try {
					let { data } = await axios.delete(
						`${process.env.VUE_APP_API_URL}/api/collections/${this.$route.params.id}/articles/${this.document.id}`
					);
					this.$emit("remove-element", this.document.id);
				} catch (error) {
					alert("Could not remove article from collection");
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "../assets/styles/search-results-page/articles-search-rs";
</style>
