<template>
  <div>
    <!-- 搜索 -->
    <div class="bottom-t">
      <Button type="primary" @click="add">新&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;增</Button>
      <Button type="ghost">批量删除</Button>
    </div>
    <!-- 表格 -->
    <div class="bottom-m" style="margin: 15px 0 30px">
      <Table border ref="selection" :columns="columns4" :data="data1"></Table>
    </div>
    <!-- 分页 -->
    <div class="bottom-b" style="text-align: right">
      <Page :total="100" show-elevator show-sizer></Page>
    </div>
    <!-- 新增对话框 -->
    <Modal
      :width="900"
      v-model="modal1"
      title="新增">
      <Form :model="supplier" :label-width="100" style="width: 700px; margin: 0 auto">
        <FormItem label="供应商">
          <Row>
            <Col span="20">
              <Select v-model="supplier.supp">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="提供服务分支">
          <Row>
            <Col span="20">
              <Input type="text" v-model="supplier.branch"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="服务级别">
          <Row>
            <Col span="20">
              <Input type="text" v-model="supplier.grade"></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem label="提供服务分支">
          <Row>
            <Col span="20">
              <Input type="text" v-model="supplier.branch"></Input>
            </Col>
            <Col span="4">
              <a style="display: inline-block; color: red; padding: 0 12px">删除</a>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="服务级别">
          <Row>
            <Col span="20">
              <Input type="text" v-model="supplier.grade"></Input>
            </Col>
            <Col span="4">
              <a style="display: inline-block; color: red; padding: 0 12px">删除</a>
            </Col>
          </Row>
        </FormItem>

        <FormItem>
          <Button style="width: 83%" type="primary" long icon="plus-round">新增指标组</Button>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="handleSubmit">确定</Button>
        <Button type="ghost" @click="handleCancel" style="margin-left: 8px">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        modal1:false,
        supplier:{
          supp:'',
          branch:'',
          grade:''
        },
        columns4: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: 'Name',
            key: 'name'
          },
          {
            title: 'Age',
            key: 'age'
          },
          {
            title: 'Address',
            key: 'address'
          }
        ],
        data1: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          }
        ]
      }
    },
    methods:{
      add(){
        this.modal1 = true
      },
      handleSubmit(){

      },
      handleCancel(){

      }
    }
  }
</script>

<style>

</style>
