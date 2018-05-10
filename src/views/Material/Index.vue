<style scoped>
  .left{
    height: 600px;
    width: 30%;
    border: 1px solid #ddd;
    float: left;
  }
  .right{
    height: 600px;
    width: 70%;
    border:1px solid #000;
    margin-left: 30%;
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
    margin: 5px 0;
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
    <div class="left">
      <ul class="ztree" id="treeDemo"></ul>
    </div>
    <div class="right">
    </div>
    <AddNode ref="addNode" @addNode="addNode"></AddNode>
    <EditNode ref="editNode" @editNode="editNode"></EditNode>
    <DelNode ref="delNode" @delNode="delNode"></DelNode>
  </Card>
</template>

<script>
  import 'jquery'
  import 'ztree'
  import 'ztree/css/metroStyle/metroStyle.css'
//  import 'ztree/css/zTreeStyle/zTreeStyle.css'

  import AddNode from './AddNode.vue'
  import EditNode from './EditNode.vue'
  import DelNode from './DelNode.vue'

  export default {
    // 数据
    data(){
      return{
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
              children:'nodes'
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
          }
        },
        // 3.zTree节点数据
        zNodes:[]
      }
    },
    // 组件挂载完毕立即初始化
    mounted(){
      this.zNodes = this.initData2()
      this.initTree()
    },
    // 方法
    components:{
      AddNode,
      EditNode,
      DelNode
    },
    methods: {
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
        let newNode = {id:this.newCount++, pId:rootNode.id, name:value}
        // 将子节点添加到父节点中
        this.ztreeObj.addNodes(rootNode, newNode)
        // TODO 刷新ztree树
        // this.ztreeObj.refresh()
        // TODO 数据库操作
        // this.zNodes.push(newNode)
        // this.zNodes.splice(rootNode.level, 0, newNode)
        console.log(this.ztreeObj.getNodes())
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
        // 注：pId指向的是父节点的id
        return [
          { id:1, pId:0, name:"父节点1", open:true},
          { id:11, pId:1, name:"父节点11"},
          { id:111, pId:11, name:"叶子节点111"},
          { id:112, pId:11, name:"叶子节点112"},
          { id:113, pId:11, name:"叶子节点113"},
          { id:114, pId:11, name:"叶子节点114"},
          { id:12, pId:1, name:"父节点12"},
          { id:121, pId:12, name:"叶子节点121"},
          { id:122, pId:12, name:"叶子节点122"},
          { id:123, pId:12, name:"叶子节点123"},
          { id:124, pId:12, name:"叶子节点124"},
          { id:13, pId:1, name:"父节点13", isParent:true},
          { id:2, pId:0, name:"父节点2"},
          { id:21, pId:2, name:"父节点21", open:true},
          { id:211, pId:21, name:"叶子节点211"},
          { id:212, pId:21, name:"叶子节点212"},
          { id:213, pId:21, name:"叶子节点213"},
          { id:214, pId:21, name:"叶子节点214"},
          { id:22, pId:2, name:"父节点22"},
          { id:221, pId:22, name:"叶子节点221"},
          { id:222, pId:22, name:"叶子节点222"},
          { id:223, pId:22, name:"叶子节点223"},
          { id:224, pId:22, name:"叶子节点224"},
          { id:23, pId:2, name:"父节点23"},
          { id:231, pId:23, name:"叶子节点231"},
          { id:232, pId:23, name:"叶子节点232"},
          { id:233, pId:23, name:"叶子节点233"},
          { id:234, pId:23, name:"叶子节点234"},
          { id:3, pId:0, name:"父节点3", isParent:true}
          ]
      },
      // 初始化树结构
      initTree(){
        // init接收3个参数：DOM容器、zTree配置数据、zTree节点数据
        this.ztreeObj = $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
      },
      // 添加鼠标悬停
      addHoverDom(treeId, treeNode) {
        // 获取根元素节点
        var sObj = $("#" + treeNode.tId + "_span");
        var node = this.ztreeObj.getNodeByParam('tId', treeNode.tId)
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
        switch (node.level){
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
          this.$refs.addNode.open(treeNode.id)
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
        $("#addBtn_"+treeNode.tId).unbind().remove();
        $("#editBtn_"+treeNode.tId).unbind().remove();
        $("#removeBtn_"+treeNode.tId).unbind().remove();
      }
    }
  }
</script>
