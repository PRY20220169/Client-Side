<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      <span>{{ selected }}</span>

    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          $emit('selectedOption', option);
        "
      >
        <span>{{ option }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "custom-select",
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
          ? this.options[0]
          : null,
      open: false,
    };
  },
  mounted() {
    this.$emit("selectedOption", this.selected);
  },
  methods:{

  }
};
</script>

<style scoped lang="scss">
@import "../assets/styles/custom-select/base-custom-select";

</style>