<!-- 
  @user slipkinem
  @date 2017/4/6
 -->
<template>
  <div class="container">
    <header>
    </header>

    <section>
      <el-form ref="form" :label-position="'top'" label-width="100px">

        <el-form-item label="登录名">
          <el-input v-model="user.userCode" placeholder="登录名"></el-input>
        </el-form-item>

        <el-form-item label="用户名">
          <el-input v-model="user.username" placeholder="用户名"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="user.password" placeholder="密码" type="password"></el-input>
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

<script>
  import {Message} from 'element-ui'

  export default {
    data () {
      return {
        user: {}
      }
    },

    methods: {
      register () {
        console.log(this.user)
        this.$http.post('api/user/register', this.user)
          .then(response => {
            console.log(response)
            let responseBody = response.body
            if (responseBody.errorCode === 0) {
              Message.success('注册成功')
              this.$router.push({
                path: 'login'
              })
            } else {
              Message.error(responseBody.errorMessage + '')
            }
          })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
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