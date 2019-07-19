<template>
  <div class="index-wrap">
    <div class="left">
      <Playing />
    </div>
    <div class="right"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Playing from '../components/Playing.vue';

@Component({
  components: {
    Playing,
  },
})
export default class Index extends Vue {}
</script>
<style lang="less" scoped>
.index-wrap {
  width: 1040px;
  margin: 0 auto;
  margin-top: 40px;
}
</style>


