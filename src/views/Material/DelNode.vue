<style>
  .ivu-alert-warning .ivu-alert-icon > i.ivu-icon-android-alert{
    font-size: 30px;
  }
</style>
<template>
  <Modal v-model="modal1" title="删除节点">
        <Alert type="warning" show-icon>
          删除节点之后将无法恢复，
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
    data () {
      return {
        modal1: false,
        treeNodeId:''
      }
    },
    methods: {
      open(treeNodeId){
        this.treeNodeId = treeNodeId
        this.modal1 = true
      },
      ok(){
        this.$emit('delNode', this.treeNodeId)
        this.modal1 = false
      },
      cancel(){
        this.modal1 = false
      }
    }
  }
</script>
