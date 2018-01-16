<!-- 
  @user slipkinem
  @date 5/19/2017
 -->
<template>
  <el-form ref="postForm" :rules="rules" :model="postForm" label-width="80px">
    <el-form-item label="标题" prop="title">
      <el-col :span="6">
        <el-input type="text" v-model="postForm.postTitle" placeholder="文章标题"/>
      </el-col>
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <el-col :span="22">
        <div ref="editor"></div>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="success" @click="submit">提交</el-button>
      <el-button type="error" @click="clear">清除</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Vue, Component } from '../../ext-nb'
import { IPage } from '../../typings/page'
import E from 'wangeditor'

@Component
export default class PostComponent extends Vue {
  postForm = {
    postContent: '',
    postTitle: ''
  }
  page: IPage = {
    pageNum: 1,
    pageSize: 10
  }
  rules = {
    postTitle: [{ required: true, min: 3, max: 30, message: '长度在3-30之间', trigger: 'blur' }],
    postContent: [{ required: true, message: '必须填写', trigger: 'blur' }]
  }

  mounted () {
    let editor = new E(this.$refs.editor)
    editor.customConfig.onchange = (html: string) => {
      this.postForm.postContent = html
    }
    editor.create()
  }

  clear () {
    this.postForm = {
      postTitle: '',
      postContent: ''
    }
  }

  submit () {
    this.$http.post('/post', this.postForm)
        .then(res => {
          this.$message.success(res.errorMessage)
          this.clear()
        })
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