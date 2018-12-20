<template>
  <div  id="app">
    <div v-if="!showLoading"><!---->
      <headers class="header" :seller="seller"></headers>
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
        <router-view :seller="seller"/>
      </keep-alive>
    </div>
    <div v-if="showLoading">
      <ContentLoader
        :height="735"
        :width="400"
        :speed="1"
      >
        <rect x="118" y="31.15" rx="3" ry="3" width="141.1" height="10.624" />
        <rect x="117" y="48.85" rx="3" ry="3" width="144.5" height="10.88" />
        <rect x="7.5" y="9.27" rx="0" ry="0" width="73.81" height="58.75999999999999" />
        <rect x="7.5" y="74.27" rx="0" ry="0" width="370.65000000000003" height="23" />
        <rect x="6.5" y="113.27" rx="0" ry="0" width="79.65" height="508" />
        <rect x="113.5" y="116.27" rx="0" ry="0" width="262" height="23" />
        <rect x="115.5" y="151.27" rx="0" ry="0" width="69" height="65.2" />
        <rect x="199.5" y="155.46" rx="0" ry="0" width="159" height="16.8" />
        <rect x="200.5" y="178.48" rx="0" ry="0" width="158" height="16.8" />
        <rect x="200.5" y="202.71" rx="0" ry="0" width="159.12" height="14.55" />
        <rect x="115.5" y="231.27" rx="0" ry="0" width="69" height="65.2" />
        <rect x="200.5" y="233.46" rx="0" ry="0" width="159" height="16.8" />
        <rect x="199.5" y="256.46" rx="0" ry="0" width="159" height="16.8" />
        <rect x="199.5" y="276.46" rx="0" ry="0" width="160.59" height="16.8" />
        <rect x="115.5" y="309.27" rx="0" ry="0" width="69" height="65.2" />
        <rect x="198.5" y="312.46" rx="0" ry="0" width="159" height="16.8" />
        <rect x="199.5" y="334.46" rx="0" ry="0" width="159" height="16.8" />
        <rect x="199.5" y="357.46" rx="0" ry="0" width="159" height="16.8" />
        <rect x="115.5" y="389.27" rx="0" ry="0" width="69" height="65.2" />
        <rect x="197.5" y="392.46" rx="0" ry="0" width="160.59" height="16.8" />
        <rect x="197.5" y="413.46" rx="0" ry="0" width="162.18" height="16.8" />
        <rect x="197.5" y="435.46" rx="0" ry="0" width="162.18" height="16.8" />
        <rect x="116.5" y="471.27" rx="0" ry="0" width="69" height="65.2" />
        <rect x="197.5" y="473.46" rx="0" ry="0" width="159" height="16.8" />
        <rect x="196.5" y="496.46" rx="0" ry="0" width="159" height="16.8" />
        <rect x="196.5" y="517.46" rx="0" ry="0" width="159" height="16.8" />
        <rect x="116.5" y="547.27" rx="0" ry="0" width="69" height="65.2" />
        <rect x="196.5" y="546.46" rx="0" ry="0" width="159" height="16.8" />
        <rect x="195.5" y="572.46" rx="0" ry="0" width="160.59" height="16.8" />
        <rect x="196.5" y="595.46" rx="0" ry="0" width="160.59" height="16.8" />
        <rect x="118" y="11.15" rx="3" ry="3" width="141.1" height="10.624" />
      </ContentLoader>
    </div>

  </div>
</template>

<script>
  import {  ContentLoader,
    FacebookLoader,
    CodeLoader,
    BulletListLoader,
    InstagramLoader,
    ListLoader } from 'vue-content-loader'
  import headers from 'com/header/header'
  const ERR_OK = 0;
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
        }],
        seller: {},
        showLoading: true
      }
    },
    created() {
      this.$axios.get("/seller").then(res => {
        if (res.data.errno === ERR_OK) {
          this.seller = res.data.data;
          this.showLoading = false;
        }
      })
    },
    methods: {
      clickHandler(label) {
        switch (label) {
          case '商品':
            this.$router.push('/');
            break;
          case '评论':
            this.$router.push('/Ratings');
            break;
          case '商家':
            this.$router.push('/Seller');
            break;
          default:
            this.$router.push('/');
            break;
        }
      }
    },
    components: {
      headers,ContentLoader,
      FacebookLoader,
      CodeLoader,
      BulletListLoader,
      InstagramLoader,
      ListLoader
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
      border-bottom 1px solid rgba(7,17,27,.1)
      .tab-item
        flex 1
        text-align center
        /*.cube-tab_active
          color: red;
        .cube-tab-bar-slider
          background-color: red;*/


</style>
