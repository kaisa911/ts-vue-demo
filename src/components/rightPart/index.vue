<template>
  <div class="right-wrap">
    <QuestionList />
    <Activitiew />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import QuestionList from './8questions.vue';
import Activitiew from './Activities.vue';

@Component({
  components: {
    QuestionList,
    Activitiew,
  },
})
export default class Index extends Vue {}
</script>
<style lang="less" scoped>
</style>


