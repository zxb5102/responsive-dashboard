<template>
  <div class="selection selectionAd">
    <div class="wrap-btn">
      <el-button type="primary" size="small" @click="handCheck">关联</el-button>
    </div>
    <div>
      <el-table :data="planData" border header-cell-class-name='tcenter' cell-class-name="tcenter">
        <el-table-column prop="logo" label="logo" min-width="100px">
          <template slot-scope="scope">
            <div class="wrap-preview-img">
              <img :src="scope.row.preview" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="项目名称">
        </el-table-column>
        <el-table-column prop="operationStyle" label="计费类型">
        </el-table-column>
        <el-table-column prop="period" label="结算周期">
        </el-table-column>
        <el-table-column prop="activeTime" label="活动时间">
        </el-table-column>
        <el-table-column prop="price" label="单价">
        </el-table-column>
      </el-table>
    </div>
    <div class="filters">
      <div class="each-filter" v-if="filters.position.length > 1">
        <div class="label">广告位置</div>
        <el-radio-group v-model="searchFilters.position">
          <el-radio :label="item.id" v-for="item in filters.position" :key="item.id">{{item.name}}</el-radio>
        </el-radio-group>
      </div>
      <div class="each-filter" v-if="filters.size.length > 1">
        <div class="label">广告尺寸</div>
        <el-radio-group v-model="searchFilters.size">
          <el-radio :label="item.id" v-for="item in filters.size" :key="item.id">{{item.name}}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="main">
      <el-table :data="tableData" style="width: 100%" @selection-change="selectionChange" border header-cell-class-name='tcenter' cell-class-name="tcenter">
        <el-table-column type="selection" width="55" fixed>
        </el-table-column>
        <el-table-column prop="position" label="广告位置">
        </el-table-column>
        <el-table-column prop="size" label="尺寸">
        </el-table-column>
        <el-table-column prop="preview" label="预览" min-width="100px" className="preview-img-column">
          <template slot-scope="scope">
            <div class="wrap-preview-img">
              <img :src="scope.row.preview" alt="">
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="wrap-pagination">
      <el-pagination background layout="prev, pager, next" :total="total" :current-page="currPage" :page-size="pageSize" :small="small" @current-change='currentChange'>
      </el-pagination>
    </div> -->
    <el-dialog title="提示" :visible.sync="dialogVisible" :width="dialogWidth">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules" style="padding:0px">
        <el-form-item label="网站" prop="selectSite">
          <el-select v-model="form.selectSite" placeholder="选择投放的网站">
            <el-option v-for="item in siteList" :key="item.label" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请填写广告位的名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmRelative">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
import axios from "axios";
export default {
  data() {
    return {
      planData: [],
      siteList: [],
      form: {
        name: "",
        selectSite: ""
      },
      rules: {
        name: [
          { required: true, message: "请填写智能广告位的名称", trigger: "blur" }
        ],
        selectSite: [
          { required: true, message: "请选择要投放的网站", trigger: "blur" }
        ]
      },
      dialogWidth:
        document.documentElement.clientWidth > 1024 ? "500px" : "95%",
      dialogVisible: false,
      small: document.documentElement.clientWidth < 1024 ? true : false,
      searchFilters: {
        position: "",
        size: ""
      },
      filters: {
        position: [],
        size: []
      },
      tableData: [],
      selection: [],
      pageSize: 10,
      currPage: 1,
      total: 50,
      relativeDomain: ""
    };
  },
  watch: {
    searchFilters: {
      deep: true,
      handler: function() {
        getAllAds.bind(this)();
      }
    }
  },
  methods: {
    confirmRelative() {
      var ids = [];
      for (var item of this.selection) {
        ids.push(item.id);
      }
      this.$refs.form.validate(validate => {
        if (validate) {
          axios({
            url: "/Zone/Create",
            method:'post',
            data: {
              Name: this.form.name,
              AdIds: ids,
              SiteId: this.form.selectSite
            }
          }).then(resp => {
            var data = resp.data;
            this.dialogVisible = false;
            if (data.code == 0) {
              this.$message({
                message: "关联成功,到广告位管理查看",
                type: "success"
              });
            } else {
              this.$message({
                message: "关联失败，请联系管理员",
                type: "error"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    currentChange() {
      getAllAds.bind(this)();
    },
    handleFilterChange() {
      getAllAds.bind(this)();
    },
    handCheck() {
      if (this.selection.length == 0) {
        MessageBox.alert("请选择一条广告", "提示");
        return false;
      } else {
        if (this.$refs.form) {
          this.$refs.form.resetFields();
        }
        this.dialogVisible = true;
      }
    },
    handFilter() {
      getAllAds.bind(this)();
    },
    handClearFilter() {
      this.searchFilters = {};
      getAllAds.bind(this)();
    },
    selectionChange(selection) {
      this.selection = selection;
    }
  },
  created() {
    // console.log(this.$route.query.id);
    axios({
      url: "/Plan/Conditions",
      data: {
        Id: this.$route.query.id
      }
    }).then(resp => {
      //   console.log(resp.data);
      // this.filters = resp.data;
      var data = resp.data;
      var tsize = [];
      for (var item of data.size) {
        tsize.push({
          id: item.width + "," + item.height,
          name: item.width + " x " + item.height
        });
      }
      this.filters.size = tsize;
      this.filters.position = data.adType;
      // position //// size
      // adType
    });
    getAllAds.bind(this)();

    axios({
      url: "/Site/List",
      method: "post"
    }).then(resp => {
      var data = resp.data;
      for (var item of data.rows) {
        this.siteList.push({
          label: item.url,
          value: item.siteId
        });
      }
    });
  }
};
function getAllAds() {
  var tdata = {
    Id: this.$route.query.id
  };
  var position = this.searchFilters.position + "";
  position = position.trim();
  if (position != "") {
    tdata.AdTypeId = position;
  }
  var size = this.searchFilters.size.trim();
  if (size != "") {
    var tary = size.split(",");
    tdata.Width = tary[0];
    tdata.Height = tary[1];
  }
  axios({
    url: "/Plan/ListAd",
    data: tdata,
    method: "post"
  }).then(resp => {
    var data = resp.data.data;
    var tplanData = [];
    tplanData.push({
      id: data.planId,
      preview: data.logo,
      name: data.name,
      price: data.price + ' 元',
      operationStyle: data.cost,
      period: data.cycle,
      activeTime:
        data.startDate.trim() != "" && data.startDate.trim().length >= 10
          ? data.startDate.slice(0, 10) + " 到 " + data.endDate.slice(0, 10)
          : "不限制"
    });
    this.planData = tplanData;
    var tableDatas = [];
    for (var item of data.ads) {
      tableDatas.push({
        id: item.adId,
        size: item.width + " x " + item.height,
        position: item.adType,
        preview: item.image
      });
    }
    this.tableData = tableDatas;
  });
}
</script>
<style lang="less" scoped>
.label {
  color: black;
}
.wrap-btn {
  padding: 10px 0px 10px 10px;
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
.wrap-preview-img {
  font-size: 0px;
  // display: flex;
  height: 100px;
  // width: 100px;
  margin: auto;
  img {
    // max-width: 100%;
    max-height: 100%;
    margin: auto;
  }
  // justify-content: center;
  // align-items: center;
}
.wrap-pagination {
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 20px 0px 20px 0;
}
.select-relative-domains {
  text-align: center;
  .label {
    margin-right: 30px;
  }
}
</style>
<style lang="less">
.selectionAd .filters .each-filter div[role="radiogroup"] label:nth-child(1) {
  margin-left: 30px;
}
</style>


