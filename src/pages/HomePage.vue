<template>
	<main class="home">
    <div id="home-content">
      <div id="content-title">
        <h1>Search Papers, Journals <br>and Authors</h1>
      </div>
      <div id="content-actions">
        <div id="search-options">
          <CustomSelect
            :options="['Publication titles', 'Author', 'Journal']"
            :default="'Publication titles'"
          />

          <div class="search-bar">
            <i class='bx bx-search-alt-2'></i>
            <input type="text" placeholder="Bibliometrics, scientific, workflow">
          </div>

          <custom-multiple-select :options="[{name:'Html & CSS',checked:false}, {name:'Javascript',checked:false}, {name:'Typescript',checked:false}]"/>

        </div>
        <div id="search-buttons">
          <div class="btn-outline">
            <button type="button">Advanced Search</button>
          </div>
          <div class="btn-content">
            <button type="button">Search</button>
          </div>
        </div>
      </div>
    </div>
    <footer id="home-footer"></footer>
  </main>
</template>

<script>
	import CustomSelect from "@/components/custom-select";
  import CustomMultipleSelect from "@/components/custom-multiple-select";
  export default {
    components: { CustomMultipleSelect, CustomSelect }
  };
</script>

<style scoped lang="scss">
  @import "../assets/styles/home-page/base-home-page";
</style>
