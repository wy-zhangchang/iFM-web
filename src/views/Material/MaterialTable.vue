<template>
  <Table border ref="selection" :columns="columns4" :data="materiallists"></Table>
</template>

<script>
  import {mapState} from 'vuex'
  export default{
    data(){
      return{
        // 表格数据
        columns4: [
          {
            title:'序号',
            type: 'index',
            width: 80,
            align: 'center'
          },
          {
            title: '物理名称',
            key: 'name'
          },
          {
            title: '规格',
            key: 'unit'
          },
          {
            title: '品牌',
            key: 'brand'
          },
          {
            title: '操作',
            key: 'action',
            render: (h, params) => {
              return h('div', [
                h('a', {
                  style: {
                    marginRight: '10px',
                    fontSize:'14px'
                  },
                  on: {
                    click: () => {
//                      this.update(params.row)
                    }
                  }
                }, '编辑'),
                h('a', {
                  style:{
                    fontSize:'14px',
                    color:'#f00'
                  },
                  on: {
                    click: () => {
//                      this.delete(params.row)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ]
      }
    },
    computed:{
      ...mapState(['materiallists'])
    }
  }
</script>

<style>

</style>
