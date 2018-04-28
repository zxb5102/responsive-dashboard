<template>
  <div class="zone">
    <!-- <div class="tools">
            <el-button type="primary" size="small">获取代码</el-button>
            <el-button type="info" size="small">编辑</el-button>
            <el-button type="danger" size="small">删除</el-button>
        </div> -->
    <div class="filters">
      <div class="each-filter" v-if="filters.operationStyle.length > 1">
        <div class="label">计费模式</div>
        <el-checkbox-group v-model="searchFilters.operationStyle">
          <el-checkbox :label="item.id" v-for="item in filters.operationStyle" :key="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="each-filter" v-if="filters.siteList.length > 1">
        <div class="label">投放网站</div>
        <el-checkbox-group v-model="searchFilters.siteList">
          <el-checkbox :label="item.id" v-for="item in filters.siteList" :key="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="each-filter" v-if="filters.sizes.length > 1">
        <div class="label">尺寸</div>
        <el-checkbox-group v-model="searchFilters.sizes">
          <el-checkbox :label="item.id" v-for="item in filters.sizes" :key="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="main">
      <el-table :data="tableData" style="width: 100%" border header-cell-class-name='tcenter' cell-class-name="tcenter">
        <el-table-column prop="name" label="广告位名称">
        </el-table-column>
        <el-table-column prop="site" label="所属网站">
        </el-table-column>
        <el-table-column prop="size" label="尺寸">
        </el-table-column>
        <el-table-column prop="operationStyle" label="结算方式">
        </el-table-column>
        <el-table-column prop="position" label="广告位置">
        </el-table-column>
        <el-table-column prop="count" label="广告数">
        </el-table-column>
        <!-- <el-table-column prop="preview" label="预览" min-width="100px" className="preview-img-column">
          <template slot-scope="scope" style="padding:0px;">
            <div class="wrap-preview-img">
              <img :src="scope.row.preview" alt="">
            </div>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <div class="wrap-operation-btn">
              <el-button type="danger" size="mini" @click="handDel(scope.row)">删除</el-button>
              <el-button type="success" size="mini" @click="handGetDomo(scope.row)">代码</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="wrap-pagination">
      <el-pagination background layout="prev, pager, next" :total="total" :current-page="currPage" :page-size="pageSize" :small="small" @current-change='currentChange'>
      </el-pagination>
    </div> -->
    <div>
      <el-dialog title="提示" :visible.sync="dialogVisible" :width="dialogWidth">
        <el-input type="textarea" :autosize="{ minRows: 3,}" v-model="demo" id="demo-input">
        </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" id="copy-button" data-clipboard-target="#demo-input">复制</el-button>
          <el-button type="danger" @click="dialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import ClipboardJS from "clipboard";
