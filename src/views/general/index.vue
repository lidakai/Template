<template>
  <div class="general_container">
    <div class="general_clearfix">
      <h3 class="anchor_content_title">今日概况</h3>
      <div v-if="!!(this.guild_type.group)" class="general_container_header">
        <Type-select-component @on-type-change='typeChange'></Type-select-component>
        <Search-component :search-data="searchData" @on-search-value="searchHost"></Search-component>
      </div>
    </div>

    <All-Blank-Page-Component v-if="!(this.guild_type.group)"></All-Blank-Page-Component>
    <div v-else>
      <div class="anchor_content">
        <Blank-Page-Component v-if="!general.today.peoSum"></Blank-Page-Component>
        <div v-else>
          <div class="anchor_content_info">
            <el-row>
              <el-col :xs="18" :sm="18" :md="18" :lg="18" class="left_list"
                      style="padding-right: 20px;display: flex;flex-direction: column">
                <div class="anchor_content_total">
                  <div>
                    <p class="profit_icon">
                      <svg-icon icon-class="profit_svg"></svg-icon>
                    </p>
                    <p class="today_profit">
                      <i>今日总收益</i>
                      <span>{{general.today.price.toFixed(2) || 0.00}}</span>元
                    </p>
                    <p class="yesterday_profit">
                      <i>昨日：{{general.yesterday.price.toFixed(2) || 0.00}}元</i>
                      <em class="good_status" v-if="general.today.changeValue >=0">{{(general.today.changeValue).toFixed(2)|| 0.00}}</em>
                      <em class="bad_status" v-else>{{(general.today.changeValue).toFixed(2)|| 0.00}}</em>
                    </p>
                  </div>
                  <div>
                    <p class="host_icon">
                      <svg-icon icon-class="host_svg"></svg-icon>
                    </p>
                    <p class="today_host">
                      <i>开播人数</i>
                      <span>{{general.today.livePoeNum}} / {{general.today.peoSum}}</span>
                    </p>
                    <p class="yesterday_host">昨日开播情况:{{general.yesterday.livePoeNum}} / {{general.yesterday.peoSum}}</p>
                  </div>
                </div>
                <div class="anchor_content_detail">
                  <div class="center_detail">
                  <span>
                    <div class="iconBox">
                      <img src="./img/RewardAllNum.svg" alt="打赏总人数" title="打赏总人数">
                    </div>
                    <span>打赏总人数</span>
                    <i>{{general.today.gPeoNum}}</i>
                  </span>
                    <span>
                         <div class="iconBox">
                      <img src="./img/UserReward.svg" alt="人均打赏" title="人均打赏">
                    </div>
                    <span>人均打赏</span>
                    <i>{{(general.today.price / general.today.gPeoNum).toFixed(2)}} <em>元</em></i>
                  </span>
                    <span>
                         <div class="iconBox">
                      <img src="./img/Money.svg" alt="最大打赏额" title="最大打赏额">
                    </div>
                    <span>最大打赏额</span>
                    <i>{{general.today.maxPrice}} <em>元</em></i>
                  </span>
                    <span>
                         <div class="iconBox">
                      <img src="./img/MVP.svg" alt="最高贡献主播" title="最高贡献主播">
                    </div>
                        <span>最高贡献主播</span>
                    <i>{{general.today.anchorNoOne.nickname}}</i>
                  </span>
                  </div>
                </div>
              </el-col>
              <el-col :xs="6" :sm="6" :md="6" :lg="6" class="right_list">
                <div class="result">
                  <p class="result_title">
                    <span @click="isCurrentDay = true" :class="isCurrentDay?'current_result':''">今日小结</span>
                    <span @click="isCurrentDay = false" :class="isCurrentDay?'':'current_result'">昨日小结</span>
                  </p>
                  <Table-Page-Component data="今日暂无数据"
                                        v-if="isCurrentDay&&!general.today.peoSum>=1"></Table-Page-Component>
                  <div v-else>
                    <div v-if="isCurrentDay && general.today.peoSum > 1">
                      <p>
                        今天您旗下<i>{{typeString}}</i>的<i>{{general.today.peoSum}}</i>位主播，共有<i>{{general.today.livePoeNum || 0}}</i>位开播；
                      </p>
                      <p>
                        一共获得收益<i>{{general.today.price.toFixed(2) || 0.00}}</i>元，相比前一天
                        <em
                          v-if="general.today.changeValue>0">上升<i>{{Number(general.today.anchorNoOne.percent) || 0}}%</i></em>
                        <em
                          v-if="general.today.changeValue<0">下降<i>{{Number(general.today.anchorNoOne.percent) || 0}}%</i></em>
                        <em v-if="general.today.changeValue === 0">保持持平</em>；
                      </p>

                      <!--当前处于所有主播范围内，未做限制-->
                      <p v-if="typeString === ''&&general.today.livePoeNum">
                        <i>{{general.today.anchorNoOne.platName}}</i>平台的
                        <a :href="general.today.anchorNoOne.url"
                           target="_blank">{{general.today.anchorNoOne.nickname}}</a>
                        以<i>{{general.today.anchorNoOne.price}}</i>元打赏额位列所有主播的第1名，
                        所获打赏占到了公会全体的 <i>{{general.today.anchorNoOne.guildRate.toFixed(2)}}</i>%；
                      </p>

                      <!--当前已选有部分限制,且人数大于1-->
                      <p v-if="typeString !== ''&&general.today.livePoeNum">
                        <i>{{general.today.anchorNoOne.platName}}</i>平台的
                        <a :href="general.today.anchorNoOne.url"
                           target="_blank">{{general.today.anchorNoOne.nickname}}</a>
                        以<i>{{general.today.anchorNoOne.price}}</i>元打赏额位列<i>{{typeString}}</i>的第1名，
                        所获打赏占到了
                        <em
                          v-if="general.today.anchorNoOne.groupName">组内全体的<i>{{general.today.anchorNoOne.groupRate.toFixed(2)}}</i>%，</em>
                        公会全体的 <i>{{general.today.anchorNoOne.guildRate.toFixed(2)}}</i>%；
                      </p>
                    </div>
                    <div v-if="isCurrentDay && general.today.peoSum === 1">
                      <!--当前人数为1-->
                      <p>
                        今天主播<i>{{general.today.anchorNoOne.nickname}}</i>一共获得收益<i>{{general.today.price}}</i>元，相比前一天
                        <em v-if="general.today.changeValue > 0">上升<i>{{Number(general.today.anchorNoOne.percent)}}</i>%</em>
                        <em v-if="general.today.changeValue < 0">下降<i>{{Number(general.today.anchorNoOne.percent)}}</i>%</em>
                        <em v-if="general.today.changeValue === 0">保持持平</em>；
                        TA今天的收益在
                        <em v-if="general.today.anchorNoOne.groupName"><i>{{general.today.anchorNoOne.groupName}}</i>分组中排第<i>{{general.today.anchorNoOne.groupRank}}</i>名，</em>
                        公会中的整体排名为第<i>{{general.today.anchorNoOne.guildRank}}</i>名，
                        相比昨天排名<em v-if="general.today.anchorNoOne.guildRank > general.yesterday.anchorNoOne.guildRank">下降<i>{{general.today.anchorNoOne.guildRank - general.yesterday.anchorNoOne.guildRank}}名</i></em><em
                        v-if="general.today.anchorNoOne.guildRank < general.yesterday.anchorNoOne.guildRank">上升<i>{{general.yesterday.anchorNoOne.guildRank - general.today.anchorNoOne.guildRank}}</i>名</em><em
                        v-if="general.today.anchorNoOne.guildRank === general.yesterday.anchorNoOne.guildRank">保持持平</em>。
                      </p>
                      <p v-if="general.yesterday.anchorNoOne.changeValue < 0">可以适当关心一下喔！</p>
                      <p v-if="general.yesterday.anchorNoOne.changeValue >= 0">可以适当鼓励一下喔！</p>
                      <p v-if="general.topThree.length > 0">今天TA还首次进入了公会前3名，值得夸奖一下喔！</p>
                      <p v-if="general.inactive.length > 0">主播<i>{{general.today.anchorNoOne.nickname}}</i>已连续三天未播出，
                        多多关心一下吧，主播持续、稳定开播有助于公会与主播个人的发展喔</p>
                    </div>
                  </div>

                  <Table-Page-Component data="昨日暂无数据"
                                        v-if="!isCurrentDay&&!general.yesterday.peoSum>=1"></Table-Page-Component>
                  <div v-else>
                    <div v-if="!isCurrentDay && general.yesterday.peoSum > 1">
                      <p>昨天您旗下{{typeString}}的<i>{{general.yesterday.peoSum}}</i>位主播，共有 <i>{{general.yesterday.livePoeNum}}</i>位开播；
                      </p>
                      <p>
                        一共获得收益<i>{{general.yesterday.price}}</i>元，
                        相比前一天
                        <em v-if="general.yesterday.changeValue>=0">上升<i>{{Number(general.yesterday.changeValue)}}</i>元</em>
                        <em
                          v-if="general.yesterday.changeValue<0">下降<i>{{Number(general.yesterday.changeValue)}}</i>元</em>
                        <em v-if="general.yesterday.changeValue === 0">上升</em>；
                      </p>

                      <!--当前处于所有主播范围内，未做限制-->
                      <p v-if="typeString === '' && general.yesterday.peoSum >1 &&general.yesterday.livePoeNum">
                        <i>{{general.yesterday.anchorNoOne.platName}}</i>平台的
                        <a :href="general.yesterday.anchorNoOne.url"
                           target="_blank">{{general.yesterday.anchorNoOne.nickname}}</a>
                        以<i>{{general.yesterday.anchorNoOne.price}}</i>元打赏额位列所有主播的第1名，所获打赏占到了公会全体的 <i>{{general.yesterday.anchorNoOne.guildRate.toFixed(2)}}</i>%；
                      </p>


                      <!--当前已选有部分限制,且人数大于1-->
                      <p v-if="typeString !== '' && general.yesterday.peoSum >1&&general.yesterday.livePoeNum">
                        <i>{{general.yesterday.anchorNoOne.platName}}</i>平台的
                        <a :href="general.yesterday.anchorNoOne.url"
                           target="_blank">{{general.yesterday.anchorNoOne.nickname}}</a>
                        以<i>{{general.yesterday.anchorNoOne.price || 0}}</i>元打赏额位列<i>{{typeString}}</i>的第1名，
                        所获打赏占到了<em
                        v-if="general.today.anchorNoOne.groupName">组内全体的<i>{{general.yesterday.anchorNoOne.groupRate.toFixed(2)}}</i>%，</em>
                        公会全体的<i>{{general.yesterday.anchorNoOne.guildRate.toFixed(2)}}</i>%；
                      </p>

                      <p v-if="general.topThree.length">
                        主播<a v-for="item in general.topThree" :href="item.url" :key="item.nickname"
                             target="_blank">{{item.nickname}}</a>
                        首次进入公会排名前<i>3</i>名，适时鼓励一下吧！</p>
                      <!--<p v-if="general.topThree.length"></p>-->
                      <p v-if="general.inactive.length>=3"><i>{{general.inactive[0].nickname}}</i>等5位主播连续多天未播出，</p>
                      <p v-if="general.inactive.length< 3 && general.inactive.length>1">
                        <i>{{general.inactive[0].nickname}}、{{general.inactive[1].nickname}}</i>连续多天未播出，</p>
                      <p v-if="general.inactive.length === 1"><i>{{general.inactive[0].nickname}}</i>主播连续多天未播出，</p>
                      <p v-if="general.inactive.length >= 1">建议多关注主播动向喔！</p>
                      <span class="show_result_detail" v-if="general.inactive.length"
                            @click="show_detail = true">展开详情</span>
                    </div>
                    <div v-if="!isCurrentDay && general.yesterday.peoSum === 1">
                      <!--当前人数为1-->
                      <p>
                        昨天主播<i>{{general.yesterday.anchorNoOne.nickname}}</i>一共获得收益<i>{{general.yesterday.anchorNoOne.price}}</i>元，相比前一天
                        <em
                          v-if="general.yesterday.changeValue > 0">上升<i>{{Number(general.yesterday.anchorNoOne.percent)}}</i>%</em>
                        <em
                          v-if="general.yesterday.changeValue < 0">下降<i>{{Number(general.yesterday.anchorNoOne.percent)}}</i>%</em>
                        <em v-if="general.yesterday.changeValue === 0">保持持平</em>；
                      </p>
                      <p>
                        TA昨天的收益在<em
                        v-if="general.yesterday.anchorNoOne.groupName"><i>{{general.yesterday.anchorNoOne.groupName}}</i>分组中排第<i>{{general.yesterday.anchorNoOne.groupRank}}</i>名，</em>公会中的整体排名为第<i>{{general.yesterday.anchorNoOne.guildRank}}</i>名。
                        <!--相比前一天排名-->
                        <!--&lt;!&ndash;<em v-if="general.today.anchorNoOne.changeGuildRank>0">上升<i>{{Number(general.today.anchorNoOne.changeGuildRank)}}</i>名</em>&ndash;&gt;-->
                        <!--&lt;!&ndash;<em v-if="general.today.anchorNoOne.changeGuildRank<0">下降<i>{{Number(general.today.anchorNoOne.changeGuildRank)}}</i>名</em>&ndash;&gt;-->
                        <!--&lt;!&ndash;<em v-if="general.today.anchorNoOne.changeGuildRank===0">持平</em>，&ndash;&gt;-->

                        <!--<em v-if="general.yesterday.anchorNoOne.guildRank > general.yesterday.anchorNoOne.guildRank">下降-->
                        <!--<i>{{general.yesterday.anchorNoOne.guildRank - general.yesterday.anchorNoOne.guildRank}}</i></em>-->
                        <!--<em v-if="general.yesterday.anchorNoOne.guildRank < general.yesterday.anchorNoOne.guildRank">上升-->
                        <!--<i>{{general.yesterday.anchorNoOne.guildRank-general.yesterday.anchorNoOne.guildRank}}</i></em>-->
                        <!--<em v-if="general.yesterday.anchorNoOne.guildRank === general.yesterday.anchorNoOne.guildRank">持平</em>。-->
                      </p>
                      <p v-if="general.yesterday.anchorNoOne.changeValue < 0">可以适当关心一下喔！</p>
                      <p v-if="general.yesterday.anchorNoOne.changeValue >= 0">可以适当鼓励一下喔！</p>
                      <p v-if="general.topThree.length > 0">今天TA还首次进入了公会前3名，值得夸奖一下喔！</p>
                      <p v-if="general.inactive.length > 0">主播<i>{{general.today.anchorNoOne.nickname}}</i>已连续三天未播出，
                        多多关心一下吧，主播持续、稳定开播有助于公会与主播个人的发展喔</p>
                    </div>
                    <div :class=" show_detail ? 'show_inactive_detail':'inactive_detail'" v-if="!isCurrentDay">
                      <ul v-for="item in general.inactive">
                        <li>
                          <span>{{item.nickname}}</span>：连续{{item.days}}天未播出 <a
                          :href="'#/analysis/profit/'+item.platform+'/'+item.rid" target="_blank">查看数据</a>
                        </li>
                      </ul>
                      <p>建议查看详情，多关注主播动向，若主播已离开公会，请到主播管理进行对应删除操作!</p>
                      <span class="close_result_detail" @click="show_detail = false">收起详情</span>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="anchor_content_rank">
            <h4 class="rank_title">已选主播排行 <span><router-link to="hostStream/rank">查看主播完整排名</router-link></span></h4>
            <table-component :table-data="tableData"></table-component>
            <el-button v-if="haveMore" class="getMoreBtn" @click="getRank">查看更多</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style type="text/css" lang="scss" scoped>
  .general_container {
    background-color: #f7f9fc;
    min-height: 100vh;
    min-width: 1000px;
    /*min-width:1600px;*/
    /*overflow: hidden;*/
  }

  .general_container_header {
    float: right;
    margin-bottom: 20px;
    .el-button--medium {
      vertical-align: top;
    }
  }

  .general_clearfix:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
  }

  .anchor_content_title {
    display: inline-block;
    margin: 0 0 30px 0;
    height: 36px;
    font-size: 26px;
    line-height: 36px;
    color: #464851;
    font-weight: normal;
  }

  .anchor_content {
    .anchor_content_info {
      .result {
        background-color: #ffffff;
        box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.04);
        height: 100%;
        min-height: 460px;
        padding: 25px 30px 0 24px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        p {
          margin: 0;
          font-size: 14px;
          font-weight: normal;
          line-height: 40px;
          color: #76767e;
          i {
            font-size: 18px;
            font-weight: bold;
            font-style: normal;
            color: #76767e;
            margin: 0 3px;
          }
          a {
            font-size: 18px;
            font-weight: bold;
            font-style: normal;
            color: #76767e;
            margin: 0 3px;
            &:hover {
              color: #3a84f4;
            }
          }
          em {
            font-style: normal;
          }
        }
        .result_title {
          margin: 0 0 17px 0;
          span {
            display: inline-block;
            height: 32px;
            line-height: 30px;
            font-size: 16px;
            font-weight: bold;
            color: #464851;
            border-bottom: 2px solid transparent;
            margin-right: 30px;
            cursor: pointer;
          }
          .current_result {
            color: #508ef7;
            border-color: #508ef7;
          }
        }
        .show_result_detail {
          font-size: 14px;
          font-weight: normal;
          color: #508ef7;
          cursor: pointer;
        }
        .inactive_detail, .show_inactive_detail {
          background: #fff;
          position: absolute;
          bottom: 0;
          left: 0;
          padding: 25px 30px 0 24px;
          ul {
            list-style: none;
            padding: 0;
            li {
              list-style: none;
              color: #767676;
              font-size: 14px;
              height: 30px;
              line-height: 30px;
              span {
                height: 100%;
                float: left;
                display: inline-block;
                max-width: 120px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              a {
                height: 100%;
                color: #3b77ff;
                float: right;
              }
            }
          }
          p {
            font-size: 16px;
            line-height: 30px !important;
          }
          .close_result_detail {
            display: inline-block;
            font-weight: normal;
            color: #508ef7;
            cursor: pointer;
            padding: 10px 0;
            margin: 10px 0;
          }
        }
        .inactive_detail {
          transition: all 0.5s;
          transform: translateY(100%);
        }
        .show_inactive_detail {
          transition: all 0.5s;
          transform: translateY(0);
        }
      }
      .anchor_content_total {
        padding: 47px 0 47px 84px;
        min-width: 700px;
        /*       background-image: linear-gradient(0deg,
                 #478dff 0%,
                 #3a84f4 100%);*/
        background-image: url("./img/background_.png");
        background-color: #3a84f4;
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: center bottom;
        min-height: 215px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        div {
          margin: 10px 0;
          min-width: 500px;
          p {
            margin: 0;
            float: left;
            height: 100px;
            font-size: 14px;
            font-weight: normal;
            color: #ffffff;
            i {
              font-style: normal;
              display: block;
            }
            span {
              font-size: 30px;
              font-weight: bold;
              color: #ffffff;
            }
            em {
              font-style: normal;
            }
          }
        }
        .profit_icon {
          width: 100px;
          border: 5px solid #fff;
          border-radius: 50%;
          overflow: hidden;
          text-align: center;
          padding-top: 26px;
          .svg-icon {
            width: 32px;
            height: 35px;

          }
        }
        .host_icon {
          width: 100px;
          border: 5px solid #fff;
          border-radius: 50%;
          overflow: hidden;
          text-align: center;
          padding-top: 26px;
          .svg-icon {
            width: 32px;
            height: 35px;
          }
        }
        .today_profit {
          width: 220px;
          padding-top: 27px;
          text-align: center;
        }
        .yesterday_profit {
          width: 270px;
          padding-top: 33px;
          padding-left: 30px;
          text-align: left;
          em {
            font-style: normal;
            margin-left: 42px;
            font-size: 12px;
            position: relative;
          }
          .good_status {
            color: #FF5F3D;
            &::before {
              content: "";
              display: block;
              width: 0;
              height: 0;
              border-bottom: 6px solid red;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              position: absolute;
              top: 4px;
              left: -20px;
            }
          }
          .bad_status {
            color: #a8eab8;
            &::before {
              content: "";
              display: block;
              width: 0;
              height: 0;
              border-top: 6px solid #a8eab8;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              position: absolute;
              top: 4px;
              left: -20px;
            }
          }
        }
        .today_host {
          width: 200px;
          padding-top: 27px;
          padding-left: 55px;
          text-align: left;
          i {
            margin-bottom: 3px;
          }
        }
        .yesterday_host {
          line-height: 100px;
        }

      }
      .anchor_content_detail {
        height: 245px;
        background: #f7f9fc;
        display: flex;
        flex-flow: nowrap row;
        box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.04);
        .center_detail {
          width: 100%;
          margin-top: 23px;
          display: flex;
          & > span {
            font-size: 14px;
            color: #76767e;
            flex: 1;
            width: 25%;
            background-color: #FFFFFF;
            margin-right: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-size: 100% auto;
            background-position: bottom center;
            background-repeat: no-repeat;
            .iconBox {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 27px;
              img {
                width: auto;
                height: 22px;
                vertical-align: middle;
              }
            }
            i {
              font-style: normal;
              font-size: 36px;
              width: 100%;
              margin-top: 17px;
              position: relative;
              text-overflow: ellipsis;
              text-align: center;
              white-space: nowrap;
              overflow: hidden;
              em {
                position: absolute;
                right: -25%;
                bottom: 15%;
                font-style: normal;
                font-size: 14px;
              }
            }
          }
          span:nth-child(1) {
            background-image: url("./img/1.svg");
            .iconBox {
              background-color: #51cbf7;
              img {
                width: 26px;
                height: 18px;
              }
            }
            i {
              color: #51cbf7;
            }
          }
          span:nth-child(2) {
            background-image: url("./img/2.svg");
            .iconBox {
              background-color: #ff9e79;
              img {
                width: 22px;
                height: 22px;
              }
            }
            i {
              color: #ff9e79;
            }
          }
          span:nth-child(3) {
            background-image: url("./img/3.svg");
            .iconBox {
              background-color: #a8eab8;
              img {
                width: 15px;
                height: 21px;
              }
            }
            i {
              color: #a8eab8;
            }
          }
          span:nth-child(4) {
            background-image: url("./img/4.svg");
            .iconBox {
              background-color: #ffd74d;
              img {
                width: 26px;
                height: 20px;
              }
            }
            i {
              color: #ffd74d;
            }
          }
          span:last-child {
            margin-right: 0;
          }
          p {
            display: flex;
            flex-flow: nowrap row;
            justify-content: space-around;
            margin: 0;
            span {
              display: block;
              width: 120px;
              height: 120px;
              background-color: #51cbf7;
              border-radius: 50%;
              overflow: hidden;
              padding-top: 36px;
              text-align: center;
              font-size: 14px;
              font-weight: normal;
              color: #ffffff;
              i {
                display: inline-block;
                font-size: 24px;
                font-weight: bold;
                color: #ffffff;
                font-style: normal;
                margin-top: 10px;
              }
              &:last-child {
                i {
                  font-size: 18px;
                }
              }
            }
          }

        }
        .right_detail {
          display: inline-block;
          width: 50%;
          height: 100%;
          padding-left: 30px;
          position: relative;
          .chart_title {
            display: block;
            font-size: 16px;
            font-weight: bold;
            color: #4b4d56;
            margin: 30px 0 25px 0;
          }
          .tool_tips {
            width: 110px;
            position: absolute;
            top: 40px;
            right: 20px;
            height: 300px;
            /*background: #ccc;*/
            font-size: 16px;
            font-weight: normal;
            color: #333333;
            span {
              display: block;
              margin-bottom: 20px;
              height: 20px;
              line-height: 20px;
              position: relative;
              padding-left: 30px;
            }
            i {
              display: inline-block;
              width: 20px;
              height: 20px;
              overflow: hidden;
              border-radius: 50%;
              background: #7eb1ff;
              position: absolute;
              top: 0;
              left: 0;
            }
          }

        }
      }
    }
    .anchor_content_rank {
      background: #fff;
      padding: 30px 20px;
      box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.04);
      margin-top: 20px;
      .rank_title {
        font-size: 16px;
        font-weight: normal;
        color: #4b4d56;
        span {
          /*background: rgba(21, 144, 242, 1);*/
          /*color: #fff;*/
          /*padding: 5px 10px;*/
          /*border-radius: 10px;*/
          display: inline-block;
          width: 174px;
          height: 32px;
          line-height: 32px;
          background-color: #508ef7;
          border-radius: 2px;
          font-size: 14px;
          font-weight: normal;
          color: #ffffff;
          text-align: center;
          margin-left: 10px;
        }
      }
      .getMore {
        display: block;
        border: none;
        color: rgba(0, 0, 0, 0.6);
        outline: none;
        cursor: pointer;
        width: 380px;
        height: 48px;
        background-color: #3b77ff;
        border-radius: 24px;
        font-size: 18px;
        color: #ffffff;
        margin: 40px auto 0;
      }
      .getMoreBtn {
        display: block;
        margin: 16px auto 40px;
        width: 146px;
        height: 32px;
        line-height: 32px;
        background-color: #fefefe;
        border-radius: 2px;
        border: solid 1px #d4dae9;
        padding: 0;
      }
    }
  }

  .right_list, .left_list {
    margin: 0 0 5px;
  }

  @media screen and (max-width: 1000px) {
    .right_list {
      width: 100%;
      .result {
        min-height: 0 !important;
        padding-bottom: 20px !important;
      }
    }
    .left_list {
      width: 100%;
    }
  }
