<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name" v-text="seller.name"></span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <icons :currentType="seller.supports[0].type" :size="0" class="icon-img"></icons>
          <span class="text" v-text="seller.supports[0].description"></span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="isShowDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="isShowDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text" v-text="seller.bulletin"></span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <!--经典布局-->
    <transition  name="fade">
      <div class="detail" v-show="detailShow" transition="fade">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name" v-text="seller.name"></h1>
            <div class="star-wrapper">
              <star :score="seller.score" :size="48"></star>
            </div>
            <lines :text="saleTitle"></lines>
            <ul v-if="seller.supports" class="supports">
              <li v-for="(item,index) in seller.supports" class="support-item">
                 <icons :currentType="seller.supports[index].type" :size="1" class="icon-show"></icons>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <lines :text="trafficker"></lines>
            <div class="bulletin">
              <div class="content" v-text="seller.bulletin"></div>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="isShowDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import star from 'com/star/star'
  import lines from 'com/line/line'
  import icons from 'com/icon/icon'
  export default {
    props: {
      seller: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        toastTxt: 'cube toast content',
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        detailShow: false,
        saleTitle: '优惠信息',
        trafficker: '商家公告',
      }
    },
    created() {

    },
    methods: {
      isShowDetail() {
        /*this.$createToast({
          txt: this.toastTxt
        }).show()*/
        this.detailShow = !this.detailShow;
      },
      ajax() {
        this.$axios.get("/goods").then(res => {
          console.log(res.data)
        })
      }
    },
    components: {
      star,lines,icons
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" >
  @import 'common/stylus/mixin';
  .header
    position relative
    color: #fff
    background rgba(7, 17, 21, .5)
    overflow hidden
    .content-wrapper
      position relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        display inline-block
        vertical-align top
        img
          border-radius 2px
      .content
        display inline-block
        margin-left 14px
        .title
          margin 2px 0 8px 0
          .brand
            display inline-block
            vertical-align top
            width 38px
            height 18px
            bg-image('brand')
            background-size 30px 18px
            background-repeat no-repeat
          .name
            margin-left 6px
            font-size 16px
            line-height 18px
            font-weight bold
        .description
          margin-bottom 10px
          line-height 12px
          font-size 12px
        .support
          .icon-img
            width 12px
            height 12px
            margin-right 4px
            background-size: 12px 12px
          .text
            font-size 10px
            line-height 12px
            font-weight 200
            color rgb(255, 255, 255)

      .support-count
        position absolute
        right 12px
        bottom 14px
        height 24px
        padding 0 8px
        line-height 24px
        border-radius 14px
        background rgba(0, 0, 0, .2)
        text-align center
        .count
          vertical-align top
          font-size 10px
        .icon-keyboard_arrow_right
          margin-left 2px
          line-height 24px
          font-size 10px

    .bulletin-wrapper
      position relative
      height 28px
      line-height 28px
      padding 0 22px 0 12px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      background rgba(7, 17, 27, .2)
      .bulletin-title
        vertical-align top
        display inline-block
        margin-top 8px
        width 22px
        height 12px
        bg-image('bulletin')
        background-size 22px 12px
        background-repeat no-repeat
      .bulletin-text
        vertical-align top
        margin 0 4px
        font-size 10px
      .icon-keyboard_arrow_right
        position absolute
        right 12px
        top 8px
        font-size 10px
    .background
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      z-index -1
      filter blur(10px)
    .detail
      position fixed
      top 0
      left 0
      z-index 100
      width 100%
      height 100%
      overflow auto
      background rgba(7, 17, 21, .8)
      backdrop-filter blur(10px)
      opacity 1
      &.fade-enter-active, &.fade-leave-active
        transition: all .5s
      &.fade-enter, &.fade-leave-active
        opacity: 0
        background: rgba(7, 17, 27, 0)
      .detail-wrapper
        min-height 100%
        width 100%
        .detail-main
          margin-top 64px
          padding-bottom 64px
          .name
            line-height 16px
            text-align center
            font-size 16px
            font-weight 700
          .star-wrapper
            margin-top 18px
            padding 2px 0
            text-align center
          .supports
            width 80%
            margin 0 auto
            .support-item
              padding 0 12px
              margin-bottom 12px
              font-size 0
              &:last-child
                margin-bottom 0
              .icon-show
                margin-right 6px
              .text
                line-height 16px
                font-size 12px
          .bulletin
            width: 80%
            margin: 0 auto
            .content
              padding: 0 12px
              line-height: 24px
              font-size: 12px
      /*padding 必填*/
      .detail-close
        position relative
        width 32px
        height 32px
        margin -64px auto 0 auto
        /*必填*/
        clear both
        font-size 32px
</style>
