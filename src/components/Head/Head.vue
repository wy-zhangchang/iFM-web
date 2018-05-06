<template>
  <div>
    <!-- 菜单按钮 -->
    <Button type="text" class="header-menu">
      <Icon type="navicon-round"></Icon>
    </Button>
    <!-- 下拉菜单 -->
    <Dropdown trigger="click" class="header-dropdown">
      <a href="javascript:void(0)">
        <Icon type="person"></Icon>
        13800138000
        <Icon type="arrow-down-b"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem class="logout-icon">
          <Icon type="log-out"></Icon>
          退出
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <!-- 标题 -->
    <Breadcrumb class="header-title">
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Components</BreadcrumbItem>
      <BreadcrumbItem>Layout</BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
  export default{}
</script>

<style scoped>
  .header-menu{
    height: 64px;
    line-height: 64px;
    padding: 0 30px;
    font-size: 26px;
  }
  .header-menu .ivu-icon{
    font-size: 26px;
  }
  /* 覆盖DropdownItem默认样式 */
  .logout-icon{
    text-align: center;
    height: 40px;
    line-height: 40px;
    padding: 0;
  }
  .header-dropdown{
    float: right;
    margin-right: 30px;
  }
  .header-title{
    border-top: 1px solid #ddd;
    padding: 0 30px;
  }
</style>