</style>
<script>
  import {mapGetters} from 'vuex'
  import TypeSelectComponent from '@/components/TypeSelect/index.vue'
  import SearchComponent from '@/components/Search/index.vue'
  import tableComponent from './components/table.vue'
  import BarComponent from './components/BarChart.vue'
  import BlankPageComponent from '@/components/NullPages/BlankPage.vue'
  import AllBlankPageComponent from '@/components/NullPages/AllBlankPage.vue'
  import TablePageComponent from '@/components/NullPages/TablePage.vue'

  export default {
    name: 'general',
    components: {
      TypeSelectComponent,
      SearchComponent,
      tableComponent,
      BarComponent,
      BlankPageComponent,
      AllBlankPageComponent,
      TablePageComponent
    },
    computed: {
      ...mapGetters([
        'total_type',
        'type_select',
        'guild_type',
      ]),
    },
    data() {
      return {
        searchData: {
          placeholder: "请输入主播昵称",
          type: 'searchHost',
          param: {}
        },
        tableData: [],
        ChartData: {
          name: '',
          coordinate: [],
          data: []
        },
        isCurrentDay: true,
        param: {
          groupId: "all", // 'all' or id
          platform: 0, // 0 or 1,2,3...
          cateId: 0, // 0 or other 1,2,3...
          searchVar: "",
        },
        giftParam: {
          dayType: 0,
          groupId: 'all',
          cateId: 0,
          platform: 0,
          status: 0,
          pageNum: 1,
          pageSize: 10,
          sortKey: 'profit',
          sortValue: 'desc'
        },
        general: {
          today: {
            changeValue: 0,
            price: 0,
            gPeoNum: 0,
            maxPrice: 0,
            livePoeNum: 0,
            peoSum: 0,
            anchorNoOne: {}
          },
          yesterday: {
            changeValue: 0,
            price: 0,
            gPeoNum: 0,
            maxPrice: 0,
            livePoeNum: 0,
            peoSum: 0,
            anchorNoOne: {}
          },
          beforeYesterdayPrice: 0,
          topThree: [],
          inactive: [],
        },
        typeString: "",
        haveMore: true,
        isLoading: false,
        show_detail: false,//展开详情
      };
    },
    created() {
      this.getRank();
    },
    methods: {
      typeChange(data) {
        this.typeString = "";
        if (data.platform !== 0) {
          this.typeString += this.getNameById('plat', data.platform) + "平台"
        }

        if (data.cateId !== 0) {
          this.typeString += this.getNameById('cate', data.cateId) + "分类"
        }

        if (data.groupId !== "all") {
          this.typeString += this.getNameById('group', data.groupId) + "分组"
        }
        this.param = Object.assign({}, this.param, data);
        this.searchData.param = data;
        this.getData();
      },
      async getRank() {
        if (this.isLoading) return;
        this.isLoading = true;
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Anchor.getRank(this.giftParam);
        this.isLoading = false;
        if (response === false) return;
        response.data.anchorRankInfos = response.data.anchorRankInfos || [];
        if (response.data.anchorRankInfos.length < this.giftParam.pageSize) {
          this.haveMore = false;
        }
        this.giftParam.pageNum++;
        let data = response.data.anchorRankInfos;
        this.tableData = [...this.tableData, ...data]
      },
      searchHost(value) {
        this.param.searchVar = value;
        this.getData();
      },
      async getData() {
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Anchor.todayGeneral(this.param);
        if (response === false) return;
        this.handleData(response.data);
      },
      handleData(res) {
        res.today = res.today ? res.today : {};
        res.today.anchorNoOne = res.today.anchorNoOne ? res.today.anchorNoOne : {};
        res.yesterday = res.yesterday ? res.yesterday : {};
        res.yesterday.anchorNoOne = res.yesterday.anchorNoOne ? res.yesterday.anchorNoOne : {};
        res.today.price = res.today.price ? res.today.price : 0;
        res.yesterday.price = res.yesterday.price ? res.yesterday.price : 0;
        res.today.changeValue = res.today.price - res.yesterday.price;
        res.beforeYesterdayPrice = res.beforeYesterdayPrice ? res.beforeYesterdayPrice : 0;
        res.yesterday.changeValue = res.yesterday.price - res.beforeYesterdayPrice;
        console.log(res.today.changeValue);
        if (res.yesterday.price) {
          res.today.anchorNoOne.percent = Number(res.today.changeValue / res.yesterday.price).toFixed(4) * 100
        } else if (res.today.price) {
          res.today.anchorNoOne.percent = 100;
        } else {
          res.today.anchorNoOne.percent = 0;
        }

        if (res.beforeYesterdayPrice) {
          res.yesterday.anchorNoOne.percent = Number(res.yesterday.changeValue / res.beforeYesterdayPrice).toFixed(4) * 100
        } else if (res.yesterday.price) {
          res.yesterday.anchorNoOne.percent = 100;
        } else {
          res.yesterday.anchorNoOne.percent = 0;
        }

        res.today.anchorNoOne.guildRate = res.today.anchorNoOne.guildRate ? res.today.anchorNoOne.guildRate.toFixed(4) * 100 : 0;
        res.today.anchorNoOne.groupRate = res.today.anchorNoOne.groupRate ? res.today.anchorNoOne.groupRate.toFixed(4) * 100 : 0;

        res.yesterday.anchorNoOne.guildRate = res.yesterday.anchorNoOne.guildRate ? res.yesterday.anchorNoOne.guildRate.toFixed(4) * 100 : 0;
        res.yesterday.anchorNoOne.groupRate = res.yesterday.anchorNoOne.groupRate ? res.yesterday.anchorNoOne.groupRate.toFixed(4) * 100 : 0;
        res.topThree = res.topThree && res.topThree.length ? res.topThree : [];
        res.inactive = res.inactive && res.inactive.length ? res.inactive : [];
        this.general = res;
      },
      getNameById(type, id) {
        switch (type) {
          case 'group':
            let selectGroupName = "";
            this.guild_type.group.forEach(item => {
              if (item.id === id) {
                return selectGroupName = item.name;
              }
            });
            return selectGroupName;
          case 'plat':
            let selectPlatName = "";
            this.guild_type.platform.forEach(item => {
              if (Number(item.id) === id) {
                return selectPlatName = item.name;
              }
            });
            return selectPlatName;
          case 'cate':
            let selectCateName = "";
            this.guild_type.category.forEach(item => {
              if (Number(item.id) === id) {
                return selectCateName = item.name;
              }
            });
            return selectCateName;
          default:
            return '';
        }
      },
    }
  }
</script>
