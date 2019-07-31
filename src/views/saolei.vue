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

    <div
      @click="handleRestart"
      class="button"
    >再来一局</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SaoLei extends Vue {
  // 雷区
  private data: any[] = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ];
  // 遮罩
  private mask: any[] = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ];
  // 成功判断条件
  private success: any[] = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ];
  // 埋雷
  private handleSetMine() {
    // 随机生成雷点
    for (let i = 0; i < 5; i++) {
      const row: number = Math.floor(Math.random() * 5);
      const col: number = Math.floor(Math.random() * 5);
      // 如果当前不是雷，就当前值设为雷
      if (this.data[row][col] !== '*') {
        this.data[row][col] = '*';
      } else {
        // 否则 循环+1
        i--;
      }
    }
    // 生成雷点周围的雷数
    for (let index = 0; index < 5; index++) {
      for (let index2 = 0; index2 < 5; index2++) {
        // 周围雷的数量
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
            // 当前位置周围的雷数
            if (this.data[i][j] === '*') {
              mineNum += 1;
            }
          }
        }
        // 如果当前位置不为雷，则把当前位置设置为周围的雷数
        if (this.data[index][index2] !== '*') {
          this.data[index][index2] = mineNum;
          this.success[index][index2] = mineNum;
        }
      }
    }
  }
  // 左键点击事件
  private handleClick(index: number, index2: number) {
    // 点到雷，就爆炸
    if (this.data[index][index2] === '*') {
      this.mask = this.data;
      setTimeout(() => {
        alert('兄弟，你gg啦～～');
      }, 100);
      return;
    }
    const mineNum = this.data[index][index2];
    // 点到不是雷，大于0就展示数字
    if (mineNum > 0) {
      const maskTemp: any[] = [...this.mask];
      maskTemp[index][index2] = mineNum;
      this.mask = maskTemp;
    } else {
      // 是0 就处理一下周围的值
      const maskTemp: any[] = this.handleZero(this.mask, index, index2);

      this.mask = maskTemp;
    }

    // 点击结束后判断是否胜利
    if (this.handleSuccess(this.mask)) {
      setTimeout(() => {
        alert('你胜利啦');
      }, 100);
    }
  }
  // 点击位置为0的时候的处理
  private handleZero(arr: any[], index: number, index2: number) {
    let res: any[] = [...arr];
    // 对当前位置周围8个值进行判断
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
        // 如果雷区当前位置的值大于0，将值赋值到res上
        if (this.data[i][j] > 0) {
          res[i][j] = this.data[i][j];
        } else if (this.data[i][j] === 0) {
          // 如果等于0，判断是否为当前位置
          if (i !== index || j !== index2) {
            // 判断是否为已知的值
            if (res[i][j] !== 0) {
              // 不是已知的值，就递归调用
              res = this.handleZero(res, i, j);
            }
          } else {
            res[i][j] = this.data[i][j];
          }
        }
      }
    }
    return res;
  }
  // 右键点击事件处理
  private handleRightClick(index: number, index2: number) {
    const maskTemp: any[] = [...this.mask];
    // 如果是小红旗，再次右键点击显示问号
    if (maskTemp[index][index2] === '🚩') {
      maskTemp[index][index2] = '？';
    } else if (maskTemp[index][index2] === '？') {
      // 如果是问号，再次点击显示空白
      maskTemp[index][index2] = '';
    } else {
      // 如果是空白，显示小红旗
      maskTemp[index][index2] = '🚩';
    }
    this.mask = maskTemp;
  }

  // 判断成功的辅助函数
  private handleSuccess(arr: any[]) {
    const temp = JSON.parse(JSON.stringify(arr));
    // 把数组里的小红旗和问号都变成空字符串‘’
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[0].length; j++) {
        if (arr[i][j] === '🚩' || arr[i][j] === '？') {
          temp[i][j] = '';
        }
      }
    }
    // 比较标识符和当前数组是否为一致，一致则成功
    if (JSON.stringify(temp) === JSON.stringify(this.success)) {
      return true;
    }
    return false;
  }
  // 再来一局
  private handleRestart() {
    this.mask = [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ];
    this.data = [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ];
    this.success = [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ];
    this.handleSetMine();
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
  .button {
    width: 100px;
    height: 40px;
    border-radius: 5px;
    color: #fff;
    background: lightblue;
    line-height: 40px;
    text-align: center;
    margin-top: 20px;
    cursor: pointer;
  }
}
</style>


