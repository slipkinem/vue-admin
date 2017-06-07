<template>
  <div class="container">
    <header>
    </header>

    <section>
      <el-form ref="form" :label-position="'top'" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="user.userCode" placeholder="用户名"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="user.password" placeholder="密码" type="password"></el-input>
        </el-form-item>

        <el-form-item label="验证码">
          <el-input v-model="user.captcha" placeholder="验证码"></el-input>
        </el-form-item>

        <el-form-item>
          <img style="width: 100px;height: 30px;" :src="imgCaptchaSrc" alt="验证码">
          <span style="cursor: pointer" @click="loginCaptcha">换一张</span>
        </el-form-item>

        <el-form-item>
          <el-button type="success" @click="login">登录</el-button>
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
        user: {},
        imgCaptchaSrc: ''
      }
    },
    created () {
      this.loginCaptcha()
    },
    methods: {
      login () {
        console.log('user', this.user)
        this.$http.post('api/user/login?captcha=' + this.user.captcha, this.user)
          .then(response => {
            let responseBody = response.body
            if (responseBody.errorCode === 0) {
              Message.success('验证成功')
              this.$router.push({
                path: 'home/table'
              })
            } else {
              Message.error(responseBody.errorMessage)
            }
          })
      },
      loginCaptcha () {
        let timestamp = ~new Date()
        this.imgCaptchaSrc = 'api/user/loginVerifyCode?timestamp=' + timestamp
      },

      register () {
        this.$router.push({
          path: '/register'
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
