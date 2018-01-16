<!-- 
  @user slipkinem
  @date 2017/4/6
 -->
<template>
  <div class="container">
    <header></header>

    <section>
      <el-form ref="form" :label-position="'top'" label-width="100px">

        <el-form-item label="登录名">
          <el-input v-model="user.userCode" placeholder="登录名"/>
        </el-form-item>

        <el-form-item label="用户名">
          <el-input v-model="user.username" placeholder="用户名"/>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="user.password" placeholder="密码" type="password"/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </section>

    <footer>
    </footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from '../../ext-nb'

@Component
export default class RegisterComponent extends Vue {

  user = {
    userCode: '',
    password: '',
    username: ''
  }


  register () {
    this.$http.post('/user/register', this.user)
        .then(response => {
          this.$message.success('注册成功')
          this.$router.push('/home')
        })
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .container {
    header {
      padding-top: 100px;
    }

    section {
      width: 400px;
      margin: 0 auto;
    }

    footer {
      padding-bottom: 200px;
    }

  }
</style>