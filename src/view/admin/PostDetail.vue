<!-- 
  @user slipkinem
  @date 5/22/2017
 -->
<template>
  <div class="post">
    <h2>{{post.postTitle}}</h2>
    <div v-html="post.postContent"></div>
    <div class="send-message">
      <el-form label-width="0" ref="postDetail" :model="postDetail">
        <el-form-item>
          <el-col :span="16">
            <el-input type="textarea" v-model="postDetail.commentContent" placeholder="觉得好的话，给留个言呗"
                      :rows="5"/>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-rate v-model="postDetail.commentRate" show-text/>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="4">
            <el-button type="primary" @click="submitCommentMessage">留言</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <div class="message-board" v-if="comments.length !== 0" v-for="comment in comments">
      <el-row>
        <el-col :span="2"><span class="message-board-author">{{comment.username}}</span></el-col>
        <el-col :span="14"><span class="message-board-content">{{comment.commentContent}}</span></el-col>
        <el-col :span="4">
          <el-rate v-model="comment.commentRate" show-text text-color="#ff9900" text-template="{value}" disabled/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from '../../ext-nb'

interface IPostDetail {
  postTitle: string
  postContent: string
}

interface IComments {
}

@Component
export default class PostDetailComponent extends Vue {

  comments: IComments[] = []
  postDetail = {
    commentRate: 0,
    commentContent: '',
    postId: '',
    createTime: 0
  }
  post: IPostDetail = {
    postTitle: '',
    postContent: ''
  }
  postId = ''
  username = ''

  created () {
    this.postId = this.$route.params.postId
    this.getPostById(this.postId)
    this.getCommentByPostId(this.postId)
  }

  getPostById (postId: string) {
    this.$http.get<IPostDetail>('/post/' + postId)
        .then(res => {
          this.post = res.data
        })
  }

  getCommentByPostId (postId: string) {
    this.$http.get<IComments[]>('/comment/' + postId)
        .then(res => {
          this.comments = res.data
        })
  }

  /**
   * 新添加一个留言
   */
  submitCommentMessage () {
    this.postDetail.postId = this.postId
    this.postDetail.createTime = new Date().getTime()

    this.$http.post('/comment', this.postDetail)
        .then(res => {
          this.getCommentByPostId(this.postId)
        })
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .send-message {
    margin-top: 50px;
    background-color: #eeeeee;
    padding: 20px;
  }

  .message-board {
    margin-top: 20px;
    border-bottom: 1px solid #eee;
    .message-board-author {
      color: #ff00ff;
      font-weight: bold;
    }
    .message-board-content {
      color: #0082e6;
    }
  }
</style>