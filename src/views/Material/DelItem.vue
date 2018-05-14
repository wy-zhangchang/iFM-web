<style>
  .ivu-alert-warning .ivu-alert-icon > i.ivu-icon-android-alert{
    font-size: 30px;
  }
</style>
<template>
  <Modal v-model="modal1" title="删除物料">
        <Alert type="warning" show-icon>
          删除物料之后将无法恢复，
          <template slot="desc">
            你确定要继续吗?
          </template>
        </Alert>
      <div slot="footer">
        <Button type="primary" @click="ok()">确&emsp;定</Button>
        <Button type="ghost" @click="cancel()">取&emsp;消</Button>
      </div>
    <!-- 注：将slot中的元素置为空，作用是隐藏默认的底部按钮 -->
    <!--<div slot="footer"></div>-->
  </Modal>
</template>
<script>
  export default {
    props:{
      pId:Number
    },
    data () {
      return {
        modal1: false,
        cId:0
      }
    },
    methods: {
      open(cId){
        this.cId = cId
        this.modal1 = true
      },
      ok(){
        const {pId, cId} = this
        this.$store.dispatch('getMateriallist_del', {pId, cId})
        this.$store.dispatch('getMateriallist', {id:pId})
        this.modal1 = false
      },
      cancel(){
        this.modal1 = false
      }
    }
  }
</script>
