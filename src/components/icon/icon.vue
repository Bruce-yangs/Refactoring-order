<template>
  <span class="icon" :class="classMap[size][currentType]"></span>
</template>

<script>
  export default {
    props: {
      currentType: {
        type: Number
      },
      size: {
        type: Number
      }
    },
    data() {
      return {
        classMap: [
          ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
          ['decrease-two', 'discount-two', 'special-two', 'invoice-two', 'guarantee-two'],
          ['decrease-three', 'discount-three', 'special-three', 'invoice-three', 'guarantee-three']
        ]
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import 'common/stylus/mixin';
  .icon
    display inline-block
    width 16px
    height 16px
    margin-right 2px
    background-size 16px 16px
    background-repeat no-repeat
    vertical-align top
    &.decrease
      bg-image('decrease_1')
    &.discount
      bg-image('discount_1')
    &.guarantee
      bg-image('guarantee_1')
    &.invoice
      bg-image('invoice_1')
    &.special
      bg-image('special_1')
    &.decrease-two
      bg-image('decrease_2')
    &.discount-two
      bg-image('discount_2')
    &.guarantee-two
      bg-image('guarantee_2')
    &.invoice-two
      bg-image('invoice_2')
    &.special-two
      bg-image('special_2')

    &.decrease-three
      bg-image('decrease_3')
    &.discount-three
      bg-image('discount_3')
    &.guarantee-three
      bg-image('guarantee_3')
    &.invoice-three
      bg-image('invoice_3')
    &.special-three
      bg-image('special_3')
</style>
