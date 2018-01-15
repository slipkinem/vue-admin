<!-- 
  @user slipkinem
  @date 5/19/2017
 -->
<template>
  <el-form ref="postForm" :rules="rules" :model="postForm" label-width="80px">
    <el-form-item label="标题" prop="title">
      <el-col :span="6">
        <el-input type="text" v-model="postForm.title" placeholder="文章标题"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <el-col :span="22">
        <el-input type="textarea" placeholder="文章内容" v-model="postForm.content" :rows="10"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="success" @click="submit">提交</el-button>
      <el-button type="error" @click="clear">清除</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data () {
      return {
        postForm: {},
        page: {
          currentPage: 1,
          pageSize: 10
        },
        rules: {
          title: [
            {
              required: true, min: 3, max: 30, message: '长度在3-30之间', trigger: 'blur'
            }
          ],
          content: [
            {
              required: true, message: '必须填写', trigger: 'blur'
            }
          ]
        }
      }
    },
    created () {
      console.log(this.$refs)
    },
    methods: {
      clear () {
        this.postForm = {
          title: '',
          content: ''
        }
      },
      submit () {
        this.$http.post('api/post/new', {
          postContent: this.postForm.content,
          postTitle: this.postForm.title
        })
          .then(res => {
            console.log(res)
            if (res.body.errorCode === 0) {
              this.$message.success(res.body.errorMessage)
              this.clear()
            } else {
              this.$message.error(res.body.errorMessage)
            }
          })
          .catch(e => {
            this.$message.error(e.message)
            throw e
          })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .post-title {
    color: #00ff00;
  }

  .post-content {
    color: #0082e6;
  }
</style>