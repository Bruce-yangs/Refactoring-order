<template>
  <div class="goods">
    <div ref="menuWrapper" class="menu-wrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item"
            @click="selectMenu(index,$event)"
            ref="menuList"
            :class="{'current':currentIndex == index}">
          <span class="text border-1px">
            <icons v-if="item.type > 0" :currentType="item.type" :size="2"></icons>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div ref="foodsWrapper" class="foods-wrapper">
      <ul>
        <li class="food-list" ref="foodList" v-for="item in goods">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food,$event)" class="food-item border-1px" v-for="food in item.foods">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.desc}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :foods="food"  @add="addFood"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <div class="list-fixed" v-show="fixedTitle" ref="fixed">
        <h1 class="fixed-title">{{fixedTitle}}</h1>
      </div>
    </div>
    <shopcart ref="shopcart" :delivery-price="seller.deliveryPrice"
              :selectFoods="selectFoods" :min-price="seller.minPrice"></shopcart>
    <food  :food="selectedFood" ref="food"></food><!--@add="addFood"-->

  </div>
</template>

<script>
  import icons from 'com/icon/icon'
  import shopcart from 'com/shopcart/shopcart'
  import cartcontrol from 'com/cartcontrol/cartcontrol'
  import food from 'com/food/food'

  import BScroll from 'better-scroll'

  const ERR_OK = 0;
  const TITLE_HEIGHT = 30;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        menuScroll: null,
        foodsScroll: null,
        listHeight: [],
        scrollY: 0,
        checkTop: true,
        scrollEvents: ['scroll'],
        fixedTitle: '',
        diff: -1,
        fixedTop: 0,
        selectedFood: {}

      }
    },
    computed: {
      currentIndex() {//获取当前下标
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            this._followScroll(i);//左侧菜单跟随 右边联动
            this.scrollY == 0 || this.scrollY < 5
              ? this.fixedTitle = '' : this.fixedTitle = this.goods[i].name;
            this.diff = height2 + -this.scrollY;
            console.log(this.scrollY)
            return i;
          }
        }
        return 0;
      },
      selectFoods() {//此处是传给购物车相关 数据（如：数量，价钱）
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    watch: {
      diff(val) {
        let fixedTop = (val > 0 && val < TITLE_HEIGHT) ? val - TITLE_HEIGHT : 0;
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop;
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    },
    created() {
      this.getGoodsList();
    },
    methods: {
      scrollHandler({y}) {
        this.scrollY = -y
        console.log(this.scrollY)
      },
      showToast() {
        this.$createToast({
          txt: this.toastTxt
        }).show()
      },
      getGoodsList() {
        this.$axios.get("/goods").then(res => {
          if (res.data.errno === ERR_OK) {
            this.goods = res.data.data;
            this.$nextTick(() => {
              this._initScroll();
              this._calculateHeight();
            })
          }
        })
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });
        /*监听 右侧滚动的值*/
        this.foodsScroll.on('scroll', (pos) => {
          if (pos.y <= 0) {
            this.scrollY = Math.abs(Math.round(pos.y));//Math.abs 取正值  Math.round 四舍五入
          }
        });
      },
      /*计算右侧 高度*/
      _calculateHeight() {
        let foodList = this.$refs.foodList;//获取li元素
        let height = 0;//此处是第一个li 的区间高度
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];//获得每一个li
          height += item.clientHeight;//获得每一个li 所在当前位置的高度 ->这个高度是叠加起来的
          this.listHeight.push(height);
        }
      },
      /*点击左侧高亮，对应右侧*/
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        //获取到当前元素信息
        let foodList = this.$refs.foodList;
        let el = foodList[index];//通过下标找到  el 滚动到的目标元素
        this.foodsScroll.scrollToElement(el, 50);//scrollToElement -> 滚动到指定的目标元素
      },
      //左侧菜单栏 跟随滚动
      _followScroll(index) {
        let menuList = this.$refs.menuList;
        let el = menuList[index];
        this.menuScroll.scrollToElement(el, 300, 0, -100);
      },
      addFood(target) {
        this._drop(target);
      },
      _drop(target) {
        // 体验优化,异步执行下落动画  因为子组件shopcart里的动画 和 点击添加按钮动画 一起 出现会卡  所以此处 进行异步优化
        this.$nextTick(() => {
//           console.log(target);
          //此处的shopcart 是shopcart ref绑定的变量 接口
          this.$refs.shopcart.drop(target);
        });
      },
      selectFood(food, event) {//点击具体某个商品
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        // <!--ref 是子组件的方法 父组件通过ref调用 this.$refs.food.show()-->
        this.$refs.food.show();
      }
    },
    components: {
      icons,shopcart,cartcontrol,food
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import 'common/stylus/mixin';

  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        /*垂直居中*/
        display table
        height 54px
        width 56px
        padding 0 12px
        line-height 14px
        &.current
          position relative
          margin-top -1px
          z-index 10px
          background #fff
          font-weight bolder
          .text
            border-none()
        .text
          display table-cell
          width 56px
          vertical-align middle
          border-1px(rgba(7, 17, 27, .1))
          font-size 12px

    .foods-wrapper
      position relative
      flex 1
      .food-list .title, .fixed-title
        height 26px
        line-height 26px
        padding-left 14px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147, 153, 159)
        background #f3f5f7
      /*.title
        margin-top 6px*/
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, .1))
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            height 14px
            line-height 14px
            margin 2px 0 8px 0
            color rgb(7, 17, 27)
            font-size 14px
          .desc, .extra
            line-height 10px
            font-size 10px
            color rgb(147, 153, 159)
          .desc
            margin-bottom 8px
            line-height 12px

          .extra
            .count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px

            .now
              margin-right 8px
              font-size 14px
              color rgb(240, 20, 20)
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147, 153, 159)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 0
    .list-fixed
      position absolute
      top 0
      left 0
      width 100%

  /* .cube-scroll-nav-panel-title
     height 26px
     line-height 26px
     padding-left 14px
     border-left 2px solid #d9dde1
     font-size 12px
     color rgb(147,153,159)
     background #f3f5f7*/
</style>
