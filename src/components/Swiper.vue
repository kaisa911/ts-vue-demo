<template>
  <div
    class="carousel-wrap"
    id="carousel"
  >
    <transition-group
      class="slide-ul"
      name="list"
      tag="ul"
    >
      <li
        :key="`${list}+${index}`"
        v-for="(list,index) in slideList"
        v-show="index===(currentIndex-1)"
      >{{list}}</li>
    </transition-group>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';

@Component
export default class Playing extends Vue {
  @Prop({ default: 0 }) private currentIndex!: number;
  @Prop({ default: [''] }) private slideList!: string[];
}
</script>
<style lang="less" scoped>
.carousel-wrap {
  height: 200px;
  width: 100%;
  overflow: hidden;
  background-color: #f2ff;
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
  transform: translateX(0);
}

.list-leave-active {
  transition: all 1s ease;
  transform: translateX(-100%);
}

.list-enter {
  transform: translateX(100%);
}

.list-leave {
  transform: translateX(0);
}
</style>
