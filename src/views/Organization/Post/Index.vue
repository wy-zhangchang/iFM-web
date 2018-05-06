<template>
  <Card>
    <!-- 搜索 -->
    <Search
      @handleSubmit="handleSubmit"
      @handleDelBatch="handleDelBatch"
      @handleSearch="handleSearch">
    </Search>
    <!-- 表格 -->
    <Table
      @updateSelected="updateSelected"
      :data1="data1"
      @handleUpdate="handleUpdate"
      @handleDelete="handleDelete">
    </Table>
    <!-- 分页 -->
    <Page
      :page="page"
      @handleChange="handleChange"
      @handleSizeChange="handleSizeChange">
    </Page>
  </Card>
</template>

<script>

  // 引入组件
  import Search from '../../../components/Search/Search.vue'
  import Table from '../../../components/Table/Table.vue'
  import Page from '../../../components/Page/Page.vue'

  // 2.引入mapState
  import { mapState } from 'vuex'

  export default{
    data(){
      return {
        page:{
          total:0,
          current:1,
          pagesize:10
        },
        data1:[],
        tempData:[],  // 缓存数据
        selected:[]   // 缓存多选记录
      }
    },
    // 3.获取数据
    computed:{
      ...mapState(['dataList'])
    },
    // 生命周期方法
    mounted(){
      // 1.异步请求服务器
      this.$store.dispatch('getOrganization')
      // 默认加载10条记录
      // 缓存后台数据
      setTimeout(()=>{
        // 延时调用，解决发送请求与响应数据的时间差，执行过程太快，导致数据获取时机不对！
        this.initData()
      }, 200)
    },
    updated(){
      // 根据用户指定方式加载记录条数
      // 实时监测记录总数
      this.page.total = this.tempData.length
      // console.log(this.page.current)
      // TODO 注意：千万别在此方法内做页面显示记录数实时监测，后果死循环！
    },
    methods:{
      // 初始化数据
      initData(){
        this.tempData = this.dataList // ...mapState(['dataList'])
        this.data1 = this.dataList.slice(0, 10)
        this.page.total = this.tempData.length
      },
      // 添加记录
      handleSubmit(user){
        const {name, age, address} = user
        this.tempData.unshift({name, age, address})
        // 添加记录完成，重置为第一页
        this.page.current = 1
        this.resetData()
      },
      // 切换当前页
      handleChange(curr){
        // 重置当前页为用户所点击的页
        this.page.current = curr
        this.resetData()
      },
      // 切换每页显示的记录数
      handleSizeChange(size){
        // 重置每页显示的记录数为用户选择的记录数
        // TODO 注意：此事件触发后，iview组件内部自动将当前页改变为第1页
        this.page.pagesize = size
        this.resetData()
      },
      // 修改记录
      handleUpdate(user){
        const {name, age, address, index} = user
        this.tempData.splice(user.index, 1, {name, age, address, index})
        this.resetData()
      },
      // 删除记录
      handleDelete(index){
        for(var i=0; i<this.tempData.length; i++){
          if(this.tempData[i].index == index){
            this.tempData.splice(i, 1)
          }
        }
        this.resetData()
      },
      // 缓存多选记录
      updateSelected(selected){
        this.selected = selected
      },
      // 批量删除记录
      handleDelBatch(){
        for(var i=this.selected.length-1; i>=0; i--){
          for(var j=this.tempData.length-1; j>=0; j--){
            if(this.tempData[j].index == this.selected[i].index){
              this.tempData.splice(j, 1)
              break
            }
          }
        }
        this.resetData()
      },
      // 重置分页数据
      resetData(){
        const {current, pagesize} = this.page
        this.data1 = this.tempData.slice((current-1)*pagesize, current*pagesize)
      },
      // 匹配搜索关键字的记录
      handleSearch(value){
        // 使用filter + indexOf实现关键字匹配
        this.tempData = this.dataList.filter((item)=>{
           // 返回匹配条件为true的记录
           return item.name.indexOf(value) != -1
        })
        this.resetData()
      }
    },
    components:{  // 注册组件
      Search,
      Table,
      Page
    }
  }
</script>

<style>

</style>
