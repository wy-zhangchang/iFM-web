<template>
  <Card :padding="0">
    <!-- 头部区 -->
    <div class="supplier-top">
      <h3 style="padding: 20px; font-size: 18px; font-weight: normal; border-bottom: 1px solid #ddd;">新建供应商服务</h3>
    </div>
    <!-- 内容区 -->
    <div class="supplier-middle" style="margin: 30px 0; padding: 0 80px;">
      <!-- 步骤栏 -->
      <div class="middle-top" style="margin: 50px 0">
        <Steps :current="curr">
          <Step title="步骤一" content="填写基本信息" style="width: 29%"></Step>
          <Step title="步骤二" content="添加服务项" style="width: 29%"></Step>
          <Step title="步骤三" content="定义服务等级" style="width: 30%"></Step>
          <Step title="步骤四" content="添加供应商" style="width: 12%"></Step>
        </Steps>
      </div>
      <!-- 数据栏 -->
      <div class="middle-bottom">
        <router-view></router-view>
      </div>
    </div>
    <!-- 底部区 -->
    <div class="supplier-bottom" style="padding: 30px 0; text-align: center; border-top: 1px solid #ddd">
      <Button type="ghost" @click="prev" v-if="curr" style="margin-right: 100px">返回上一步</Button>
      <Button type="primary" @click="next" v-if="curr===3">&nbsp;&nbsp;&nbsp;&nbsp;完&nbsp;&nbsp;成&nbsp;&nbsp;&nbsp;&nbsp;</Button>
      <Button type="primary" @click="next" v-else>&nbsp;&nbsp;&nbsp;&nbsp;下一步&nbsp;&nbsp;&nbsp;&nbsp;</Button>
    </div>
  </Card>
</template>

<script>
  export default{
    data () {
      return {
        curr:0,
      }
    },
    methods:{
      next(){
        if(this.curr === 3){
          this.$router.replace('/organization/post/addsupplier/success')
          return
        }else{
          switch (this.curr) {
            case 0:
              this.$router.replace('/organization/post/addsupplier/steptwo')
              break
            case 1:
              this.$router.replace('/organization/post/addsupplier/stepthree')
              break
            case 2:
              this.$router.replace('/organization/post/addsupplier/stepfour')
              break
          }
          this.curr ++
        }
      },
      prev(){
        if(this.curr === 0){
          return
        }else{
          switch (this.curr) {
            case 3:
              this.$router.replace('/organization/post/addsupplier/stepthree')
              break
            case 2:
              this.$router.replace('/organization/post/addsupplier/steptwo')
              break
            case 1:
              this.$router.replace('/organization/post/addsupplier/stepone')
              break
          }
          this.curr --
        }
      }
    }
  }
</script>

<style>
  .ivu-steps .ivu-steps-content{
    font-size: 14px;
  }
  .ivu-steps .ivu-steps-title{
    font-size: 15px;
  }
  .ivu-form .ivu-form-item-label{
    font-size: 14px;
  }
</style>
