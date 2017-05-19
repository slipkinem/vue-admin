<!-- 
  @user slipkinem
  @date 5/19/2017
 -->
<template>
  <section>
    <div class="post">
      <el-row>
        <el-col :span="12">
          <h2 class="post-title">
            这是文章的标题
          </h2>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="22">
          <div class="post-content">
            这是文章的内容
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="post">
      <el-row>
        <el-col :span="12">
          <h2 class="post-title">
            这是文章的标题
          </h2>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="22">
          <div class="post-content">
            这是文章的内容
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="post">
      <el-row>
        <el-col :span="12">
          <h2 class="post-title">
            这是文章的标题
          </h2>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="22">
          <div class="post-content">
            这是文章的内容
          </div>
        </el-col>
      </el-row>
    </div>
  </section>


</template>

<script>
  export default {}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .post {
    background: #d2ecff;
    border-radius: 10px;

    .post-title {
      text-align: center;
    }
    .post-content {
      padding: 20px;

    }
    margin-bottom: 30px;
  }
</style>