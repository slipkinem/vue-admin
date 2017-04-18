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
      <el-col :span="24" class="section-inside">
        <h2 style="width:200px;float:left;color: #475669;">{{currentPathName}}</h2>
        <el-breadcrumb separator="/" style="float:right;">
          <el-breadcrumb-item :to="{ path: '/login' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-if="currentPathNameParent!=''">{{currentPathNameParent}}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="currentPathName!=''">{{currentPathName}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <div class="section-inside clearfix">
        <router-view></router-view>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import Util from '../Util'
  export default {
    data () {
      return {
        timeInfo: null,
        currentPathName: '',
        currentPathNameParent: ''
      }
    },
    created () {
      this.fetchData()
      this.timeClock()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      timeClock () {
        setInterval(() => {
          this.timeInfo = Util.format(new Date())
        }, 1000)
      },
      fetchData () {
        this.currentPathName = this.$route.name
        console.log(this.$route)
        this.currentPathNameParent = this.$route.matched[0].name
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../static/styles/variable";

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
</style>
