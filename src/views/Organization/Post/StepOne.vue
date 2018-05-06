<template>
  <div>
    <Form :model="supplier" :label-width="100" style="width: 60%; margin: 0 auto">
      <FormItem label="服务编号">
        <!-- 输入框 -->
        <Input v-model="supplier.number" placeholder="请输入"></Input>
      </FormItem>
      <FormItem label="服务名称">
        <Input v-model="supplier.name" placeholder="请输入"></Input>
      </FormItem>
      <FormItem label="服务简介">
        <Input v-model="supplier.desc" placeholder="请输入"></Input>
      </FormItem>
      <FormItem label="管理对象">
        <!-- 多选模式 -->
        <Select v-model="supplier.objs" multiple>
          <Option value="beijing">New York</Option>
          <Option value="shanghai">London</Option>
          <Option value="shenzhen">Sydney</Option>
        </Select>
      </FormItem>
      <FormItem label="所属财务科目">
        <!-- 单选模式 -->
        <Select v-model="supplier.finance">
          <Option value="beijing">New York</Option>
          <Option value="shanghai">London</Option>
          <Option value="shenzhen">Sydney</Option>
        </Select>
      </FormItem>
      <FormItem label="所属内部服务">
        <!-- 单选模式 -->
        <Select v-model="supplier.inner">
          <Option value="beijing">New York</Option>
          <Option value="shanghai">London</Option>
          <Option value="shenzhen">Sydney</Option>
        </Select>
      </FormItem>
      <!-- 单选按钮 -->
      <FormItem label="状态控制">
        <RadioGroup v-model="supplier.status">
          <Radio label="正常"></Radio>
          <Radio label="暂停"></Radio>
        </RadioGroup>
      </FormItem>
      <!-- 文本域 -->
      <FormItem label="服务范围描述">
        <Input v-model="supplier.scope" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入"></Input>
      </FormItem>
      <FormItem label="包含项描述">
        <Input v-model="supplier.include" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入"></Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        supplier:{
          number:'',
          name:'',
          desc:'',
          objs:[],
          finance:'',
          inner:'',
          status:'',
          scope:'',
          include:''
        }
      }
    }
  }
</script>

<style>

</style>
