<template>
  <div
    class="carousel-wrap"
    id="carousel"
  >
    <transition-group
      :name="left?'list':'list1'"
      class="slide-ul"
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
import { Component, Vue, Watch, Prop, Emit } from 'vue-property-decorator';

@Component
export default class Playing extends Vue {
  @Prop({ default: 0 }) private currentIndex!: number;
  @Prop({ default: [''] }) private slideList!: string[];
  @Prop() private left!: boolean;
  private count: number = 0;

  @Emit()
  private addToCount(n: number) {
    this.count += n;
  }
}
</script>
<style lang="less" scoped>
.carousel-wrap {
  height: 200px;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
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
  transition: all 3s ease;
  transform: translateX(0);
}

.list-leave-active {
  transition: all 3s ease;
  transform: translateX(-100%);
}

.list-enter {
  transform: translateX(100%);
}

.list-leave {
  transform: translateX(0);
}
.list1-enter-to {
  transition: all 3s ease;
  transform: translateX(0);
}

.list1-leave-active {
  transition: all 3s ease;
  transform: translateX(100%);
}

.list1-enter {
  transform: translateX(-100%);
}

.list1-leave {
  transform: translateX(0);
}
</style>
