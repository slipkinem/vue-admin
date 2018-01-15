<template>
  <el-row class="panel">
    <el-col :span="24" class="panel-top">
      <el-col :span="20" class="logo">
        <el-tooltip class="item tip-time" content="当前时间" effect="dark" placement="left">
          <i class="el-icon-time"></i>
        </el-tooltip>
        {{timeInfo}}
      </el-col>
      <el-col :span="4">
        <el-tooltip class="item tip-logout" content="退出" effect="dark" placement="bottom">
          <router-link to="/login">
            <i class="el-icon-close"></i>
          </router-link>
        </el-tooltip>
      </el-col>
    </el-col>
    <el-col :span="4">
      <el-menu default-active="2"
               class="el-menu-vertical-demo"
               @open="handleOpen"
               @close="handleClose"
               router>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>组件</template>
          <el-menu-item-group>
            <template slot="title">常用</template>
            <el-menu-item index="/home/table">表格</el-menu-item>
            <el-menu-item index="/home/form">表单</el-menu-item>
            <el-menu-item index="/home/charts">图表</el-menu-item>
            <el-menu-item index="/home/article">文章</el-menu-item>
            <el-menu-item index="/home/post">编辑文章</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2"><i class="el-icon-menu"></i>导航二</el-menu-item>
        <el-menu-item index="3"><i class="el-icon-setting"></i>导航三</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="20" class="section">
      <!-- add toolbar -->
      <el-row>
        <nav>
          <ul>
            <li class="nav-item"
                v-for="(nav, key) in activeRoutes"
                :key="key">
              <!-- 导航 -->
              <router-link :to="nav.path">{{nav.name}}</router-link>
              <!-- icon -->
              <i class="remove text-danger fa fa-remove"
                 @click="removePath(nav)"></i>
            </li>
          </ul>
        </nav>
      </el-row>
      <el-row>
        <el-col :span="24" class="section-inside">
          <h2 style="width:200px;float:left;color: #475669;">{{currentPathName}}</h2>
          <el-breadcrumb separator="/" style="float:right;">
            <el-breadcrumb-item :to="{ path: '/login' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentPathNameParent !== ''">{{currentPathNameParent}}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentPathName !== ''">{{currentPathName}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
      <div class="section-inside">
        <pk-keep-alive :updateComponentsKey="updateKey" ref="keepAlive">
          <router-view/>
        </pk-keep-alive>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { format } from '../shard/utils'
import { Component, Vue } from '../ext-nb'
import { Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import PkKeepAlive from '../components/PkKeepAlive'
import { KeepAlive } from '../typings/keep-alive'

interface NavRoute extends Route {
  key: string
}

@Component({
  components: {
    PkKeepAlive
  }
})
export default class HomeComponent extends Vue {
  $refs: {
    keepAlive: KeepAlive
  }

  private timeInfo = ''
  private currentPathName = ''
  private currentPathNameParent: string | undefined = ''
  private activeRoutes: NavRoute[] = []

  created () {
    this.fetchData()
    this.timeClock()
  }

  @Watch('$route')
  fetchData () {
    if (this.$route.name) {
      this.currentPathName = this.$route.name
    }
    this.currentPathNameParent = this.$route.matched[0].name
  }

  handleOpen (key: string, keyPath: string) {
    console.log(key, keyPath)
  }

  handleClose (key: string, keyPath: string) {
    console.log(key, keyPath)
  }

  timeClock () {
    this.timeInfo = format(new Date())
  }

  removePath (nav: NavRoute) {
    this.activeRoutes.splice(this.objectInArrayIndex(this.activeRoutes, nav, 'path'), 1)
    this.$refs.keepAlive.removeCacheByKey(nav.key)
    this.$router.push(this.activeRoutes[0].path)
  }

  includesSym (list: any[], o: any, sym: string) {
    for (let i = 0; i < list.length; i++) {
      if (list[i][sym] === o[sym]) {
        return true
      }
    }
    return false
  }

  objectInArrayIndex (list: any[], o: any, sym: string): number {
    for (let i = 0; i < list.length; i++) {
      if (list[i][sym] === o[sym]) {
        return i
      }
    }
    return -1
  }

  updateKey (key: string) {
    if (!this.includesSym(this.activeRoutes, this.$route, 'path')) {
      if (this.$route.meta.hideNav) {
        return false
      }
      this.activeRoutes.push(Object.assign({ key }, this.$route))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  @import "../assets/styles/variable";

  .panel {
    .section {
      padding: 10px;
      .section-inside {
        padding: 10px;
        background: #FAFAFC;
      }
    }
    .aside-menu .router-active {
      color: $router-active-color;
    }
  }

  .panel-top {
    padding: 15px 0;
    background: $panel-bgcolor;
    .logo {
      font-size: 24px;
      padding-left: 30px;
    }
    .item {
      cursor: pointer;
    }
  }

  .tip-logout {
    float: right;
    margin-right: 20px;
    padding-top: 5px;
  }

  .nav-item {
    display: inline-block;
    background: #20a0ff;
    position: relative;
    margin: 0 0.5em 0 0;
    .remove {
      font-size: 18px;
      z-index: 99;
      position: absolute;
      top: -7px;
      right: -5px;
      cursor: pointer;
      transition: All 0.4s ease-in-out;
      &:hover {
        transform: rotate(90deg);
      }
    }
    a {
      opacity: 0.6;
      display: inline-block;
      padding: 0.5em 1em;
      text-decoration: none;
      color: #fcfcfc;
      font-weight: 600;
      cursor: pointer;
      &.router-link-active {
        opacity: 1;
      }
      &:hover {
        opacity: 1;
      }
    }
  }
</style>
