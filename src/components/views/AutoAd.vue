<template>
  <div class="auto-ad">
    <div class="filters">
      <!-- <div class="each-filter" v-if="siteList.length > 1">
        <div class="label">投放的网站</div>
        <el-select v-model="selectSite">
          <el-option v-for="item in siteList" :key="item.label" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div> -->
      <div class="each-filter" v-if="filters.operationStyle.length > 1">
        <div class="label">计费类型</div>
        <el-radio-group v-model="searchFilters.operationStyle">
          <el-radio :label="item.id" v-for="item in filters.operationStyle" :key="item.id" @change="operationStyleChange">{{item.name}}</el-radio>
        </el-radio-group>
      </div>
      <div class="each-filter" v-if="filters.position.length > 1">
        <div class="label">广告位置</div>
        <el-radio-group v-model="searchFilters.position">
          <el-radio :label="item.id" v-for="item in filters.position" :key="item.id" @change="positionChange">{{item.name}}</el-radio>
        </el-radio-group>
      </div>
      <div class="each-filter" v-if="filters.size.length > 1">
        <div class="label">广告尺寸</div>
        <el-radio-group v-model="searchFilters.size">
          <el-radio :label="item.id" v-for="item in filters.size" :key="item.id" @change="sizeChange">{{item.name}}</el-radio>
        </el-radio-group>
      </div>
      <div class="each-filter" v-if="filters.size.length > 1">
        <el-button type="primary" size="small" @click="handleLink">关联广告</el-button>
      </div>
    </div>
    <div class="main">
      <el-table :data="tableData" border header-cell-class-name='tcenter' cell-class-name="tcenter" @selection-change="selectChange">
        <el-table-column type="selection" width="55" fixed>
        </el-table-column>
        <el-table-column prop="planName" label="项目名称">
        </el-table-column>
        <el-table-column prop="price" label="单价">
        </el-table-column>
        <el-table-column prop="preview" label="预览">
          <template slot-scope="scope">
            <div class="wrap-preview-img">
              <img :src="scope.row.preview" alt="">
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <el-dialog title="提示" :visible.sync="dialogVisible" :width="dialogWidth" :before-close="handleClose">
      <span>广告关联成功,到广告位管理获取代码。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
    <el-dialog title="填写信息" :visible.sync="dialogVisible" :width="dialogWidth">
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
      currPage: 1,
      PageSize: 10,
      total: 10,
      tableData: [],
      searchFilters: {},
      selections: [],
      filters: {
        size: [],
        position: [],
        operationStyle: []
      },
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
      siteList: [],
      selectSite: undefined,
      dialogVisible: false,
      dialogWidth: document.documentElement.clientWidth > 1024 ? "500px" : "95%"
    };
  },
  created() {
    axios({
      url: "/Site/List"
    }).then(resp => {
      var data = resp.data;
      for (var item of data.rows) {
        this.siteList.push({
          label: item.url,
          value: item.siteId
        });
      }
    });
    getData.bind(this)({
      // CurPage: this.currPage,
      // PageSize: this.PageSize
    });
  },
  watch: {
    dialogVisible: function(newValue, oldValue) {
      //   debugger;
      if (newValue == false) {
        this.form = {};
      }
    }
  },
  methods: {
    confirmRelative() {
      var ids = [];
      for (var item of this.selections) {
        ids.push(item.id);
      }
      this.$refs.form.validate(validate => {
        if (validate) {
          axios({
            url: "/Zone/Create",
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
    handleLink() {
      if (this.selections.length < 1) {
        MessageBox.alert("请选择一条广告", "提示");
        return false;
      }
      if (this.$refs.form) {
        this.$refs.form.clearValidate();
      }
      this.dialogVisible = true;
    },
    selectChange(selections) {
      this.selections = selections;
    },
    operationStyleChange() {
      getData.bind(this)({
        CostId: this.searchFilters.operationStyle
      });
    },
    positionChange() {
      getData.bind(this)({
        CostId: this.searchFilters.operationStyle,
        AdTypeId: this.searchFilters.position
      });
    },
    sizeChange() {
      getData.bind(this)({
        CostId: this.searchFilters.operationStyle,
        AdTypeId: this.searchFilters.position,
        Width: this.searchFilters.size.split(",")[0],
        Height: this.searchFilters.size.split(",")[1]
      });
    },

    handleClose() {},
    onSubmit() {
      this.$refs.form.validate(validate => {
        if (validate) {
          this.dialogVisible = true;
        } else {
          return false;
        }
      });
    }
  }
};
function getData(queryData) {
  axios({
    url: "/Ad/List",
    data: queryData
  }).then(resp => {
    var data = resp.data;
    var tsize = [];
    // debugger;
    for (var item of data.conds.size) {
      tsize.push({
        id: item.width + "," + item.height,
        name: item.width + " x " + item.height
      });
      if (item.selected) {
        //添加选择的size
        this.searchFilters.size = item.width + "," + item.height;
      }
    }
    this.filters.size = tsize;
    this.filters.position = data.conds.adType;
    for (var item of data.conds.adType) {
      if (item.selected) {
        //添加方位的选择
        this.searchFilters.position = item.id;
      }
    }

    this.filters.operationStyle = data.conds.cost;
    for (var item of data.conds.cost) {
      if (item.selected) {
        //添加操作类型的选择
        this.searchFilters.operationStyle = item.id;
      }
    }

    var tdatas = [];
    for (var item of data.rows) {
      tdatas.push({
        id: item.adId,
        planId: item.planId,
        planName: item.planName,
        price: item.price + " 元",
        preview: item.image
      });
    }
    this.tableData = tdatas;
    this.total = data.total;
  });
}
</script>
<style lang="less" soped>
.auto-ad .el-form-item__content label:nth-child(1) {
  margin-left: 30px;
}
.label {
  color: black;
}
.filters {
  padding: 10px 0px 10px 10px;
}
.each-filter {
  margin-right: 5px;
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
</style>


