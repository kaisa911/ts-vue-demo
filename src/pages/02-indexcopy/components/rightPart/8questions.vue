<template>
  <div
    @click="goToQuestion"
    class="wrap"
  >
    <span class="words">豆瓣电影评分八问</span>
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
  .words {
    cursor: pointer;
  }
}
.words:hover {
  color: #fff;
  background: #37a;
}
</style>


