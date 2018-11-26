<template>
  <div>
    <headers class="header">
      <!--I am header-->
    </headers>
    <div class="tab">
      <!--<router-link to="/goods" class="tab-item">商品</router-link>
      <router-link to="/ratings" class="tab-item">评论</router-link>
      <router-link to="/seller" class="tab-item">商家</router-link>-->
      <cube-tab-bar
        v-model="selectedLabelDefault"
        :data="tabs"
        class="tab-item"
        @click="clickHandler"
        :showSlider="true"
        >
      </cube-tab-bar>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  import headers from 'com/header/header'

  export default {
    data() {
      return {
        selectedLabelDefault: '商品',
        tabs: [{
          label: '商品',
        }, {
          label: '评论'
        }, {
          label: '商家'
        }]
      }
    },
    methods: {
      clickHandler(label) {
        switch (label) {
          case '商品':
            this.$router.push('/Goods');
            break;
          case '评论':
            this.$router.push('/Ratings');
            break;
          case '商家':
            this.$router.push('/Seller');
            break;
          default:
            this.$router.push('/Goods');
            break;
        }
        console.log(label)
      }
    },
    components: {
      headers
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    .tab
      display flex
      width 100%
      height 40px
      line-height 40px
      .tab-item
        flex 1
        text-align center
        /*.cube-tab_active
          color: red;
        .cube-tab-bar-slider
          background-color: red;*/


</style>
