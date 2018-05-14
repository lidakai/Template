import { loginByUsername, logout, getUserInfo, bindMobile, unbindThird, loginByPassward  } from '@/api/login'
import { modifyNewMobile, modifyInfo, modifyPassword, bindRoom } from '@/api/user'
import { getToken, setToken, removeToken,clearAllCookie } from '@/utils/auth'
import { hideMobile } from "@/utils"
const user = {
  state: {
    token: getToken(),
    roles: ['admin'],
    userInfo: {},
    Experience:{
      token:'eyJ1aWQiOjEyNDM0NTgxNDAsInR5cGUiOiJkYXRhIn0=.YjVlNzE0ZjczNWE0YzU5OTI3MzExZjA0OGIwNThiMGJiYTFkZDZkYjM4ZTQ4ZmZiMmJkZmNlYmIxMTQ3MGI5YQ==',
      uid:1243458140,
      mobile:"18888888888",
      code:"123456"
    },
    ExperienceEmployInfos: {
      "totalCount": 7,
      "employInfos": [
        {
          "uid": 100000,
          "nickname": "直播小宝",
          "openid": "18888888888",
          "roleType": 3,
          "activeDays": 23,
          "lastLoginTime": "2018-05-09 13:51",
          "groupInfos": []
        },
        {
          "uid": 100002,
          "nickname": "直播宝大管家",
          "openid": "13000000000",
          "roleType": 1,
          "activeDays": 22,
          "lastLoginTime": "2018-05-09 13:51",
          "groupInfos": []
        },
        {
          "uid": 100003,
          "nickname": "直播宝二管家",
          "openid": "13000000001",
          "roleType": 1,
          "activeDays": 16,
          "lastLoginTime": "2018-05-09 13:51",
          "groupInfos": []
        },
        {
          "uid": 100004,
          "nickname": "直播宝星探1号",
          "openid": "13000000002",
          "roleType": 2,
          "activeDays": 19,
          "lastLoginTime": "2018-05-09 13:51",
          "groupInfos": [{
            groupName:'虎牙游戏组',
            groupId:"9087go4"
          },{
            groupName:'虎牙颜值组',
            groupId:"9087go4"
          }]
        },
        {
          "uid": 100005,
          "nickname": "直播宝星探2号",
          "openid": "13000000003",
          "roleType": 2,
          "activeDays": 7,
          "lastLoginTime": "2018-05-09 13:51",
          "groupInfos": [{
            groupName:'斗鱼游戏组',
            groupId:"9087go4"
          },{
            groupName:'斗鱼颜值组',
            groupId:"9087go4"
          }]
        },
        {
          "uid": 100006,
          "nickname": "直播宝星探3号",
          "openid": "13000000004",
          "roleType": 2,
          "activeDays": 14,
          "lastLoginTime": "2018-05-09 13:51",
          "groupInfos": [{
            groupName:'全民游戏组',
            groupId:"9087go4"
          },{
            groupName:'熊猫游戏组',
            groupId:"9087go4"
          },{
            groupName:'触手游戏组',
            groupId:"9087go4"
          }]
        },
        {
          "uid": 100007,
          "nickname": "直播宝星探4号",
          "openid": "13000000005",
          "roleType": 2,
          "activeDays": 12,
          "lastLoginTime": "2018-05-09 13:51",
          "groupInfos": [{
            groupName:'试播组',
            groupId:"9087go4"
          }]
        }
      ]
    }
  },

  mutations: {
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },

  actions1: {
    // 用户名登录

    LoginByUsername({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo).then(response => {
          if(response.data.code==0){
            commit('SET_TOKEN', response.data.data.token);
            commit('SET_USERINFO', response.data.data.info);
            setToken(response.data.data.token);
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 密码登录
    LoginByPassward({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByPassward(userInfo).then(response => {
          if(response.data.code==0){
            commit('SET_TOKEN', response.data.data.token);
            commit('SET_USERINFO', response.data.data.info);
            setToken(response.data.data.token);
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo({ data: 1 }).then(response => {
          if (response.data.code) {
            reject(response)
          }
          commit('SET_USERINFO', response.data.data.info);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    //绑定用户手机号
    BindMobile({ commit }, data) {
      return new Promise((resolve, reject) => {
        bindMobile(data).then(response => {
          if (response.data.code == 0) {
            commit('SET_USERINFO', response.data.data.info);
            commit('SET_TOKEN', response.data.data.token);
            setToken(response.data.data.token);
            resolve(response)
          }else{
            reject(response);
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    //修改用户手机号
    ModifyUserMobile({ commit }, data) {
      return new Promise((resolve, reject) => {
        modifyNewMobile(data).then(response => {
          if (response.data.code == 0) {
            user.state.userInfo.bind.mobile.openid = hideMobile(data.mobile);
            commit('SET_USERINFO', user.state.userInfo);
            // commit('SET_TOKEN', response.data.data.token);
            // setToken(response.data.data.token);
            resolve(response)
          }else{
            reject(response);
          }

        }).catch(error => {
          reject(error)
        })
      })
    },

    //修改用户信息
    ModifyUserInfo({ commit }, data) {
      return new Promise((resolve, reject) => {
        modifyInfo(data).then(response => {
          if (response.data.code == 0) {
            user.state.userInfo = Object.assign({},user.state.userInfo,data);
            commit('SET_USERINFO', user.state.userInfo);
            resolve(response)
          }else{
            reject(response);
          }

        }).catch(error => {
          reject(error)
        })
      })
    },

    //解除第三方绑定
    UnbindThird({ commit }, data) {
      return new Promise((resolve, reject) => {
        unbindThird(data).then(response => {
          const res = response.data.data;
          if (response.data.code == 0) { // 由于mockjs 不支持自定义状态码只能这样hack
            user.state.userInfo.bind[response.data.data.type] = {
              bind:false,
              nickname:'',
              openid:''
            };
            commit('SET_USERINFO', user.state.userInfo);
            resolve(response)
          }else{
            reject(response);
          }

        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(response=>{
          resolve(response)
        })

      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        clearAllCookie();
        removeToken();
        commit('SET_TOKEN', '');
        resolve()
      })
    },

    Experience( { commit } ) {
      return new Promise(resolve => {
        commit('SET_TOKEN', user.state.Experience.token);
        setToken(user.state.Experience.token);
        resolve()
      });
      // this.$route()
    },

    ModifyPassword( { commit } ,data) {
      return new Promise(resolve => {
        modifyPassword(data).then(response => {
          if(response.data.code==0){
            user.state.userInfo.bind.mobile.pw = true;
            commit('SET_USERINFO', user.state.userInfo);
            resolve(response)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })

      });
    },
    //绑定房间
    BindRoom( { commit } ,data) {
      return new Promise(resolve => {
        bindRoom(data).then(response => {
          if(response.data.code==0){
            user.state.userInfo.room = response.data.data;
            commit('SET_USERINFO', user.state.userInfo);
            resolve(response)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })

      });
    }
  },
  actions: {
    set_userInfo({ commit }, userInfo) {
      commit('SET_USERINFO', userInfo);
    },
    set_token({ commit },token){
      commit('SET_TOKEN', token);
      setToken(token);
      return "ddd";
    },
    set_room({ commit },room){
      user.state.userInfo.room = room;
      commit('SET_USERINFO', userInfo);
    },
    // 用户名登录
    LoginByUsername({ commit }, data) {
      commit('SET_TOKEN', data.token);
      commit('SET_USERINFO', data.info);
      setToken(data.token);
    },

    // 密码登录
    LoginByPassward({ commit }, data) {
      commit('SET_TOKEN', data.token);
      commit('SET_USERINFO', data.info);
      setToken(data.token);
    },
    // 获取用户信息
    GetUserInfo({ commit },userInfo) {
      commit('SET_USERINFO', userInfo);
    },

    //绑定用户手机号
    BindMobile({ commit }, data) {
      commit('SET_TOKEN', data.token);
      commit('SET_USERINFO', data.info);
      setToken(data.token);
    },

    //修改用户手机号
    ModifyUserMobile({ commit }, mobile) {
      user.state.userInfo.bind.mobile.openid = mobile;
      commit('SET_USERINFO', user.state.userInfo);
    },

    //修改用户信息
    ModifyUserInfo({ commit }, data) {
      user.state.userInfo = Object.assign({},user.state.userInfo,data);
      commit('SET_USERINFO', user.state.userInfo);
    },

    //解除第三方绑定
    UnbindThird({ commit }, type) {
      user.state.userInfo.bind[type] = {
        bind:false,
        nickname:'',
        openid:''
      };
      commit('SET_USERINFO', user.state.userInfo);
    },

    // 前端 登出
    FedLogOut({ commit }) {

      console.error("错误token",getToken());
      clearAllCookie();
      removeToken();
      commit('SET_TOKEN', '');
    },

    Experience( { commit } ) {
      commit('SET_TOKEN', user.state.Experience.token);
      setToken(user.state.Experience.token);
    },

    //修改手机密码
    ModifyPassword( { commit } ) {
      user.state.userInfo.bind.mobile.pw = true;
      commit('SET_USERINFO', user.state.userInfo);
    },
    //绑定房间
    BindRoom( { commit } ,room) {
      user.state.userInfo.room = room;
      commit('SET_USERINFO', user.state.userInfo);
    }
  }
}

export default user