import { MessageBox } from "mint-ui";
import axios from "axios";
export default {
  data() {
    return {
      demo: "",
      dialogVisible: false,
      dialogWidth:
        document.documentElement.clientWidth < 1024 ? "95%" : "500px",
      small: document.documentElement.clientWidth < 1024 ? true : false,
      tableData: [],
      searchFilters: {
        operationStyle: [],
        siteList: [],
        sizes: []
      },
      filters: {
        operationStyle: [],
        siteList: [],
        sizes: []
      },
      pageSize: 10,
      currPage: 1,
      total: 50
    };
  },
  watch: {
    searchFilters: {
      deep: true,
      handler: function(after, before) {
        getZoneList.bind(this)();
      }
    }
  },
  created() {
    var siteId = this.$route.query.siteId;
    if (siteId) {
      this.searchFilters.siteList.push(siteId);
    }
    getZoneList.bind(this)();
    axios({
      method: "post",
      url: "/Zone/Conditions"
    }).then(resp => {
      var data = resp.data;
      this.filters.operationStyle = data.cost;
      this.filters.siteList = data.site;
      var tsize = [];
      for (var item of data.size) {
        tsize.push({
          id: item.width + "," + item.height,
          name: item.width + " x " + item.height
        });
      }
      this.filters.sizes = tsize;
    });
  },
  mounted() {
    new ClipboardJS("#copy-button");
  },
  methods: {
    handGetDomo(row) {
      axios({
        url: `/Zone/GetCode/${row.id}`
      }).then(result => {
        // debugger;
        result = result.data;
        if (result.code === 0) {
          // 0 代表的直连  1 代表带素材的链接
          if (result.data.type === 0) {
            this.demo = result.data.link;
          } else {
            this.demo = `<script src="${result.data.link}"><\/script>`;
          }
          this.dialogVisible = true;
        } else {
          alert(result.msg);
          // this.$message({
          //   message: "获取链接出错了",
          //   type: "error"
          // });
        }
      });
      // console.log(row);
      //   this.$notify({
      //     title: "提示",
      //     message: "这是一条不会自动关闭的消息",
      //     duration: 0
      //   });
      //   this.$message({
      //     message: "已经复制到剪切板",
      //     type: "success"
      //   });
      // this.dialogVisible = true;
    },
    handDel(row) {
      MessageBox.confirm("确认删除当前数据？", "提示").then(action => {
        var ids = [];
        ids.push(row.id);
        axios({
          method: "post",
          url: "/Zone/Delete",
          data: {
            Ids: ids
          }
        }).then(resp => {
          var data = resp.data;
          if (data.code === 0) {
            var dex = this.tableData.indexOf(row);
            //   console.log(dex)
            this.tableData.splice(dex, 1);
            this.$message({
              message: "删除成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "删除错误",
              type: "error"
            });
          }
        });
      });
    },
    currentChange() {
      getZoneList.bind(this)();
    },
    handClearFilter() {
      this.searchFilters = {};
      getZoneList.bind(this)();
    },
    handleFilterChange() {
      getZoneList.bind(this)();
    }
  }
};
function getZoneList() {
  var tsize = [];
  for (var item of this.searchFilters.sizes) {
    var ary = item.split(",");
    tsize.push({
      width: ary[0],
      height: ary[1]
    });
  }
  axios({
    method: "post",
    url: "/Zone/List",
    data: {
      Cost: this.searchFilters.operationStyle,
      Site: this.searchFilters.siteList,
      Size: tsize
    }
  }).then(resp => {
    var data = resp.data;
    var tary = [];
    for (var item of data.rows) {
      tary.push({
        id: item.id,
        name: item.name,
        site: item.site,
        size: item.width + " x " + item.height,
        operationStyle: item.cost,
        count: item.adCount,
        position: item.adType
      });
    }
    this.tableData = tary;
    // this.total = resp.data.total;
  });
}
</script>

<style lang="less" scoped>
.tools {
  padding: 10px 0px 10px 10px;
}
.wrap-preview-img {
  font-size: 0px;
  display: flex;
  height: 100px;
  width: 100px;
  margin: auto;
  img {
    max-width: 100%;
    max-height: 100%;
    margin: auto;
  }
  justify-content: center;
  align-items: center;
}
.filters {
  // display: flex;
  // justify-content: left;
  // align-items: center;
  padding: 10px 0px 10px 10px;
  // flex-wrap: wrap;
}
.each-filter {
  margin-right: 5px;
}
.label {
  color: black;
  // min-width: 100px;
  display: inline-block;
}
.wrap-pagination {
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 20px 0px 20px 0;
}
.wrap-operation-btn {
  @media (max-width: 1024px) {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > button {
      margin: 0px;
    }
    & > button:nth-child(1) {
      margin-bottom: 10px;
    }
  }
}
.main {
  width: 99%;
  margin: auto;
}
</style>
<style>
.preview-img-column .cell {
  padding: 0px !important;
}
.tcenter {
  text-align: center !important;
}
</style>
<style lang="less">
.zone .filters .each-filter div[role="group"] label:nth-child(1) {
  margin-left: 30px;
}
</style>


