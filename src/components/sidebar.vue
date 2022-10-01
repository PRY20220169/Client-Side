<template>
	<aside aria-label="Sidebar">
		<div
			class="overflow-y-auto overflow-x-auto h-full py-3 px-1 bg-main rounded-r-lg"
		>
			<ul>
				<li class="mb-2">
					<router-link
						class="flex items-center justify-center flex-col p-2 text-base font-normal text-white rounded-lg hover:bg-gray-100"
						to="/"
						><Icon icon="bx-search-alt-2" width="36" height="36" />
						<span class="text-xs flex-1 whitespace-nowrap"
							>Search</span
						></router-link
					>
				</li>
				<li class="mb-2">
					<router-link
						class="flex items-center justify-center flex-col p-2 text-base font-normal text-white rounded-lg hover:bg-gray-100"
						to="/compare"
						><Icon icon="mdi:file-compare" width="36" height="36" />
						<span class="text-xs flex-1 whitespace-nowrap"
							>Compare</span
						></router-link
					>
				</li>
				<li class="mb-2">
					<router-link
						class="flex items-center justify-center flex-col p-2 text-base font-normal text-white rounded-lg hover:bg-gray-100"
						to="/list-collection"
						><Icon icon="mdi:list-box-outline" width="36" height="36" />
						<span class="text-xs flex-1 whitespace-nowrap"
							>Collections</span
						></router-link
					>
				</li>
			</ul>
		</div>
	</aside>
</template>

<script>
	import { Icon } from "@iconify/vue2";
	export default {
		name: "side-bar",
		components: {
			Icon,
		},
	};
</script>

<style scoped lang="scss"></style>
