import Vue from 'vue'
import Router from 'vue-router'
import User from 'component/user/user'
import Recommend from 'component/recommend/recommend'
import Singer from 'component/singer/singer'
import Rankings from 'component/rankings/rankings'
import Search from 'component/search/search'
import singerDetail from 'component/singer-detail/singer-detail'
import disc from 'component/disc/disc'
import topList from 'component/topList/topList'

Vue.use(Router)
const myRouter = new Router({
  routes: [
    {
      path: '',
      redirect: '/recommend',
      meta: {
        title: '推荐'
      }
      },
    {
      path: '/',
      name: 'Recommend',
      component: Recommend,
      meta: {
        title: '推荐'
      }
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend,
      meta: {
        title: '推荐'
      },
      children:[
        {
          path: ':id',
          component: disc,
          meta: {
            title: '歌单'
          }
        }
      ]
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer,
      meta: {
        title: '歌手'
      },
      children:[
        {
          path: ':id',
          component: singerDetail,
          meta: {
            title: '歌手详情'
          }
        }
      ]
    },
    {
      path: '/rankings',
      name: 'Rankings',
      component: Rankings,
      meta: {
        title: '排行'
      },
      children:[
        {
          path:':id',
          component:topList,
          meta:{
            title:'排行列表'
          }
        }
      ]
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {
        title: '搜索'
      },
      children:[
        {
          path:':id',
          component:singerDetail,
          meta:{
            title:'歌手列表'
          }
        },
      ]
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      meta: {
        title: '用户中心'
      }
    }
  ]
})
//全局前置守卫
myRouter.beforeEach((to,from,next)=>{
if(to.meta.title){
  document.title = to.meta.title;
  next();
}
})
export default myRouter
