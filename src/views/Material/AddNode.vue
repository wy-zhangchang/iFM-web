<style>

</style>

<template>
  <Modal v-model="modal1" title="新增节点">
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
        treeNodeId:'',
        treeNodeLevel:''
      }
    },
    methods:{
      open(treeNodeId, treeNodeLevel){
        this.treeNodeId = treeNodeId
        this.treeNodeLevel = treeNodeLevel
        this.modal1 = true
      },
      ok(){
        const {treeNodeLevel, treeNodeId, value} = this
        if(treeNodeLevel == 1){
          this.$store.dispatch('getMaterialtype_update', {id:treeNodeId, name:value})
        }else if(treeNodeLevel == 0){
          this.$store.dispatch('getMaterialtype_add', {id:treeNodeId, name:value})
        }
        // 获取服务器返回的id
        this.$emit('addNode', treeNodeId, value)
        this.modal1 = false
      },
      cancel(){
        this.modal1 = false
      }
    }
  }
</script>
