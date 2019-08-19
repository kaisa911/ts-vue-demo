<template>
  <header class="header">
    <div class="logo-search">
      <div class="wrap">
        <div @click="reloadPage" class="logo">豆瓣电影</div>
        <div class="search">
          <input type="text" />
          <div class="submit"></div>
        </div>
      </div>
    </div>
    <div @click="goTochart" class="rank"></div>
    <div class="menu">
      <div :key="`${item}`+index" class="menu-item" v-for="(item,index) in menuList">
        <a :href="item.linkUrl">{{item.menuName}}</a>
      </div>
    </div>
  </header>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
interface ImenuItem {
  menuName: string;
  linkUrl: string;
}
@Component
export default class Header extends Vue {
  private menuList: ImenuItem[] = [
    {
      menuName: '影讯&购票',
      linkUrl: 'https://movie.douban.com/cinema/nowplaying/',
    },
    {
      menuName: '选电影',
      linkUrl: 'https://movie.douban.com/explore',
    },
    { menuName: '电视剧', linkUrl: 'https://movie.douban.com/tv/' },
    { menuName: '排行榜', linkUrl: 'https://movie.douban.com/chart' },
    { menuName: '分类', linkUrl: 'https://movie.douban.com/tag/' },
    { menuName: '影评', linkUrl: 'https://movie.douban.com/review/best/' },
    {
      menuName: '2018年度榜单',
      linkUrl: 'https://movie.douban.com/annual/2018?source=navigation',
    },
    {
      menuName: '2018书影音报告',
      linkUrl: 'https://www.douban.com/standbyme/2018?source=navigation',
    },
  ];

  private goTochart(): void {
    window.open(
      'https://movie.douban.com/annual/2018?source=movie_navigation',
      '_self',
    );
  }

  private reloadPage(): void {
    this.$router.go(0);
  }
}
</script>


<style lang="less" scoped>
.header {
  width: 100%;
  position: relative;
  background-color: #f0f3f5;
  .logo-search {
    border-bottom: 1px solid #e3e3e3;
    .wrap {
      display: flex;
      width: 1040px;
      margin: 0 auto;
      overflow: visible !important;
      position: relative;
      padding: 10px 0 5px;

      zoom: 1;
      .logo {
        color: #27a;
        cursor: pointer;
        text-decoration: none;
        height: 56px;
        width: 145px;
        margin: 0 13px 0 0;
        font: 30px sans-serif;
        font-weight: bolder;
      }
      .search {
        overflow: visible !important;
        position: relative;
        zoom: 1;
        padding: 6px 0 15px 0;
        width: 470px;
        height: 34px;
        text-align: center;
        margin-right: -3px;
        cursor: text;
        display: flex;
        .submit {
          position: relative;
          left: -2px;
          width: 37px;
          height: 34px;
          zoom: 1;
          overflow: hidden;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 10px;
          background: url(http://img3.doubanio.com/dae/accounts/resources/2f48733/movie/assets/nav_mv_bg.png?s=1)
            no-repeat 0 -41px;
        }
        input {
          background: #fff;
          width: 96%;
          margin: 0;
          text-align: left;
          height: 30px;
          padding-left: 10px;
          outline: none;
          border-radius: 5px;
          outline: none;
          border: none;
          box-shadow: 2px 2px 4px #aaa;
        }
      }
    }
  }
  .rank {
    cursor: pointer;
    position: absolute;
    width: 186px;
    height: 96px;
    top: 10px;
    left: 50%;
    z-index: 3;
    margin-left: 200px;
    background: url(//img3.doubanio.com/dae/accounts/resources/2f48733/movie/assets/annual_2018.png)
      center/contain no-repeat;
  }
  .menu {
    width: 100%;
    position: relative;
    background-color: #f0f3f5;
    width: 1040px;
    margin: 0 auto;
    padding-left: 15px;
    overflow: hidden;
    font-size: 14px;
    height: 40px;
    display: flex;
    line-height: 40px;
    .menu-item {
      margin: 0 25px 0 0px;
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

