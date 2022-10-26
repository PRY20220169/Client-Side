<template>
	<aside aria-label="Sidebar">
		<div
			class="overflow-y-auto overflow-x-auto h-full py-3 px-1 bg-main rounded-r-lg"
		>
      <ul>
        <li class="mt-2 mb-6 ms-n6 w-24">
          <div
              class="flex items-center justify-center flex-col p-2 text-base font-normal text-white rounded-lg hover:bg-gray-100 hover:cursor-pointer"
              @click="goToSearch()"
          >
            <Icon icon="bx-search-alt-2" class="w-10 h-10"/>
            <span class="text-xs flex-1 whitespace-nowrap mt-3">Search</span>
          </div>
        </li>
        <li class="mb-6 ms-n6 w-24">
          <router-link
              class="flex items-center justify-center flex-col p-2 text-base font-normal text-white rounded-lg hover:bg-gray-100"
              to="/compare"
          ><Icon icon="mdi:file-compare" class="w-10 h-10"/>
            <span class="text-xs flex-1 whitespace-nowrap mt-3"
            >Compare</span
            ></router-link
          >
        </li>
        <li class="mb-6 ms-n6 w-24">
          <router-link
              class="flex items-center justify-center flex-col p-2 text-base font-normal text-white rounded-lg hover:bg-gray-100"
              to="/list-collection"
          ><Icon icon="mdi:list-box-outline" class="w-10 h-10"/>
            <span class="text-xs flex-1 whitespace-nowrap mt-3"
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
		methods: {
			goToSearch() {
				let q = this.$store.getters.getQuery;
				if (q === "") {
					this.$router.push("/");
				} else {
					this.$router.push({
						path: "/search-results",
						query: { q: q },
					});
				}
			},
		},
	};
</script>

<style lang="scss" scoped></style>
