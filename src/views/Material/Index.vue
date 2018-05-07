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

<template>
  <Card>
    <div class="left ztree" id="materialTree">
    </div>
    <div class="right">
    </div>
  </Card>
</template>

<script>
  import 'jquery'
  import 'ztree'
  import 'ztree/css/metroStyle/metroStyle.css'
  import 'ztree/css/zTreeStyle/zTreeStyle.css'

  export default {
    data(){
      return {
        zTree:'',
        setting:{
          view: {
            dblClickExpand: false,
            showLine: true,
            selectedMulti: false
          },
          data: {
            simpleData: {
              enable: true,
              idKey: "id",
              pIdKey: "pId",
              rootPId: ""
            }
          },
          callback: {
            beforeClick: function (treeId, treeNode) {
              var zTree = $.fn.zTree.getZTreeObj("tree");
              if (treeNode.isParent) {
                zTree.expandNode(treeNode);
                return false;
              } else {
                return true;
              }
            }
          }
        }
      }
    },
    mounted(){
      this.initTree()
    },
    methods:{
      initTree(){
        let zNodes = this.initData()
        $.fn.zTree.init($("#materialTree"), this.setting, zNodes);
      },
      initData(){
        return [
          {id: 1, pId: 0, name: "水果"},
          {id: 101, pId: 1, name: "苹果"},
          {id: 102, pId: 1, name: "香蕉"},
          {id: 103, pId: 1, name: "梨"},
          {id: 10101, pId: 101, name: "红富士苹果", open: true},
          {id: 10102, pId: 101, name: "红星苹果"},
          {id: 10103, pId: 101, name: "嘎拉"},
          {id: 10104, pId: 101, name: "桑萨"},
          {id: 10201, pId: 102, name: "千层蕉"},
          {id: 10202, pId: 102, name: "仙人蕉"},
          {id: 10203, pId: 102, name: "吕宋蕉"},
        ]
      }
    }
  }
</script>
