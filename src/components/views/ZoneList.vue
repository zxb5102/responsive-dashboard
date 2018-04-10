<template>
    <div class="zone">
        <!-- <div class="tools">
            <el-button type="primary" size="small">获取代码</el-button>
            <el-button type="info" size="small">编辑</el-button>
            <el-button type="danger" size="small">删除</el-button>
        </div> -->
        <div class="filters">
            <div class="each-filter">
                <div class="label">广告尺寸</div>
                <el-select v-model="searchFilters.size" placeholder="选择尺寸" @change="handleFilterChange">
                    <el-option :label="item.label" :value="item.value" v-for="(item,dex) in filters.size" :key="dex"></el-option>
                </el-select>
            </div>
            <div class="each-filter">
                <div class="label">域名</div>
                <el-select v-model="searchFilters.domain" placeholder="选择域名" @change="handleFilterChange">
                    <el-option :label="item.label" :value="item.value" v-for="(item,dex) in filters.domain" :key="dex"></el-option>
                </el-select>
            </div>
            <div class="each-filter">
                <div class="label">结算方式</div>
                <el-select v-model="searchFilters.settleType" placeholder="选择结算方式" @change="handleFilterChange">
                    <el-option :label="item.label" :value="item.value" v-for="(item,dex) in filters.settleType" :key="dex"></el-option>
                </el-select>
            </div>
            <div class="each-filter">
                <!-- <el-button type="primary" size="small" @click="handFilter">搜索</el-button> -->
                <el-button type="warning" size="small" @click="handClearFilter">清空过滤条件</el-button>
            </div>
        </div>
        <div class="main">
            <el-table :data="tableData" style="width: 100%" border header-cell-class-name='tcenter' cell-class-name="tcenter">
                <el-table-column prop="name" label="广告位名称">
                </el-table-column>
                <el-table-column prop="site" label="所属网站">
                </el-table-column>
                <el-table-column prop="settleType" label="结算方式">
                </el-table-column>
                <el-table-column prop="category" label="类型">
                </el-table-column>
                <el-table-column prop="size" label="尺寸">
                </el-table-column>
                <el-table-column prop="preview" label="预览" min-width="100px" className="preview-img-column" >
                    <template slot-scope="scope" style="padding:0px;">
                        <div class="wrap-preview-img">
                            <img :src="scope.row.preview" alt="">
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed>
                    <template slot-scope="scope">
                        <div class="wrap-operation-btn">
                            <el-button type="danger" size="mini" @click="handDel(scope.row)">删除</el-button>
                            <el-button type="success" size="mini" @click="handGetDomo(scope.row)">代码</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="wrap-pagination">
            <el-pagination background layout="prev, pager, next" :total="total" :current-page="currPage" :page-size="pageSize" :small="small" @current-change='currentChange'>
            </el-pagination>
        </div>
        <div>
            <el-dialog title="提示" :visible.sync="dialogVisible" :width="dialogWidth">
                <el-input type="textarea" :autosize="{ minRows: 3,}" v-model="demo">
                </el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" id="copy-button" data-clipboard-text="Copy Me!">复制</el-button>
                    <el-button type="danger" @click="dialogVisible = false">关闭</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { MessageBox } from "mint-ui";
import axios from "axios";
export default {
  data() {
    return {
      demo:
        "<script src='//cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.runtime.min.js'>",
      dialogVisible: false,
      dialogWidth:
        document.documentElement.clientWidth < 1024 ? "95%" : "500px",
      small: document.documentElement.clientWidth < 1024 ? true : false,
      tableData: [],
      searchFilters: {},
      filters: {},
      pageSize: 10,
      currPage: 1,
      total: 50
    };
  },
  created() {
    getZoneList.bind(this)();
    axios({
      url: "/getZoneFilter"
    }).then(resp => {
      this.filters = resp.data;
    });
  },
  mounted() {
    // var swfPath = ZeroClipboard.config("/static/ZeroClipboard.swf");
    // var clip = new ZeroClipboard(document.getElementById("copy-button"), {
    //   moviePath: "/static/ZeroClipboard.swf"
    // });
    // clip.on("complete", function(client, args) {
    //   alert("复制成功，复制内容为：" + args.text);
    // });
    // console.log(clip);
    // clipboard.writeText("hello world").then(action=>{
    //     console.log(action);
    // }).catch(error=>{
    //     console.log(error);
    // });
    // var btn = document.getElementById("copy-button");
    // var client = new ZeroClipboard(btn);
    // client.on("ready", function(readyEvent) {
    //   // alert( "ZeroClipboard SWF is ready!" );
    //   console.log(111111);
    //   client.on("aftercopy", function(event) {
    //     // `this` === `client`
    //     // `event.target` === the element that was clicked
    //     // event.target.style.display = "none";
    //     alert("Copied text to clipboard: " + event.data["text/plain"]);
    //   });
    // });
    // debugger;
  },
  methods: {
    handGetDomo() {
      //   this.$notify({
      //     title: "提示",
      //     message: "这是一条不会自动关闭的消息",
      //     duration: 0
      //   });
      //   this.$message({
      //     message: "已经复制到剪切板",
      //     type: "success"
      //   });
      this.dialogVisible = true;
    },
    handDel(row) {
      MessageBox.confirm("确认删除当前数据？", "提示").then(action => {
        var dex = this.tableData.indexOf(row);
        //   console.log(dex)
        this.tableData.splice(dex, 1);
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
  axios({
    url: "/getZoneList",
    data: {
      pageSize: this.pageSize,
      currPage: this.currPage,
      ...this.searchFilters
    }
  }).then(resp => {
    this.tableData = resp.data.rows;
    this.total = resp.data.total;
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
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 10px 0px 10px 10px;
  flex-wrap: wrap;
}
.each-filter {
  margin-right: 5px;
}
.label {
  color: black;
  min-width: 100px;
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
    &> button{
        margin:0px;
    }
    & > button:nth-child(1) {
      margin-bottom: 10px;
    }
  }
}
.main{
    width:99%;
    margin:auto;
}
</style>
<style>
.preview-img-column .cell {
  padding: 0px !important;
}
.tcenter{
    text-align: center !important;
}
</style>


