<template>
  <div class="content-middle">
    <Table border ref="selection" @on-selection-change="selected" :columns="columns" :data="data1"></Table>
    <Modal
      v-model="modal2"
      title="编辑">
      <Form :model="user" :label-width="80">
        <FormItem label="姓名">
          <Input type="text" v-model="user.name"></Input>
        </FormItem>
        <FormItem label="年龄">
          <Input type="text" v-model="user.age" number></Input>
        </FormItem>
        <FormItem label="地址">
          <Input type="text" v-model="user.address"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="handleUpdate">确定</Button>
        <Button type="ghost" @click="handleCancel" style="margin-left: 8px">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<style>
  .ivu-table-header th{
    text-align: center;
  }
  .ivu-table-cell{
    text-align: center;
  }
  .ivu-table-cell > span{
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ivu-form .ivu-form-item-label{
    font-size: 14px;
  }
  .ivu-icon.ivu-icon-help-circled{
    font-size: 36px;
  }
</style>

<script>
  export default{
    props:{
      data1:Array
    },
    data () {
      return {
//        current:0,
        modal2:false,
//        modal1:false,
        user:{
          name:'',
          age:'',
          address:'',
          index:''
        },
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '名称/编号/简介',
            key: 'title'
          },
          {
            title: '供应商数量',
            key: 'suppliercounts'
          },
          {
            title: '正常提供',
            key: 'status_name'
          },
          {
            title: '服务地域',
            key: 'supplierArea'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
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
                      this.delete(params.row)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ]
      }
    },
    methods:{
//      next () {
//        if (this.current == 3) {
//          this.current = 0;
//        } else {
//          this.current += 1;
//        }
//      },
      selected(user){
        this.$emit('updateSelected', user)
      },
      update(row){
        this.modal2 = true
//        this.modal1 = true
        let {user} = this
        user.name = row.name
        user.age = row.age
        user.address = row.address
        user.index = row.index
      },
      delete(row){
        this.$Modal.confirm({
          title:'删除',
          content:`确定要删除 ${row.name} 的信息吗?`,
          onOk:()=>{
            this.$emit('handleDelete', row.index)
          },
          onCancel:()=>{
            return
          }
        })
      },
      handleUpdate(){
        this.$emit('handleUpdate', this.user)
        this.modal2 = false
      },
      handleCancel(){
        this.modal2 = false
      }
    }
  }
</script>

<style scoped>
  .content-middle{
    margin: 15px 0 30px;
  }
</style>
