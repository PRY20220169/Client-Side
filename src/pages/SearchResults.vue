<template>
  <main class="search-results">
    <nav id="nav-bar">
      <h3>3 resultados de su búsqueda</h3>
      <div class="nav-actions">
        <div class="search-bar">
          <i class="bx bx-search-alt-2"></i>
          <input type="text" placeholder="Bibliometrics, scientific, workflow">
        </div>
        <div id="search-buttons">
          <div class="btn-content">
            <button type="button">Advanced Search</button>
          </div>
          <div class="btn-content">
            <button type="button">Edit filters</button>
          </div>
        </div>
      </div>
    </nav>
    <div id="search-results-content">
      <aside id="aside">

        <div class="filter-block"
             v-for="(category, i) of filterOptions"
             :key="i"
        >
          <h3>{{ category.title }}</h3>
          <div class="filter-options">
            <div class="option-check"
                 v-for="(option, i) of category.options"
                 :class="{checked:option.checked}"
                 :key="i"
            >
              <div class="check"
                   @click="
                   option.checked = !option.checked;"
              >
                <i class="bx check-icon" :class="{'bx-check': option.checked}"></i>
              </div>
              <h4>{{ option.name }}</h4>
            </div>
          </div>

        </div>

      </aside>

      <section id="content-section">
        <pub-article></pub-article>
        <pub-article></pub-article>
      </section>
    </div>


  </main>
</template>

<script>
import PubArticle from "@/components/pub-article";
export default {
  components: { PubArticle },
  //components: { PubArticle },
  data() {
    return {
      filterOptions: [
        {
          title: "Año de publicación",
          options: [
            { name: "2022", checked: false },
            { name: "2022", checked: false },
            { name: "2020", checked: false },
            { name: "2019", checked: false }]
        },
        {
          title: "Tipo de documento",
          options: [
            { name: "Articulo", checked: false },
            { name: "Journal", checked: false },
            { name: "Ficha de Autor", checked: false }]
        },
        {
          title: "Quartil",
          options: [
            { name: "Q1", checked: false },
            { name: "Q2", checked: false }]
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
@import "../assets/styles/search-results-page/base-search-rs-page";
</style>
