<template>
	<main class="author-compare">
		<h3 id="author-compare__description" class="mb-10">
			Comparing {{ authors.length }} authors
		</h3>
		<div id="" class="flex flex-row justify-center space-x-10">
			<div
				id="author-card"
				v-for="(author, i) of authors"
				:key="i"
				class="w-1 mb-10"
			>
				<div class="card__info">
					<img
						class="w-36 h-36 rounded-full mb-10"
						:src="getImgUrl(author)"
						alt="profile image"
					/>
					<div class="info__data">
						<h2>{{ author.lastName }}, {{ author.firstName }}</h2>
						<h4 v-for="(org, i) of author.organizations" :key="i">
							- {{ org }}
						</h4>
					</div>
				</div>
				<div
					class="flex items-center w-fit border rounded-lg bg-secondary text-white text-center font-normal text-sm py-2.5 px-6 hover:cursor-pointer hover:brightness-75 transition ease-in-out mx-auto mt-5"
					@click="removeAuthorFromComparePage(author)"
				>
					<img src="../../assets/icons/delete.svg" alt="" class="ml-n1 mr-3" />
					Remove Author
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
		methods: {
			removeAuthorFromComparePage(author: any) {
				this.$store.dispatch("removeAuthorOfComparison", author);
				this.authors = this.$store.getters.getAuthors;
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
			this.authors = this.$store.getters.getAuthors;
		},
	});
</script>

<style lang="scss" scoped>
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
