<style>

</style>

<template>
  <Modal v-model="modal1" title="新增物料">
    <Form :label-width="80" v-model="item">
      <FormItem label="物料名称" style="margin-bottom: 0">
        <Input v-model="item.name" placeholder="请输入物料名称"></Input>
      </FormItem>
      <FormItem label="规格" style="margin: 20px 0">
        <Input v-model="item.unit" placeholder="请输入规格"></Input>
      </FormItem>
      <FormItem label="品牌" style="margin-bottom: 0">
        <Input v-model="item.brand" placeholder="请输入品牌"></Input>
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
        item:{
          name:'',
          brand:'',
          unit:'',
          id:''
        }
      }
    },
    methods:{
      open(id){
        this.modal1 = true
        this.item.id = id
      },
      ok(){
        const {id, name, brand, unit} = this.item
        this.$store.dispatch('getMateriallist_add', {id, name, brand, unit})
        this.$store.dispatch('getMateriallist', {id:id})
        this.modal1 = false
      },
      cancel(){
        this.modal1 = false
      }
    }
  }
</script>
