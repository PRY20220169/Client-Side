<template>
	<main class="author-compare">
		<h3 id="author-compare__description">
			Comparing {{ authors.length }} authors
		</h3>
		<div id="author-compare__content">
			<div id="author-card" v-for="(author, i) of authors" :key="i">
				<div class="card__info">
					<div class="info__picture">
						<img
							src="https://storage.googleapis.com/www-paredro-com/uploads/2015/08/shutterstock_188419790-e1439475344980.jpg"
							alt="profile image"
						/>
					</div>
					<div class="info__data">
						<h2>{{ author.lastName }}, {{ author.firstName }}</h2>
						<h4 v-for="(org, i) of author.organizations" :key="i">
							- {{ org }}
						</h4>
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
					<span class="metrics__subtitle">Peer Review Metrics</span>
					<div class="review-metrics">
						<div
							class="metrics__metric"
							v-for="(metric, i) of author.metrics"
							:key="i"
						>
							<h3 v-if="i >= 4">{{ metric.score }}</h3>
							<h4 v-if="i >= 4">{{ metric.name }}</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
	import Vue from "vue";
	import { Author } from "@/interfaces/author.interface";
	export default Vue.extend({
		name: "author-compare",
		data() {
			return {
				authors: [] as Author[],
			};
		},

		created() {
			this.authors = this.$store.getters.getAuthors;
		},
	});
</script>

<style scoped lang="scss">
	@import "../../assets/styles/author-details-page/author-card";

	.author-compare {
		#author-compare__description {
			font-family: "Poppins", sans-serif;
			padding-left: 50px;
			padding-top: 25px;
		}

		#author-compare__content {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			gap: 40px;
			padding-top: 50px;
			padding-bottom: 50px;
		}
	}
</style>
