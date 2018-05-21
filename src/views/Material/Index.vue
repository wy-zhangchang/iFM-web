<style scoped>
  .left{
    height: 600px;
    width: 25%;
    border: 1px solid #ddd;
    float: left;
    padding: 0 6px;
    overflow-y: auto;
  }
  .right{
    height: 600px;
    width: 75%;
    border:1px solid #ddd;
    margin-left: 25%;
    padding: 0 10px;
  }
  .top{
    margin: 15px 0;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
  }
  .bot{
    margin: 15px 0;
    text-align: right;
  }
  .t{
    margin: 15px 0 0;
  }
</style>
<style>
  /* 隐藏图标 */
  .ztree li span.button.ico_close,
  .ztree li span.button.ico_open,
  .ztree li span.button.ico_docu,
  .ztree li span.button.center_docu,
  .ztree li span.button.bottom_docu,
  .ztree li span.button.roots_docu
  {
    /*display: none;*/
  }
  /* 替换背景图标 */
  /*.ztree li span.button.root_open,*/
  /*.ztree li span.button.roots_open,*/
  /*.ztree li span.button.center_open,*/
  /*.ztree li span.button.bottom_open,*/
  .ztree li span.button.noline_open{
    background-image: url("/static/images/ic_minus.png");
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: center;
  }

  /*.ztree li span.button.root_close,*/
  /*.ztree li span.button.roots_close,*/
  /*.ztree li span.button.center_close,*/
  /*.ztree li span.button.bottom_close,*/
  .ztree li span.button.noline_close{
    background-image: url("/static/images/ic_plussign.png");
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: center;
  }
  /* 隐藏背景 */
  .ztree li ul.line{
    /*background: none;*/
  }
  .ztree * {
    font-size: 16px !important;
  }
  .ztree li{
    margin: 15px 0;
  }
  .ztree li span.button.add{
    background-image: url("/static/images/ic_add.png");
    background-size: 18px;
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 5px;
  }
  .ztree li span.button.add:hover{
    background-position: center;
  }
  .ztree li span.button.edit{
    background-image: url("/static/images/ic_edit.png");
    background-size: 18px;
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 5px;
  }
  .ztree li span.button.edit:hover{
    background-position: center;
  }
  .ztree li span.button.remove{
    background-image: url("/static/images/ic_del.png");
    background-size: 18px;
    background-repeat: no-repeat;
    background-position: center;
  }
  .ztree li span.button.remove:hover{
    background-position: center;
  }
</style>

<template>
  <Card>
    <!-- 左侧栏 -->
    <div class="left" id="left">
      <div class="t">
        <Input icon="search" placeholder="请输入搜索关键字" style="width: 100%"/>
      </div>
      <ul class="ztree" id="treeDemo"></ul>
    </div>
    <!-- 右侧栏 -->
    <div class="right">
      <!-- 搜索 -->
      <div class="top">
        <Button style="padding: 5px 15px;" type="primary" @click="add">新&nbsp;&nbsp;&nbsp;&nbsp;增</Button>
        <Input icon="search" placeholder="请输入搜索关键字" style="width: 400px"/>
      </div>
      <!-- 表格 -->
      <div class="mid">
        <MaterialTable :pId="currNodeId"></MaterialTable>
      </div>
      <!-- 分页 -->
      <div class="bot">
        <Page :total="100" show-sizer></Page>
      </div>
    </div>
    <!-- 对话框组件 -->
    <AddNode ref="addNode" @addNode="addNode"></AddNode>
    <EditNode ref="editNode" @editNode="editNode"></EditNode>
    <DelNode ref="delNode" @delNode="delNode"></DelNode>
    <AddItem ref="addItem"></AddItem>
  </Card>
</template>

