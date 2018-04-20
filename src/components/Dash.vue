<template>
  <div :class="['wrapper', classes]">
    <header class="main-header">
      <span class="logo-mini pda-none">
        <a href="/"><img src="/static/img/copilot-logo-white.svg" alt="Logo" class="img-responsive center-block logo"></a>
      </span>
      <!-- Header Navbar -->
      <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <i class="fas fa-bars menu-center" data-toggle="offcanvas" role="button"></i>
        <!-- <a href="javascript:;" class="fa-table ion-navicon-round" >
          <span class="sr-only">Toggle navigation</span>
        </a> -->
        <!-- Navbar Right Menu -->
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <!-- <li class="nav-item active">
              <a class="nav-link" href="#"></a>
            </li> -->
            <li class="nav-item">
              <a class="nav-link" href="#" @click="logOut">注销</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <!-- Left side column. contains the logo and sidebar -->
    <!-- <sidebar display-name="demo.displayName" picture-url="demo.avatar" /> -->
    <sidebar/>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper" style="height:100%">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1>
          <!-- {{$route.name.toUpperCase() }} -->
          <!-- <small>{{ $route.meta.description }}</small> -->
        </h1>
        <ol class="breadcrumb bread-ol">
          <li>
            <a href="/">
              <i class="fa fa-home"></i>主页</a>
          </li>
          <li class="active" v-if="!$route.meta.paths">{{$route.meta.description}}</li>
          <li v-for="(item,dex) in $route.meta.paths ? $route.meta.paths :[]" :key="dex">
            <router-link :to="item.path" tag="a">
              {{item.value}}
            </router-link>
          </li>
        </ol>
      </section>

      <router-view></router-view>
    </div>
    <!-- /.content-wrapper -->

    <!-- Main Footer -->
    <footer class="main-footer">
      <strong>Copyright &copy; {{year}}
        <a href="javascript:;">中航长江建设工程有限公司</a>.</strong> All rights reserved.
    </footer>
  </div>
  <!-- ./wrapper -->
</template>

<script>
import axios from 'axios';
// import faker from "faker";
// import { mapState } from "vuex";
import config from "../config";
import Sidebar from "./Sidebar";
// import "hideseek";

export default {
  name: "Dash",
  components: {
    Sidebar
  },
  data: function() {
    return {
      // section: 'Dash',
      year: new Date().getFullYear(),
      classes: {
        fixed_layout: config.fixedLayout,
        hide_logo: config.hideLogoOnMobile
      },
      error: ""
    };
  },
  computed: {
    // ...mapState(["userInfo"]),
    // demo() {
    //   return {
    //     displayName: faker.name.findName(),
    //     avatar: faker.image.avatar(),
    //     email: faker.internet.email(),
    //     randomCard: faker.helpers.createCard()
    //   };
    // }
  },
  methods: {
    logOut() {
      axios({
        method: "post",
        url: "/Account/LogOff"
      }).then(resp => {
        window.location.href = "/static/index.html";
      });
    },
    // changeloading() {
    //   this.$store.commit("TOGGLE_SEARCHING");
    // }
  }
};
</script>

<style lang="scss">
.wrapper.fixed_layout {
  .main-header {
    position: fixed;
    width: 100%;
  }

  .content-wrapper {
    padding-top: 50px;
  }

  .main-sidebar {
    position: fixed;
    height: 100vh;
  }
}

.wrapper.hide_logo {
  @media (max-width: 767px) {
    .main-header .logo {
      display: none;
    }
  }
}

.logo-mini,
.logo-lg {
  text-align: left;

  img {
    padding: 0.4em !important;
  }
}

.logo-lg {
  img {
    display: -webkit-inline-box;
    width: 25%;
  }
}

.user-panel {
  height: 4em;
}

hr.visible-xs-block {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.17);
  height: 1px;
  border-color: transparent;
}
</style>
<style lang="less" scoped>
.pda-none {
  @media (max-width: 1024px) {
    display: none;
  }
}
.bread-ol {
  float: unset;
  position: static;
}
.main-header .sidebar-toggle:before {
  // content: "\f20d";
  // font-family: "Ionicons";
}
.menu-center {
  height: 50px;
  line-height: 30px;
  font-size: 24px;
  padding: 10px;
}
.sidebar-open i[role="button"] {
  transform: rotate(-90deg);
  // animation-duration: 0.2s;
  // animation-direction: 0.5s;
}
.sidebar-collapse i[role="button"] {
  transform: rotate(0deg);
}
//
i[role="button"] {
  transition-duration: 0.4s;
  color: white;
  transform: rotate(0deg);
  @media (min-width: 1024px) {
    transform: rotate(-90deg);
  }
}
</style>
