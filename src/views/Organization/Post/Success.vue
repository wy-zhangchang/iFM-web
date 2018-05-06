<template>
  <Card :padding="0">
    <!-- 头部区 -->
    <div class="supplier-top">
      <h3 style="padding: 20px; font-size: 18px; font-weight: normal; border-bottom: 1px solid #ddd;">新建供应商服务</h3>
    </div>
    <!-- 内容区 -->
    <div class="supplier-middle" style="margin: 30px 0; padding: 0 80px; text-align: center">
      <img style="margin-top: 120px;" src="/static/images/done.png" height="100" width="100" alt="">
      <h2 style="font-size: 22px; margin: 30px 0;">添加成功</h2>
      <p style="font-size: 16px; color: #ddd; margin-bottom: 120px">您成功添加供应商服务 木制家具维修（EPS151368135433）</p>
    </div>
    <!-- 底部区 -->
    <div class="supplier-bottom" style="padding: 30px 0; text-align: center; border-top: 1px solid #ddd">
      <Button type="ghost" @click="prev" style="margin-right: 100px">返回列表</Button>
      <Button type="primary" @click="next">查看服务</Button>
    </div>
  </Card>
</template>

<script>
  import done from '../../../common/images/done.png'
  export default{
    methods:{
      prev(){
        this.$router.replace('/organization/post/index')
      },
      next(){

      }
    }
  }
</script>

<style>

</style>
