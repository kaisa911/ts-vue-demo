<template>
  <div class="wrap">
    <div class="title">电影活动 · · · · · ·</div>
    <div @click="goToQuestion">
      <span class="words">FIRST影展•工坊邀请函，请查收！</span>
    </div>
    <div @click="goToQuestion">
      <span class="words">豆瓣影人PRO大师课，从这里成为电影人</span>
    </div>
    <div @click="goToQuestion">
      <span class="words">谁才是地表最强电影续集？</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Index extends Vue {
  private goToQuestion() {
    window.location.href = 'https://blog.douban.com/douban/2015/12/18/3060/';
  }
}
</script>
<style lang="less" scoped>
.wrap {
  margin: 0 0 20px;
  padding: 12px 0 12px 18px;
  line-height: 1.5;
  background: #f2f7f6;
  border-radius: 4px;
  width: 282px;
  text-align: left;
  font-size: 13px;
  color: #37a;
  display: flex;
  flex-direction: column;
  .title {
    margin: 0 0 10px 0px;
    font-size: 16px;
    color: #072;
  }
  .words {
    cursor: pointer;
    display: inline-block;
    margin-bottom: 5px;
  }
}
.words:hover {
  color: #fff;
  background: #37a;
}
</style>


