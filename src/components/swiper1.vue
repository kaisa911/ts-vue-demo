<template>
  <div class="carousel-wrap" id="carousel">
    <transition-group class="slide-ul" name="list" tag="ul">
      <li :key="`${list}+${index}`" v-for="(list,index) in slideList" v-show="index===currentIndex">
        <a :href="list.clickUrl">
          <img :alt="list.desc" :src="list.image" />
        </a>
      </li>
    </transition-group>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Playing extends Vue {
  // props: {
  //   currentIndex: {
  //     type: Number,
  //     required: true,
  //   },
  //   slideList: {
  //     type: Array,
  //     required: true,
  //   },
  // },
  // computed: {
  //   handleCurrentIndex() {
  //     return this.$props.currentIndex;
  //   },
  // },
  @Prop({ default: 1 }) currentIndex!: number;
  // @Prop({ default: [''] }) slideList: Array<string>;
}
</script>
<style lang="less" scoped>
.carousel-wrap {
  height: 100vh;
  width: 50%;
  overflow: hidden;
  background-color: #fff;
  z-index: 5;
}

.slide-ul {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0px;
}

.slide-ul li {
  position: absolute;
  width: 100%;
  height: 100%;
}

img {
  width: 100%;
  height: 100%;
}

.carousel-items {
  position: absolute;
  z-index: 10;
  top: 380px;
  width: 100%;
  height: 26px;
  margin: 0 auto;
  text-align: center;
  font-size: 0;
}

.carousel-items span {
  display: inline-block;
  height: 26px;
  width: 30px;
  margin: 0 3px;
  background-color: #b2b2b2;
  cursor: pointer;
}

.carousel-items .active {
  background-color: orange;
}

.list-enter-to {
  transition: all 1s ease;
  transform: translateY(0);
}

.list-leave-active {
  transition: all 1s ease;
  transform: translateY(100%);
}

.list-enter {
  transform: translateY(-100%);
}

.list-leave {
  transform: translateY(0);
}
</style>
