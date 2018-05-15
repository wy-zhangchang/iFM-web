<template>
  <div>
    <Table border ref="selection" :columns="columns4" :data="materiallists"></Table>
    <DelItem ref="delItem" :pId="pId"></DelItem>
    <EditItem ref="editItem" :pId="pId"></EditItem>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import DelItem from './DelItem.vue'
  import EditItem from './EditItem.vue'

  export default{
    props:{
      pId:Number
    },
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
                      this.update(params.row)
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
                      this.delete(params.row.id)
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
    },
    methods:{
      delete(cId){
        this.$refs.delItem.open(cId)
      },
      update(item){
        this.$refs.editItem.open(item)
      }
    },
    components:{
      DelItem,
      EditItem
    }
  }
</script>

<style>

</style>
