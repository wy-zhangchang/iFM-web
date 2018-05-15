<style>

</style>

<template>
  <Modal v-model="modal1" title="编辑物料">
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
    props:{
      pId:Number
    },
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
      open(item){
        this.modal1 = true
        this.item = item
      },
      ok(){
        const {id, name, brand, unit} = this.item
        this.$store.dispatch('getMateriallist_mod', {pId:this.pId, id:id, name:name, brand:brand, unit:unit})
        this.$store.dispatch('getMateriallist', {id:this.pId})
        this.modal1 = false
      },
      cancel(){
        this.modal1 = false
      }
    }
  }
</script>
