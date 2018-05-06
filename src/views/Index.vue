<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }

  .ivu-layout-content{
    margin: 30px;
  }
  /* 覆盖Header默认样式 */
  .ivu-layout-header{
    padding: 0;
    height: auto;
    background: #fff;
    box-shadow: 0 2px 3px 2px rgba(0,0,0,.1);
  }
</style>
<style>
  .ivu-card-body{
    padding: 30px;
  }
  .ivu-page-options-sizer{
    margin-right: 0;
  }
  *{
    font-size: 14px;
  }
</style>
<template>
  <div class="layout">
    <!-- 左侧栏 -->
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
      <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            Item 1
          </template>
          <router-link to="/organization/post/index">
            <MenuItem name="1-1">Option 1</MenuItem>
          </router-link>
          <router-link to="/organization/post/index">
            <MenuItem name="1-2">Option 2</MenuItem>
          </router-link>
          <router-link to="/organization/post/index">
            <MenuItem name="1-3">Option 3</MenuItem>
          </router-link>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-keypad"></Icon>
            Item 2
          </template>
          <MenuItem name="2-1">Option 1</MenuItem>
          <MenuItem name="2-2">Option 2</MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-analytics"></Icon>
            Item 3
          </template>
          <MenuItem name="3-1">Option 1</MenuItem>
          <MenuItem name="3-2">Option 2</MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <!-- 右侧栏 -->
    <Layout :style="{marginLeft: '200px'}">
      <!-- 头部区 -->
      <Header>
        <!-- 头部 -->
        <Head></Head>
      </Header>
      <!-- 主体区 -->
      <Content>
        <!-- 内容 -->
        <router-view></router-view>
      </Content>
      <!-- 底部区 -->
      <div class="footer" style="padding: 20px 0; border-top: 1px solid #ddd">
        <p style="text-align: center">关于我们  |  常见问题  |  联系我们：010-59875985 business@veryid.cn</p>
        <p style="text-align: center">2014-2017 Pactera Technology International Ltd. All rights reserved.｜ ICP证浙B2-20160559</p>
      </div>
    </Layout>
  </div>
</template>
<script>
  import Head from '../components/Head/Head.vue'
  export default {
    components:{
      Head
    }
  }
</script>
