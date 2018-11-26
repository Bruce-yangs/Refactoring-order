import Vue from 'vue'
import Router from 'vue-router'
import Goods from 'com/goods/goods'
import Ratings from 'com/ratings/ratings'
import Seller from 'com/seller/seller'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Goods',
      name: 'Goods',
      component: Goods
    },{
      path: '/Ratings',
      name: 'Ratings',
      component: Ratings
    },{
      path: '/Seller',
      name: 'Seller',
      component: Seller
    },
  ]
})
