<template>
  <div class="custom-multiple-select" :tabindex="tabindex" @blur="open = false">
    <div class="select-btn" :class="{open:open}" @click="open = !open">
      <span class="btn-text">{{quantity}} criteria added</span>
      <span class="arrow-dwn">
        <i class="bx bx-chevron-down"></i>
      </span>
    </div>

    <ul class="list-items" :class="{ selectHide: !open }">
      <li class="item"
          :class="{checked:option.checked}"
          v-for="(option, i) of options"
          :key="i"
          @click="
          option.checked = !option.checked;
          countCheckedCriteria();
        "
      >
        <span class="checkbox">
          <i class="bx check-icon" :class="{'bx-check': option.checked}"></i>
        </span>
        <span class="item-text">{{ option.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "custom-multiple-select",
  props: {
    options: {
      type: Array,
      required: true,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      open: false,
      quantity: 0,
    }
  },

  methods:{
    countCheckedCriteria(){
      this.quantity = 0;
      this.options.map(e =>{this.quantity = this.quantity + (e.checked? 1: 0)})
    }
  }
};


</script>

<style scoped lang="scss">
@import "../assets/styles/custom-multiple-select/base-custom-multiple-select";
</style>