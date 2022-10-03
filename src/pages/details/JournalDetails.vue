<template>
	<main class="journal-details m-10">
		<router-view ref="rv"></router-view>
		<h1 class="text-3xl font-medium mb-10">Journal Details</h1>
		<div class="flex space-x-10">
			<div class="row-left w-7/12">
				<div
					class="flex flex-col card border rounded-lg border-gray-light shadow-md p-5"
				>
					<p class="text-2xl text-center font-regular text-black">
						{{ journal.name }}
					</p>
					<p class="text-lg font-medium text-black">Metrics</p>
					<li
						class="list-none"
						v-for="(metric, index) in journal.metrics"
						:key="index"
					>
						<p class="text-sm">
							<span class="font-medium">{{ metric.name }}</span>
							{{ metric.score }}
						</p>
					</li>
					<div
						v-if="!isSelected"
						class="w-fit border rounded-lg border-main text-center text-main font-normal text-sm py-2.5 px-6 hover:cursor-pointer hover:bg-main hover:text-white transition ease-in-out mb-6 mx-auto"
						@click="addJournalToComparePage()"
					>
						Compare Journal
					</div>
					<div
						v-if="isSelected"
						class="w-fit border rounded-lg bg-main text-white text-center font-normal text-sm py-2.5 px-6 hover:cursor-pointer hover:border-main hover:bg-white hover:text-main transition ease-in-out mb-6 mx-auto"
						@click="removeJournalFromComparePage()"
					>
						Remove Journal
					</div>
				</div>
			</div>
			<div class="row-right w-full">
				<p class="font-medium">Journal Scope</p>
				<div class="card border rounded-lg border-gray-light shadow-md p-5">
					{{ journal.name }}
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
					`${process.env.VUE_APP_API_URL}/journals/${this.idJournal}`
				);
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
