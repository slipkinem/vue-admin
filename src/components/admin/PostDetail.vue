<!-- 
  @user slipkinem
  @date 5/22/2017
 -->
<template>
  <div class="post">
    <h2>{{post.postTitle}}</h2>
    <p>{{post.postContent}}</p>
    <div class="send-message">
      <el-form label-width="0" ref="postDetail" :model="postDetail">
        <el-form-item>
          <el-col :span="16">
            <el-input type="textarea" v-model="postDetail.commentContent" placeholder="觉得好的话，给留个言呗"
                      :rows="5" />
          </el-col>
          <el-col :span="4" :offset="1">
            <el-rate v-model="postDetail.commentRate" show-text />
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
          <el-rate v-model="comment.commentRate" show-text text-color="#ff9900" text-template="{value}" disabled />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        comments: [],
        postDetail: {
          commentRate: 0,
          commentContent: '',
          postId: 0
        },
        post: {
          postTitle: '',
          postContent: ''
        },
        postId: 0,
        username: ''
      }
    },
    created () {
      this.postId = this.$route.query.postId
      this.getPostById(this.postId)
      this.getCommentByPostId(this.postId)
    },
    methods: {
      getPostById (postId) {
        this.$http.get('/api/post/' + postId)
          .then(res => {
            this.post = res.body.post
          })
          .catch(e => this.$message.error(e.message))
      },
      getCommentByPostId (postId) {
        this.$http.get('/api/comment/' + postId)
          .then(res => {
            this.comments = res.body.comments
          })
      },
      submitCommentMessage () {
        this.postDetail.postId = this.postId
        this.postDetail.createTime = new Date().getTime()
        this.$http.post('/api/comment/new', this.postDetail)
          .then(res => {
            if (res.body.errorCode === 0) {
              this.getCommentByPostId(this.postId)
            } else {
              this.$message.error(res.body.errorMessage)
            }
          })
          .catch(e => {
            throw e
          })
        console.log(this.postDetail)
      }
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