<script>
  import 'jquery'
  import 'ztree'
  import 'ztree/css/metroStyle/metroStyle.css'

  import AddNode from './AddNode.vue'
  import EditNode from './EditNode.vue'
  import DelNode from './DelNode.vue'
  import MaterialTable from './MaterialTable.vue'
  import AddItem from './AddItem.vue'
  import DelItem from './DelItem.vue'

  import {mapState} from 'vuex'

  export default {
    // 数据
    data(){
      return{
        currNodeId:0,
        node:'',  // 保存当前请求的节点
        url:'',   // 保存当前请求的URL
        ztreeObj:'',
        newCount:100,
        // 2.zTree配置数据
        setting:{
          // 视图
          view: {
            // 添加鼠标悬停事件
            addHoverDom: this.addHoverDom,
            // 移除鼠标悬停事件
            removeHoverDom: this.removeHoverDom,
            // 是否支持多选
            selectedMulti: false,
            // 是否显示连线
            showLine: false,
            // 是否显示节点图标
            showIcon: false
          },
          // 检查
          check: {
            // 是否显示多选框/单选框
            enable: false
          },
          // 数据
          data: {
            key:{
              // 使用nodes属性描述子节点
              // children:'nodes'
              children:'objects'
            },
            // simpleData: {
              // 是否使用简单数据模式，注：必须满足数据的父子关系
              // enable: true
           // }
          },
          // 编辑
          edit: {
            // 是否可以编辑，如果为true，则默认提供编辑、删除功能
            enable: false
          },
          // 回调函数
          callback:{
           onClick:this.onClick
          }
        },
        // 3.zTree节点数据
        zNodes:[]
      }
    },
    computed:{
      ...mapState(['materialtypes','materialtypes_add','materialtypes_update'])
    },
    // 组件挂载完毕立即初始化
    mounted(){
      this.$store.dispatch('getMaterialtype')
      // this.zNodes = this.initData2()
      setTimeout(()=>{
         this.zNodes = this.initData()
         this.initTree()
        // console.log(this.node.tId)
        // console.log(this.ztreeObj.getNodeByParam('id', this.node.id))
      }, 500)
    },
    // 方法
    components:{
      AddNode,
      DelNode,
      EditNode,
      MaterialTable,
      AddItem,
      DelItem
    },
    methods: {
      add(){
        console.log('currNodeId:' + this.currNodeId)
        this.$refs.addItem.open(this.currNodeId)
      },
      onClick(e, treeId, treeNode){
//        console.log(treeNode.level)
//        console.log(treeNode)
//        console.log(treeId)
        // 如果当前节点为子节点才发送请求
        if(treeNode.level == 2){
          this.currNodeId = treeNode.id
          this.$store.dispatch('getMateriallist', {id:treeNode.id})
        }
      },
      // 删除节点
      delNode(treeNodeId){
        // 获取当前节点
        let node = this.ztreeObj.getNodeByParam('id', treeNodeId)
        // 删除当前节点
        this.ztreeObj.removeNode(node)
        // TODO 数据库操作
      },
      // 编辑节点
      editNode(treeNodeId, value){
        let node = this.ztreeObj.getNodeByParam('id', treeNodeId)
        // 覆盖当前节点名称
        node.name = value
        // 直接更新当前节点名称（方式1）
        this.ztreeObj.updateNode(node)
        // 使当前节点进入编辑模式（方式2）
        // this.ztreeObj.editName(node)
        // TODO 数据库操作
      },
      // 添加节点
      addNode(treeNodeId, value){
        // 当前父节点
        let rootNode = this.ztreeObj.getNodeByParam('id', treeNodeId)
        // 当前子节点
        // let newNode = {name:value, open:true, nodes:[{name:'AAA'}]}
        // 注意：自增运算符的执行顺序，每个新节点都必须设置对应的父节点ID
        // TODO id：通过服务器返回
        let newNode = null
        // TODO 注意：延时器纠正数据的获取时机
        setTimeout(()=>{
          if(rootNode.level == 1){
            newNode = {id:this.materialtypes_update.id, pId:rootNode.id, name:value}
          }else if(rootNode.level == 0){
            console.log('id:' + this.materialtypes_add.id)
            newNode = {id:this.materialtypes_add.id, pId:rootNode.id, name:value}
          }
          // 将子节点添加到父节点中
          this.ztreeObj.addNodes(rootNode, newNode)
          if(rootNode.level == 1){
            // 默认设置当前子节点为选中状态
            const node = this.ztreeObj.getNodesByParam('id', newNode.id)
            this.ztreeObj.selectNode(node[0])
            // 默认请求子节点数据
            this.currNodeId = newNode.id
            this.$store.dispatch('getMateriallist', {id:newNode.id})
          }
        }, 500)

        // TODO 刷新ztree树
        // this.ztreeObj.refresh()
        // TODO 数据库操作
        // this.zNodes.push(newNode)
        // this.zNodes.splice(rootNode.level, 0, newNode)
        // console.log(this.ztreeObj.getNodes())
      },
      // 注：ID作为每个节点的唯一标识
      initData2(){
        return[{
          id:0,
          name:'全部',
          open:true,  // 指定当前父节点展开
          nodes:[{id:1, name:'父节点1', open:true, nodes:[ // 注：此数据需使用computed计算方式生成（vuex管理状态）
            {id:11, name:'子节点11'},
            {id:12, name:'子节点12'},
            {id:13, name:'子节点13'}
          ]},{id:2, name:'父节点2', nodes:[
            {id:21, name:'子节点21'},
            {id:22, name:'子节点22'},
            {id:23, name:'子节点23'}
          ]},{id:3, name:'父节点3', nodes:[
            {id:31, name:'子节点31'},
            {id:32, name:'子节点32'},
            {id:33, name:'子节点33'}
          ]}]
        }]
      },
      initData(){
        return[{
          id:0,
          name:'全部',
          open:true,
          objects:this.materialtypes
        }]
      },
      // 初始化树结构
      initTree(){
        // init接收3个参数：DOM容器、zTree配置数据、zTree节点数据
        this.ztreeObj = $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
        // 获取到第一个子节点
        const node = this.ztreeObj.getNodes()[0].objects[0].objects[0]
        // 默认设置第一个子节点为选中状态
        this.ztreeObj.selectNode(node)
        // 默认请求子节点数据
        this.currNodeId = node.id
        this.$store.dispatch('getMateriallist', {id:node.id})
      },
      // 添加鼠标悬停
      addHoverDom(treeId, treeNode) {
        const div = document.getElementById('left')
              div.scrollLeft = div.scrollWidth

        // TODO treeId 是整个根节点id -> treeDemo
        // 获取根元素节点
        var sObj = $("#" + treeNode.tId + "_span");
        // var node = this.ztreeObj.getNodeByParam('tId', treeNode.tId)
        // 如果已经存在添加控件，则不处理
        if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
        // 如果已经存在编辑控件，则不处理
        if (treeNode.editNameFlag || $("#editBtn_"+treeNode.tId).length>0) return;
        // 如果已经存在删除控件，则不处理
        if (treeNode.editNameFlag || $("#removeBtn_"+treeNode.tId).length>0) return;

        // 如果不存在添加控件，创建添加控件
        var addStr = "<span class='button add' id='addBtn_" + treeNode.tId + "' title='add node' onfocus='this.blur();'></span>";
        // 如果不存在编辑控件，创建编辑控件
        var editStr = "<span class='button edit' id='editBtn_" + treeNode.tId + "' title='edit node' onfocus='this.blur();'></span>";
        // 如果不存在删除控件，创建删除控件
        var removeStr = "<span class='button remove' id='removeBtn_" + treeNode.tId + "' title='remove node' onfocus='this.blur();'></span>";

        // 并将添加节点的元素追加到当前根元素节点之后
        switch (treeNode.level){
          case 0:
            sObj.after(addStr);    // 添加控件
            break;
          case 1:
            sObj.after(removeStr)  // 删除控件
            sObj.after(editStr)    // 编辑控件
            sObj.after(addStr);    // 添加控件
            break;
          default:
            sObj.after(removeStr)  // 删除控件
            sObj.after(editStr)    // 编辑控件
            break;
        }
        // 获取添加节点控件
        var addBtn = $("#addBtn_"+treeNode.tId);
        // 如果存在，则绑定单击事件
        if (addBtn) addBtn.bind("click", ()=>{
          // 弹出添加对话框
          if(treeNode.level == 1){
            // const node = this.ztreeObj.getSelectedNodes()[0]
            this.$refs.addNode.open(treeNode.id, treeNode.level)
          }else if(treeNode.level == 0){
            this.$refs.addNode.open(treeNode.id, treeNode.level)
          }
          // 获取当前的节点（参数：id 选择器）
          // var zTree = $.fn.zTree.getZTreeObj("treeDemo");
          // 在当前节点上添加子节点
          // zTree.addNodes(treeNode, {id:(100 + this.newCount), pId:treeNode.id, name:"new node" + (this.newCount++)});
          return false;
        });
        // 获取编辑节点控件
        var editBtn = $("#editBtn_"+treeNode.tId);
        // 如果存在，则绑定单击事件
        if (editBtn) editBtn.bind("click", ()=>{
          // 弹出编辑对话框
          this.$refs.editNode.open(treeNode.id, treeNode.name)
          return false;
        });
        // 获取删除节点控件
        var removeBtn = $("#removeBtn_"+treeNode.tId);
        // 如果存在，则绑定单击事件
        if (removeBtn) removeBtn.bind("click", ()=>{
          // 弹出删除对话框
          this.$refs.delNode.open(treeNode.id)
          return false;
        });
      },
      // 移除鼠标悬停
      removeHoverDom(treeId, treeNode) {
        document.getElementById('left').scrollLeft = 0
        $("#addBtn_"+treeNode.tId).unbind().remove();
        $("#editBtn_"+treeNode.tId).unbind().remove();
        $("#removeBtn_"+treeNode.tId).unbind().remove();
      }
    }
  }
</script>
