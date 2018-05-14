import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '@/utils/auth' // 验权
import { Message } from 'element-ui'
import api_zbb from './api/zhibobao'

// permissiom judge
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true; // admin权限 直接通过
  if (!permissionRoles) return true;
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/authredirect','/mobile','/register','/quickLogin','/404']// 不重定向白名单
function isAutherized(next,to,unionId) {
  if(to.path === '/guildManagement/guide' || whiteList.includes(to.path)){
    next();
  }else{
    if(!unionId){
      next('/guildManagement/guide');
    }else{
      next();
    }
  }
}


router.beforeEach((to, from, next) => {
  NProgress.start(); // 开启Progress
  if (getToken()) { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }else {
      if (!store.getters.userInfo.roleType) { // 判断当前用户是否已拉取完user_info信息
        let response = null;
        const getInformation = async () => {
          response =await api_zbb.service.ZhibobaoPersonalAccount.Account.getInfo();
          if( response === false ){
            store.dispatch('FedLogOut').then(() => {
              Message.error('信息获取失败,请重新登录');
              next('/login');
              NProgress.done();
            });
            return false;
          }
          store.dispatch('set_userInfo', response.data.data.info);
          store.dispatch('GenerateRoutes');
          isAutherized(next,to,response.data.data.info.unionId,response.data.data.info.autherized);
        };
        getAudienceInfo(to);
        getAnchorInfo(to);
        getInformation();
      }else{
        getAnchorInfo(to);
        getAudienceInfo(to);
        store.dispatch('GenerateRoutes');
        isAutherized(next,to,store.getters.userInfo.unionId,store.getters.userInfo.autherized);
        NProgress.done();
      }
    }

  } else {
    // 无token判断
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      if(to.path === '/mobile'){
        next()
      }else{
        next('/login');
        NProgress.done()
      }
    }


  }
});

router.afterEach(() => {
  NProgress.done() // 结束Progress
});


const getAnchorInfo = async (to) => {
  if(!to.params.platform ||
    !to.params.roomId ||
    to.params.uid ||
    (to.params.platform === store.getters.anchorInfo.platform && to.params.roomId === store.getters.anchorInfo.rid && to.params.origin === store.getters.anchorInfo.origin) )return;
  const data = {
    platform:Number(to.params.platform),
    rid:to.params.roomId,
    origin:to.params.origin
  };
  let response =await api_zbb.service.ZhibobaoGuildData.Anchor.getPersonalDetail(data);
  if( response === false ) return false;
  response.data.nowThirty = response.data.nowThirty && response.data.nowThirty.days ? response.data.nowThirty: {
    price:0,//收益
    timeLong:0,// 日均时长
    online:0,// 日均在线
    barPeoNum:0,// 日均弹幕人数
    rewardPerson:0,// 日均打赏人数
    addFollower:0,// 日均新增关注数
    days:0,// 直播天数
    effectiveDays:0,// 有效直播天数
    rank:0,// 工会排行
    average_price:0,//日均收益
  };
  response.data.passThirty = response.data.passThirty && response.data.passThirty.days ? response.data.passThirty: {
    price:0,//收益
    timeLong:0,// 日均时长
    online:0,// 日均在线
    barPeoNum:0,// 日均弹幕人数
    rewardPerson:0,// 日均打赏人数
    addFollower:0,// 日均新增关注数
    days:0,// 直播天数
    effectiveDays:0,// 有效直播天数
    rank:0,// 工会排行
    average_price:0,//日均收益
  };

  response.data.compare = response.data.nowThirty.price > response.data.passThirty.price ? 1:response.data.nowThirty.price < response.data.passThirty.price ? -1 :0;

  response.data.changeValue = response.data.nowThirty.price -  response.data.passThirty.price;
  if( response.data.passThirty.price ){
    response.data.percent = (response.data.changeValue / response.data.passThirty.price).toFixed(4)*100
  }else if( response.data.nowThirty.price ){
    response.data.percent = 100.00;
  }else{
    response.data.percent = 0.00;
  }
  response.data.roomId = response.data.rid;
  response.data.origin = to.params.origin;
  store.dispatch('set_anchor_info', response.data);

  return true;
};

const getAudienceInfo = async (to) => {
  if( !to.params.platform ||
      !to.params.roomId ||
      !to.params.type ||
      !to.params.origin ||
      !to.params.uid ||
      ( to.params.platform === store.getters.audienceInfo.platform &&
        to.params.roomId === store.getters.audienceInfo.roomId &&
        to.params.uid === store.getters.audienceInfo.uid &&
        to.params.origin === store.getters.audienceInfo.origin &&
        to.params.type === store.getters.audienceInfo.type
      )
  )return;
  const data = {
    platform:Number(to.params.platform),
    rid:to.params.roomId,
    uid:to.params.uid,
    origin:Number(to.params.origin),
    // audienceType:to.params.type ==='richer'?1:2
    audienceType:1
  };
  let response =await api_zbb.service.ZhibobaoGuildData.Audience.getDetailPersonal(data);
  if( response === false ) return false;
  response.data.platform = to.params.platform;
  response.data.roomId = to.params.roomId;
  response.data.uid = to.params.uid;
  response.data.origin = to.params.origin;
  response.data.type = to.params.type;
  store.dispatch('set_audience_info', response.data);

  return true;
}

