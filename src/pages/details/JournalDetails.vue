<template>
	<main class="journal-details m-10">
		<router-view ref="rv"></router-view>
		<h1 class="text-3xl font-medium mb-10">Journal Details</h1>
		<div class="flex space-x-10">
			<div class="row-left w-7/12">
				<div
					class="flex flex-col card border rounded-lg border-gray-light shadow-md p-5 pb-10"
				>
					<p class="text-2xl text-center font-regular text-black">
						{{ journal.name }}
					</p>
					<p class="text-lg font-medium text-black">Metrics</p>
					<p class="text-md text-gray-dark">Publication Metrics:</p>
					<a
						:href="`https://www.scimagojr.com/journalsearch.php?q=${journal.scimagoId}&amp;tip=sid&amp;exact=no`"
						title="SCImago Journal &amp; Country Rank"
						target="_blank"
						><img
							border="0"
							:src="`https://www.scimagojr.com/journal_img.php?id=${journal.scimagoId}`"
							alt="SCImago Journal &amp; Country Rank"
					/></a>
				</div>
			</div>
			<div class="row-right w-full">
				<p class="font-medium">Journal Details</p>
				<div class="card border rounded-lg border-gray-light shadow-md p-5">
					<p class="text-md mb-4">
						<span class="font-medium">Categories: </span>
						{{ journal.categories }}
					</p>
					<p class="text-md mb-4">
						<span class="font-medium">Country: </span>
						{{ journal.country }}
					</p>
					<p class="text-md mb-4">
						<span class="font-medium">Publisher: </span>
						{{ journal.publisher }}
					</p>
					<a
						class="text-main mb-4"
						:href="`https://www.scimagojr.com/journalsearch.php?q=${journal.scimagoId}&tip=sid`"
						target="_blank"
					>
						<span class="font-medium">Open in Scimago</span>
					</a>
					<h3 class="text-lg font-semibold mt-6 mb-4">Bibliometrics:</h3>
					<div
						class="space-y-10 mb-4"
						v-for="(metric, index) in journal.metrics"
						:key="index"
					>
						<span class="text-main mb-4"
							>{{ metric.bibliometric }}{{ `: ` }}{{ metric.score }}</span
						>
					</div>
					<div
						v-if="!isSelected"
						class="w-fit border rounded-lg border-main text-center text-main font-normal text-sm py-2.5 px-6 hover:cursor-pointer hover:bg-main hover:text-white transition ease-in-out mb-6 mt-6"
						@click="addJournalToComparePage()"
					>
						Compare Journal
					</div>
					<div
						v-if="isSelected"
						class="w-fit border rounded-lg bg-main text-white text-center font-normal text-sm py-2.5 px-6 hover:cursor-pointer hover:border-main hover:bg-white hover:text-main transition ease-in-out mb-6 mt-6"
						@click="removeJournalFromComparePage()"
					>
						Remove Journal
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
	import axios from "axios";
	import { Journal } from "@/interfaces/journal.interface";
	import { Metric } from "@/interfaces/metric.interface";
	export default {
		data() {
			return {
				isSelected: false,
				journal: {
					id: 1,
					name: "Template",
					metrics: [] as Metric[],
				} as Journal,
				isParentActive: true,
				idJournal: 0,
			};
		},
		methods: {
			async getJournalDetailsById() {
				this.idJournal = parseInt(this.$route.params.journalId);
				const { data } = await axios.get(
					`${process.env.VUE_APP_API_URL}/api/journals/${this.idJournal}`
				);
				console.log(data);
				this.journal = JSON.parse(JSON.stringify(data));
				this.updateSelectedProperty();
			},
			updateSelectedProperty() {
				const journals: Journal[] = this.$store.getters.getJournals;

				let aux: Journal | undefined;
				aux = journals.find((e) => e.id === this.idJournal);

				if (typeof aux !== "undefined") {
					this.isSelected = true;
				}
			},
			addJournalToComparePage() {
				if (this.$store.getters.getJournals.length < 2) {
					this.$store.dispatch("addJournalToCompare", this.journal);
					this.isSelected = true;
				} else {
					alert("Cannot add more than 2 journals");
				}
			},
			removeJournalFromComparePage() {
				this.$store.dispatch("removeJournalOfComparison", this.journal);
				this.isSelected = false;
			},
		},
		updated() {
			this.isParentActive = typeof this.$refs.rv === "undefined";
		},
		mounted() {
			this.isParentActive = typeof this.$refs.rv === "undefined";
		},
		created() {
			this.getJournalDetailsById();
		},
	};
</script>

<style scoped></style>
