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
            <router-link :to="{path: '/home/article/' + post.postId}" class="post-title-href">
              {{post.postTitle}}
            </router-link>
          </h2>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="22">
          <div class="post-content" v-html="xss(post.postContent)"></div>
        </el-col>
      </el-row>
    </div>
  </section>

</template>

<script lang="ts">
import { Vue, Component } from '../../ext-nb'
import { IResultPage } from '../../typings/page'
import xss from 'xss'

interface Article {
  id: string
}

@Component
export default class ArticleComponent extends Vue {

  page = {
    pageNum: 1,
    pageSize: 100000
  }
  posts: Article[] = Object.create(null)

  xss = xss

  created () {
    this.getPosts()
  }

  async getPosts () {
    try {
      const res = await this.$http.get<IResultPage<Article[]>>('/post', this.page)
      this.posts = res.data.rows
    } catch (e) {
      console.error(e)
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