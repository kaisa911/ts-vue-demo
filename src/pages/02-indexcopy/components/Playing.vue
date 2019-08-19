<template>
  <div class="playing-wrap">
    <div class="title">
      <h3>正在热映</h3>
      <div class="vice-title">
        <span
          @click="toAllHotPlaying"
          class="anchor all-playing"
        >全部正在热映»</span>
        <span
          @click="toWillPlaying"
          class="anchor will-playing"
        >即将上映»</span>
      </div>
      <div class="slide-control">
        <span class="num">{{currentIndex}}/{{totalPage}}</span>
        <a
          @click="handleSubstractPages"
          class="btn last-btn"
          href="javascript:void(0)"
        ></a>
        <a
          @click="handleAddPages"
          class="btn next-btn"
          href="javascript:void(0)"
        ></a>
      </div>
    </div>
    <Swiper
      :currentIndex="currentIndex"
      :left="left"
      :slideList="slideList"
      @addToCount="handleAdd"
    ></Swiper>
    <hhh />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Swiper from './Swiper.vue';
import hhh from './hhh.vue';

import { Action, Mutation, State } from 'vuex-class';

@Component({
  components: {
    Swiper,
    hhh,
  },
})
export default class Playing extends Vue {
  private totalPage: number = 0; // 总页数
  private currentIndex: number = 1; // 当前页数
  private timer: any = null; // 计数器
  private slideList: string[] = []; // 内容列表
  private left: boolean = true; // 左滑标识

  @Action private getMovieDate!: () => any;
  @State private inTheater!: string[];

  private handleAdd(n: number) {
    this.totalPage += n;
  }

  // 跳转到全部正在热映
  private toAllHotPlaying(): void {
    window.open('https://movie.douban.com/cinema/nowplaying/', '_blank');
  }
  // 跳转到即将上映
  private toWillPlaying(): void {
    window.open('https://movie.douban.com/later/', '_blank');
  }
  // 页数+1
  private handleAddPages(): void {
    this.stop();
    this.left = true;

    if (this.currentIndex < this.totalPage) {
      this.currentIndex += 1;
      this.go();
      return;
    }
    if (this.currentIndex === this.totalPage) {
      this.currentIndex = 1;
      this.go();
      return;
    }
  }

  // 页数-1
  private handleSubstractPages(): void {
    this.stop();
    this.left = false;

    if (this.currentIndex > 1) {
      this.currentIndex -= 1;
      this.go();
      return;
    }
    if (this.currentIndex === 1) {
      this.currentIndex = this.totalPage;
      this.go();
      return;
    }
  }

  // 重新开始循环
  private go() {
    this.timer = setInterval(() => {
      this.autoPlay();
    }, 15000);
  }

  // 停止
  private stop() {
    clearInterval(this.timer);
    this.timer = null;
  }

  // 自动播放
  private autoPlay(): void {
    this.left = true;
    this.currentIndex++;

    if (this.currentIndex > this.slideList.length - 1) {
      this.currentIndex = 1;
    }
  }
  // 挂载
  private mounted() {
    // 获取数据
    this.getMovieDate().then(() => {
      this.slideList = this.inTheater;
    });

    this.timer = setInterval(() => {
      this.autoPlay();
    }, 15000);
  }
}
</script>

<style lang="less" scoped>
.playing-wrap {
  width: 715px;
  .title {
    display: flex;
    padding-bottom: 10px;
    border-bottom: 1px solid #eaeaea;
    margin-bottom: 18px;
    position: relative;
    h3 {
      color: #111;
      font-weight: 400;
      font-size: 18px;
    }
    .vice-title {
      margin-left: 10px;
      font-size: 13px;
      margin-top: 5px;
      .anchor {
        margin-right: 20px;
        color: #27a;
        text-decoration: none;
        cursor: pointer;
      }
      .anchor:visited {
        text-decoration: none;
      }
      .anchor:hover {
        color: #fff;
        background: #37a;
      }
    }
    .slide-control {
      position: absolute;
      right: 0;
      top: 6px;
      font-size: 12px;
      .num {
        display: block;
        float: left;
        margin-right: 20px;
        margin-top: 3px;
      }
      .last-btn {
        display: block;
        float: left;
        width: 18px;
        height: 18px;
        margin-right: 5px;
        cursor: pointer;
        background: url(https://img3.doubanio.com/f/movie/708be21a7bb2d0f21419dc4e2e2fde8b21ad661a/pics/movie/slide_swithc_2.png)
          no-repeat;
      }
      .next-btn {
        display: block;
        float: left;
        width: 18px;
        height: 18px;
        margin-right: 5px;
        cursor: pointer;
        background: url(https://img3.doubanio.com/f/movie/708be21a7bb2d0f21419dc4e2e2fde8b21ad661a/pics/movie/slide_swithc_2.png)
          no-repeat;
        background-position: -18px 0;
      }
    }
  }
}
</style>

