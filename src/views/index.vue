<template>
  <div class="index-wrap">
    <div class="left">
      <Playing />
      <Button />
    </div>
    <div class="right">
      <RightPart />
    </div>
    <div @click="goToMineSweeper">扫雷</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Playing from '../components/Playing.vue';
import RightPart from '../components/rightPart/index.vue';

@Component({
  components: {
    Playing,
    RightPart,
  },
})
export default class Index extends Vue {
  private goToMineSweeper() {
    this.$router.push({
      path: '/saolei',
    });
  }
}
</script>
<style lang="less" scoped>
.index-wrap {
  width: 1040px;
  margin: 0 auto;
  margin-top: 40px;
  display: flex;
  .left {
    width: 715px;
    margin-right: 60px;
  }
  .right {
    @diff : 60px;
    width: calc(~'325px - @{diff}');
  }
}
</style>


