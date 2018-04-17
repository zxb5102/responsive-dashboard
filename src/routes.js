import DashView from './components/Dash.vue'
// import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
// import DashboardView from './components/views/Dashboard.vue'
// import TablesView from './components/views/Tables.vue'
// import TasksView from './components/views/Tasks.vue'
// import SettingView from './components/views/Setting.vue'
// import AccessView from './components/views/Access.vue'
// import ServerView from './components/views/Server.vue'
// import ReposView from './components/views/Repos.vue'
import SiteList from './components/views/SiteList.vue'
import UserAccount from './components/views/UserAccount.vue'
import SelectionAd from './components/views/SelectionAd.vue'
import ZoneList from './components/views/ZoneList.vue'
import UserMsg from './components/views/UserMsg.vue'
import ChartShow from './components/views/ChartShow.vue'
import AutoAd from './components/views/AutoAd.vue'
import PlanList from './components/views/PlanList.vue'


// Routes
const routes = [
  // {
  //   path: '/test',
  //   component: UserAccount,
  //   name: 'userAccount',
  //   meta: { description: '账户设置' }
  // },
  // {
  //   path: '/login',
  //   component: LoginView
  // },
  {
    path: '/',
    component: DashView,
    redirect: "/userMsg",
    children: [
      {
        path: 'autoAd',
        component: AutoAd,
        name: 'autoAd',
        meta: { description: '智能广告' }
      },
      {
        path: 'chartShow',
        component: ChartShow,
        name: 'chartShow',
        meta: { description: '数据报表' }
      },
      {
        path: 'userMsg',
        // alias: '',
        component: UserMsg,
        name: 'userMsg',
        meta: { description: '我的消息' }
      },
      {
        path: 'zoneList',
        component: ZoneList,
        name: 'zoneList',
        meta: { description: '广告位管理' }
      },
      {
        path: 'userAccount',
        component: UserAccount,
        name: 'userAccount',
        meta: { description: '账户设置' }
      },
      {
        path: 'siteList',
        component: SiteList,
        name: 'SiteList',
        meta: { description: '网站列表' }
      },
      {
        path: 'planList',
        component: PlanList,
        name: 'planList',
        meta: {
          description: '项目列表',
        }
      },
      {
        path: 'selectionAd',
        component: SelectionAd,
        name: 'selectionAd',
        meta: {
          description: '选择广告',
          paths: [
            {
              path: 'planList',
              link: true,
              value: '项目列表'
            },
            {
              path: 'selectionAd',
              value: '选择广告'
            },
          ]
        }
      }
      // {
      //   path: 'dashboard',
      //   // alias: '',
      //   component: DashboardView,
      //   name: 'Dashboard',
      //   meta: { description: 'Overview of environment' }
      // }, {
      //   path: 'tables',
      //   component: TablesView,
      //   name: 'Tables',
      //   meta: { description: 'Simple and advance table in CoPilot' }
      // }, {
      //   path: 'tasks',
      //   component: TasksView,
      //   name: 'Tasks',
      //   meta: { description: 'Tasks page in the form of a timeline' }
      // }, {
      //   path: 'setting',
      //   component: SettingView,
      //   name: 'Settings',
      //   meta: { description: 'User settings page' }
      // }, {
      //   path: 'access',
      //   component: AccessView,
      //   name: 'Access',
      //   meta: { description: 'Example of using maps' }
      // }, {
      //   path: 'server',
      //   component: ServerView,
      //   name: 'Servers',
      //   meta: { description: 'List of our servers', requiresAuth: true }
      // }, {
      //   path: 'repos',
      //   component: ReposView,
      //   name: 'Repository',
      //   meta: { description: 'List of popular javascript repos' }
      // }
    ]
  },
   {
    path: '*',
    component: NotFoundView,
    // redirect: "/userMsg",
  }
]

export default routes
