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
      <Form :model="supplier" :label-width="100" style="width: 600px; margin: 0 auto">
        <FormItem label="服务名称">
          <Input type="text" v-model="supplier.name"></Input>
        </FormItem>
        <FormItem label="服务编号">
          <Input type="text" v-model="supplier.number"></Input>
        </FormItem>
        <FormItem label="计费单位">
          <Input type="text" v-model="supplier.unit"></Input>
        </FormItem>
        <FormItem label="计价方式">
          <Select v-model="supplier.mode">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="最小计价数">
          <InputNumber :max="10" :min="1" v-model="supplier.count"></InputNumber>
        </FormItem>
        <FormItem label="单价">
          <Input type="text" v-model="supplier.price"></Input>
        </FormItem>
        <FormItem label="必须包含">
          <RadioGroup v-model="supplier.status">
            <Radio label="是"></Radio>
            <Radio label="否"></Radio>
          </RadioGroup>
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
          name:'',
          number:'',
          unit:'',
          mode:'',
          count:0,
          price:'',
          status:''
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
