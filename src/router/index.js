import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout.vue'
import hostLayout from '../views/layout/hostLayout.vue'
import audienceLayout from '../views/layout/audienceLayout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    role: ['admin','editor']     will control the page role (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/register', component: _import('login/register'), hidden: true },
  { path: '/quickLogin', component: _import('login/quickLogin'), hidden: true },
  { path: '/mobile', component: _import('bindMobile/index'), hidden: true },
  { path: '/default', component: _import('default/index'), hidden: true },
  // { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'general',
    children: [{
      path: 'general',
      component: _import('general/index'),
      name: '',
      meta: { title: '今日概况', icon: 'general', noCache: true }
    }]
  },
  {
    path: '/hostStream',
    component: Layout,
    redirect: 'noredirect',
    name: 'hostStream',
    meta: {
      title: '主播数据',
      icon: 'data'
    },
    children: [
      { path: 'trend',  component: _import('hostStream/trend/index'), name: 'informationTrend', meta: { title: '数据趋势' }},
      { path: 'rank',  component: _import('hostStream/rank/index'), name: 'hostStreamRank', meta: { title: '主播排行' }},
      { path: 'compare',  component: _import('hostStream/rank/compare'), name: 'hostStreamComparison', meta: { title: '主播对比' },hidden: true},
    ]
  },
  {
    path: '/analysis',
    component: hostLayout,
    hidden: true,
    redirect: 'noredirect',
    name: 'analysis',
    meta: {
      title: '主播分析',
    },
    children: [
      { path: 'profit/:origin/:platform/:roomId', component: _import('hostStream/details/profitAnalysis'), meta: {name:'profit', title: '收益分析' }},
      { path: 'activeBarrage/:origin/:platform/:roomId', component: _import('hostStream/details/activeBarrageAnalysis'), meta: {name:'activeBarrage', title: '活跃弹幕分析' }},
      { path: 'activePerson/:origin/:platform/:roomId', component: _import('hostStream/details/activePersonAnalysis'), meta: { name:'activePerson',title: '活跃人气分析' }},
      { path: 'audience/:origin/:platform/:roomId', component: _import('hostStream/details/audience/audienceAnalysis'), meta: { name:'audience',title: '观众分析' } },
      { path: 'figure/:origin/:platform/:roomId', component: _import('hostStream/details/audience/analysisFigure'), meta: { name:'figure',title: '观众画像' }},
      { path: 'subsistence/:origin/:platform/:roomId', component: _import('hostStream/details/audience/subsistence'), meta: {name:'subsistence', title: '打赏留存' }},
      { path: 'rank/:origin/:platform/:roomId', component: _import('hostStream/details/audience/rewardRank'), meta: {name:'rank', title: '打赏榜单' }},
      { path: 'record/:origin/:platform/:roomId', component: _import('hostStream/details/record'), meta: { name:'record',title: '直播记录' } }
    ]
  },
  {
    path: '/audience',
    component: audienceLayout,
    hidden: true,
    redirect: 'noredirect',
    name: 'audience',
    meta: {
      title: '观众分析',
    },
    children: [
      { path: 'active/:platform/:roomId/:uid/:type/:origin', component: _import('hostStream/details/audience/audienceActive'), meta: {name:'active', title: '观众活跃' }},
      { path: 'preference/:platform/:roomId/:uid/:type/:origin', component: _import('hostStream/details/audience/audiencePreference'), meta: {name:'preference', title: '观众偏好' }},
      { path: 'spoor/:platform/:roomId/:uid/:type/:origin', component: _import('hostStream/details/audience/audienceSpoor'), meta: {name:'spoor', title: '观众足迹' } },
    ]
  },
  {
    path: '/richer',
    component: Layout,
    redirect: 'noredirect',
    name: 'richer',
    // hideChildren: true,
    meta: {
      title: '土豪数据',
      icon: 'richer'
    },
    children: [
      { path: 'richerInfo',  component: _import('richer/richerInfo'), name: 'richerInformation', meta: { title: '土豪概况' }},
      { path: 'richerRank',  component: _import('richer/richerRank'), name: 'richerRank', meta: { title: '土豪榜单' }}
    ]
  },
  {
    path: '/guildDevelopment',
    component: Layout,
    redirect: 'noredirect',
    name: 'guildDevelopment',
    meta: {
      title: '公会发展',
      icon: 'guildDev'
    },
    children: [
      { path: 'index',  component: _import('guildDevelopment/index'), name: 'quickFindHostStream', meta: { title: '挖主播' }},
      { path: 'potential',  component: _import('guildDevelopment/potential'), name: 'potentialNewHostStream', meta: { title: '潜力新主播' }},
      { path: 'recommend',  component: _import('guildDevelopment/recommend'), name: 'recommendExcellentHostStream', meta: { title: '推荐优质主播' }},
    ]
  },
  {
    path: '/guildManagement',
    component: Layout,
    redirect: 'noredirect',
    name: 'guildManagement',
    meta: {
      title: '公会管理',
      icon: 'guildManage'
    },
    children: [
      { path: 'guide',  component: _import('guildManagement/guideInformation/index'), name: 'guildCertification', meta: { title: '公会信息' }},
      { path: 'hostStream',  component: _import('guildManagement/hostStreamManagement/index'), name: 'hostStreamManagement', meta: { title: '主播管理' }},
      { path: 'addHost', component: _import('guildManagement/addHostStream/index'), name:'addHostStream', meta: { title: '添加主播' }, hidden: true },
      { path: 'addHost/:id', component: _import('guildManagement/addHostStream/index'), name:'addHostStreamByGroupId', meta: { title: '添加主播' }, hidden: true },
      { path: 'employee',  component: _import('guildManagement/employeeManagement/index'), name: 'employeeManagement', meta: { title: '员工管理' }},
      // { path: 'record',  component: _import('guildManagement/operationRecord/index'), name: 'operationRecord', meta: { title: '操作日志' }}
    ]
  },
  {
    path: '/center',
    component: Layout,
    redirect: 'center',
    name: 'personalCenter',
    meta: {
      title: '个人中心',
      icon: 'center'
    },
    children: [
      { path: '',  component: _import('center/index'), name: 'personalCenterChild', meta: {  title: '个人中心', icon: 'center', noCache: true}}
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [];
