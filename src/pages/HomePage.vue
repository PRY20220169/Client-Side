<template>
	<main class="home">
    <div id="home-content">
      <div id="content-title">
        <h1>Search Papers, Journals <br>and Authors</h1>
      </div>
      <div id="content-actions">
        <div id="search-options">
          <CustomSelect
            :options="['Authors', 'Source title', 'Article title','Keywords','Language']"
            :default="'Article title'"
            @selectedOption="setSelectedOption"
          />

          <div class="search-bar">
            <i class='bx bx-search-alt-2'></i>
            <input type="text" placeholder="Bibliometrics, scientific, workflow">
          </div>

          <custom-multiple-select :options="[{name:'AND',checked:false}, {name:'OR',checked:false}, {name:'AND NOT',checked:false}]"/>

        </div>
        <div id="search-buttons">
          <div class="btn-outline">
            <button type="button">Advanced Search</button>
          </div>
          <div class="btn-content">
            <button type="button"
                    @click="$router.push('search-results')"
            >Search</button>
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
    components: { CustomMultipleSelect, CustomSelect },
    data(){
      return {
        selectedOption: '',
      }
    },
    methods:{
      setSelectedOption(option){
        this.selectedOption = option;
        //console.log(this.selectedOption)
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../assets/styles/home-page/base-home-page";
</style>
