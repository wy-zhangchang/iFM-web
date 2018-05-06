<template>
  <div class="content-bottom">
    <Page
      :total="page.total"
      :current="page.current"
      :page-size="page.pagesize"
      show-sizer
      show-total
      @on-change="handleChange"
      @on-page-size-change="handleSizeChange"
    ></Page>
  </div>
</template>

<script>
  export default{
    props:{
      page:Object
    },
    methods:{
      handleChange(curr){
        this.$emit('handleChange', curr)
      },
      handleSizeChange(size){
        this.$emit('handleSizeChange', size)
      }
    }
  }
</script>

<style scoped>
  .content-bottom{
    text-align: right;
  }
</style>
