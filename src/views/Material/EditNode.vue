<style>

</style>

<template>
  <Modal v-model="modal1" title="编辑节点">
    <Form :label-width="80">
      <FormItem label="节点名称" style="margin-bottom: 0">
        <Input v-model="value" placeholder="请输入节点名称"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="ok">确定</Button>
      <Button type="ghost" @click="cancel">取消</Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    data(){
      return{
        modal1:false,
        value:'',
        treeNodeId:''
      }
    },
    methods:{
      open(treeNodeId, treeNodeName){
        this.treeNodeId = treeNodeId
        this.value = treeNodeName
        this.modal1 = true
      },
      ok(){
        this.$emit('editNode', this.treeNodeId, this.value)
        this.modal1 = false
      },
      cancel(){
        this.modal1 = false
      }
    }
  }
</script>
