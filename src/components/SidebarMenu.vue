<template>
  <ul class="sidebar-menu">
    <li class="header">我的首页</li>
    <router-link tag="li" class="pageLink" to="/">
      <a>
        <i class="fa fa-desktop"></i>
        <span class="page">我的消息</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/userAccount">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">账户设置</span>
      </a>
    </router-link>

    <li class="header">网站管理</li>
    <!-- <router-link tag="li" class="pageLink" to="/tasks">
      <a>
        <i class="fa fa-tasks"></i>
        <span class="page"></span>
      </a>
    </router-link> -->
    <router-link tag="li" class="pageLink" to="/siteList">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">网站列表</span>
      </a>
    </router-link>
    <!-- <li class="treeview"> -->
    <!-- <router-link tag="li" class="pageLink" to="/setting">
      <a href="#">
        <i class="fa fa-folder-o"></i>
        <span>网站管理</span>
        <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
      </a>
    </router-link> -->
    <router-link tag="li" class="pageLink" to="/selectionAd">
      <a href="#">
        <i class="fa fa-table"></i>
        <span>选择广告</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/zoneList">
      <a href="#">
        <i class="fa fa-table"></i>
        <span>广告位管理</span>
      </a>
    </router-link>
    <!-- <ul class="treeview-menu">
        <li>
          <a href="#">
            <i class="fa fa-file-word-o"></i> Item 1
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-file-picture-o"></i> Item 2
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-file-pdf-o"></i> Item 3
          </a>
        </li>
      </ul>
    </li> -->

    <li class="header">数据报表</li>
    <router-link tag="li" class="pageLink" to="chartShow">
      <a>
        <i class="fa fa-book"></i>
        <span class="page">数据报表</span>
      </a>
    </router-link>
    <!-- <router-link tag="li" class="pageLink" to="/server">
      <a>
        <i class="fa fa-hdd-o"></i>
        <span class="page">Server</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/repos">
      <a>
        <i class="fa fa-heart"></i>
        <span class="page">Repos</span>
        <small class="label pull-right bg-green">AJAX</small>
      </a>
    </router-link> -->

    <!-- <li class="header">PAGES</li>
    <router-link tag="li" class="pageLink" to="/login">
      <a>
        <i class="fa fa-circle-o text-yellow"></i>
        <span class="page"> Login</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/404">
      <a>
        <i class="fa fa-circle-o text-red"></i>
        <span class="page"> 404</span>
      </a>
    </router-link> -->
  </ul>
</template>
<script>
export default {
  name: "SidebarMenu"
};
</script>
<style>
/* override default */
.sidebar-menu > li > a {
  padding: 12px 15px 12px 15px;
}

.sidebar-menu li.active > a > .fa-angle-left,
.sidebar-menu li.active > a > .pull-right-container > .fa-angle-left {
  animation-name: rotate;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-90deg);
  }
}
</style>
