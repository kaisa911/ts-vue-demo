<template>
  <div class="footer">
    <div class="wrap">
      <div class="auth">© 2005－2019 douban.com, all rights reserved 北京豆网科技有限公司</div>
      <div class="nav">
        <div :key="`${item}`+index" class="nav-item" v-for="(item,index) in navList">
          <a :href="item.linkUrl">{{item.navName}}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
interface InavItem {
  navName: string;
  linkUrl: string;
}
@Component
export default class Footer extends Vue {
  private navList: InavItem[] = [
    {
      navName: '关于豆瓣',
      linkUrl: 'https://movie.douban.com/cinema/nowplaying/',
    },
    {
      navName: '在豆瓣工作',
      linkUrl: 'https://movie.douban.com/explore',
    },
    { navName: '联系我们', linkUrl: 'https://movie.douban.com/tv/' },
    { navName: '法律声明', linkUrl: 'https://movie.douban.com/chart' },
    { navName: '帮助中心', linkUrl: 'https://movie.douban.com/tag/' },
    { navName: '移动应用', linkUrl: 'https://movie.douban.com/review/best/' },
    {
      navName: '豆瓣广告',
      linkUrl: 'https://movie.douban.com/annual/2018?source=navigation',
    },
    {
      navName: '2018书影音报告',
      linkUrl: 'https://www.douban.com/standbyme/2018?source=navigation',
    },
  ];
}
</script>

<style lang="less" scoped>
.footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  color: #999;

  margin-top: 40px;
  overflow: hidden;
  zoom: 1;
  .wrap {
    width: 1040px;
    margin: 0 auto;
    clear: both;
    line-height: 30px;
    border-top: 1px dashed #ddd;
  }
  .auth {
    font-size: 12px;
    float: left;
  }
  .nav {
    float: right;
    overflow: hidden;
    font-size: 12px;
    .nav-item {
      display: inline-block;
      margin: 0 5px 0 0px;
      a {
        color: #27a;
        text-decoration: none;
      }
      a:visited {
        text-decoration: none;
      }
      a:hover {
        color: #fff;
        background: #37a;
      }
    }
  }
}
</style>
