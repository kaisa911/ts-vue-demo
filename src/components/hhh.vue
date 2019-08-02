<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Title extends Vue {
  private render() {
    return <div class="title2">我是一个title</div>;
  }
}
</script>
<style lang="less" scoped>
.title2 {
  color: blueviolet;
  text-align: center;
  background: #f3f3f3;
}
</style>
