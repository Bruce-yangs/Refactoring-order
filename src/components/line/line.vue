<template>
  <div class="title">
    <div class="line"></div>
    <div class="text" v-text="text"></div>
    <div class="line"></div>
  </div>
</template>
<script type="text/ecmascript-6" >
  export default {
    props: {
      text: {//文案
        type: String
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .title
    display flex
    width 80%
    margin 28px auto 24px auto
    .line
      flex 1
      position relative
      top -6px
      border-bottom 1px solid rgba(255,255,255,.2)
    .text
      font-size 14px
      font-weight 700
      padding 0 12px
</style>
