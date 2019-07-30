<template>
  <div class="index-wrap">
    <div class="frame">
      <div
        :key="`${item}`+index"
        class="inner-frame"
        v-for="(item,index) in mask"
      >
        <div
          :key="`${element}`+index2"
          @click="handleClick(index,index2)"
          @click.right="handleRightClick(index,index2)"
          class="inner-frame2"
          v-for="(element,index2) in item"
        >{{element}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SaoLei extends Vue {
  private data: any[] = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ];
  private mask: any[] = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ];
  private handleSetMine() {
    // const num: number = 5;
    for (let i = 0; i < 5; i++) {
      const row: number = Math.floor(Math.random() * 5);
      const col: number = Math.floor(Math.random() * 5);
      if (this.data[row][col] !== '*') {
        this.data[row][col] = '*';
      } else {
        i--;
      }
      // this.data[row][col] = '*';
    }
    for (let index = 0; index < 5; index++) {
      for (let index2 = 0; index2 < 5; index2++) {
        // 雷的数量
        let mineNum: number = 0;
        for (let i: number = index - 1; i <= index + 1; i++) {
          if (i > 4) {
            break;
          }
          if (i === -1) {
            i = i + 1;
          }
          for (let j: number = index2 - 1; j <= index2 + 1; j++) {
            if (j > 4) {
              break;
            }
            if (j === -1) {
              j = j + 1;
            }
            if (this.data[i][j] === '*') {
              mineNum += 1;
            }
          }
        }
        if (this.data[index][index2] !== '*') {
          this.data[index][index2] = mineNum;
        }
      }
    }

    console.log(JSON.stringify(this.data));
  }
  private handleClick(index: number, index2: number) {
    if (this.data[index][index2] === '*') {
      this.mask = this.data;

      return;
    }
    const mineNum = this.data[index][index2];
    if (mineNum > 0) {
      const maskTemp: any[] = [...this.mask];
      maskTemp[index][index2] = `${mineNum}`;
      this.mask = maskTemp;
    } else {
      const maskTemp: any[] = this.handleZero([...this.mask], index, index2);
      /*
        TODO
        查找0周围的不为0的值，然后赋值给maskTemp
      */

      this.mask = maskTemp;
    }
  }
  private handleZero(arr: any[], index: number, index2: number): any[] {
    let res = [...arr];
    for (let i: number = index - 1; i <= index + 1; i++) {
      if (i > 4) {
        break;
      }
      if (i === -1) {
        i = i + 1;
      }
      for (let j: number = index2 - 1; j <= index2 + 1; j++) {
        if (j > 4) {
          break;
        }
        if (j === -1) {
          j = j + 1;
        }
        if (this.data[i][j] === 0 || this.data[i][j] > 0) {
          res[i][j] = this.data[i][j];
        }
      }
    }

    return res;
  }
  private handleRightClick(index: number, index2: number) {
    // console.log(index, index2);
  }
  private created() {
    this.handleSetMine();
  }
}
</script>
<style lang="less" scoped>
.index-wrap {
  width: 1040px;
  margin: 0 auto;
  margin-top: 40px;
  display: flex;
  .frame {
    width: 505px;
    height: 505px;
    border: 5px solid #444;
    border-radius: 5px;
    .inner-frame {
      width: 500px;
      height: 100px;
      display: flex;
      .inner-frame2 {
        width: 100px;
        height: 100px;
        border: 1px solid #444;
        box-sizing: border-box;
        font-size: 40px;
        line-height: 100px;
      }
    }
  }
}
</style>


