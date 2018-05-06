<template>
  <div class="content-top">
    <div class="content-top-left">
      <Button type="primary" @click="add">新&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;增</Button>
      <Button type="ghost" @click="delBatch">批量删除</Button>
    </div>
    <div class="content-top-right">
      <AutoComplete
        v-model="value1"
        :data="data1"
        @on-search="handleSearch1"
        placeholder="请输入搜索关键字"
        icon="ios-search"
        style="width:400px"></AutoComplete>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        value1:'',
        data1:[]
      }
    },
    methods:{
      add(){
          // 编程式跳转路由
          this.$router.replace('/organization/post/addsupplier')
      },
      handleSubmit(){
        this.$emit('handleSubmit', this.user)
        this.modal1 = false
      },
      handleCancel(){
        this.modal1 = false
      },
      delBatch(){
        this.$Modal.confirm({
          title:'批量删除',
          content:`确定要批量删除信息吗?`,
          onOk:()=>{
            this.$emit('handleDelBatch')
          },
          onCancel:()=>{
            return
          }
        })
      },
      handleSearch1 (value) {
        this.$emit('handleSearch', value)
//        this.data1 = !value ? [] : [
//          value,
//          value + value,
//          value + value + value
//        ]
      }
    }
  }
</script>

<style scoped>
  .content-top{
    display: flex;
    justify-content: space-between;
  }
</style>
