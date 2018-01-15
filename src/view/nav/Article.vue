<!-- 
  @user slipkinem
  @date 5/19/2017
 -->
<template>
  <section>
    <div class="post" v-for="post in posts">
      <el-row>
        <el-col :span="12">
          <h2 class="post-title">
            <router-link :to="{path: '/home/post-detail/', query: {postId: post.postId}}" class="post-title-href">{{post.postTitle}}</router-link>
          </h2>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="22">
          <div class="post-content">
            {{post.postContent}}
          </div>
        </el-col>
      </el-row>
    </div>
  </section>

</template>

<script>
  export default {
    data () {
      return {
        page: {
          currentPage: 1,
          pageSize: 10
        },
        posts: {}
      }
    },
    created () {
      this.getPosts()
    },
    methods: {
      getPosts () {
        this.$http.get('/api/post/all', this.page)
          .then(res => {
            let body = res.body
            if (body.errorCode === 0) {
              this.posts = body.posts
            } else {
              this.$message.error(body.errorMessage)
            }
          })
          .catch(e => this.$message.error(e.message))
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .post {
    background: #d2ecff;
    border-radius: 10px;
    margin-bottom: 30px;

    .post-title {
      text-align: center;
      .post-title-href {
        text-decoration: none;
        color: #000;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .post-content {
      padding: 20px;

    }
  }
</style>