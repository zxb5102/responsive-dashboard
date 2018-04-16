<template>
  <div class="selection">
    <div class="filters">
      <div class="each-filter" v-if="filters.operationStyle.length > 1">
        <div class="label">计费模式</div>
        <el-checkbox-group v-model="searchFilters.operationStyle">
          <el-checkbox v-for="(item,dex) in filters.operationStyle" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="each-filter" v-if="filters.position.length > 1">
        <div class="label">广告位置</div>
        <el-checkbox-group v-model="searchFilters.position">
          <el-checkbox v-for="item in filters.position" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="each-filter" v-if="filters.category.length > 1">
        <div class="label">网站类别</div>
        <el-checkbox-group v-model="searchFilters.category">
          <el-checkbox v-for="item in filters.category" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="main">
      <el-table :data="tableData" style="width: 100%" @selection-change="selectionChange" border header-cell-class-name='tcenter' cell-class-name="tcenter">
        <el-table-column prop="name" label="项目名称">
        </el-table-column>
        <el-table-column prop="price" label="单价">
        </el-table-column>
        <el-table-column prop="operationStyle" label="计费模式">
        </el-table-column>
        <el-table-column prop="category" label="网站类别">
        </el-table-column>
        <el-table-column prop="period" label="结算周期">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="getDetail(scope.row)">获取代码</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="wrap-pagination">
      <el-pagination background layout="prev, pager, next" :total="total" :current-page="currPage" :page-size="pageSize" :small="small" @current-change='currentChange'>
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
import axios from "axios";
const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
  data() {
    return {
      checkedCities1: ["上海", "北京"],
      cities: cityOptions,
      dialogWidth:
        document.documentElement.clientWidth > 1024 ? "500px" : "95%",
      dialogVisible: false,
      small: document.documentElement.clientWidth < 1024 ? true : false,
      searchFilters: {
        operationStyle: [],
        category: [],
        position: []
      },
      filters: {
        operationStyle: [],
        category: [],
        position: []
      },
      tableData: [],
      selection: [],
      pageSize: 10,
      currPage: 1,
      total: 50,
      relativeDomain: "",
      form: {},
      rules: {
        domain: [{ required: true, message: "请选择投放的站点" }]
      }
    };
  },
  watch: {
    searchFilters: {
      deep: true,
      handler: function(after, before) {
        getAllAds.bind(this)();
      }
    }
  },
  methods: {
    getDetail(row) {
      this.$router.push({
        path: "selectionAd",
        query: { id: row.id }
      });
    },
    confirmRelative() {
      this.$message({
        message: "关联成功,到广告位管理查看",
        type: "success"
      });
      this.dialogVisible = false;
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
    axios({
      url: "/Plan/Conditions"
    }).then(resp => {
      //   console.log(resp.data);
      var data = resp.data;
      data.operationStyle = data.cost;
      data.category = data.cls;
      data.position = data.adType;
      this.filters = data;
    });
    getAllAds.bind(this)();
  }
};
function getAllAds() {
  axios({
    url: "/Plan/List",
    data: {
      PageSize: this.pageSize,
      CurrPage: this.currPage,
      CostId: this.searchFilters.operationStyle,
      ClsId: this.searchFilters.category,
      AdTypeId: this.searchFilters.position
    }
  }).then(resp => {
    var data = resp.data;
    var trows = resp.data.rows;
    for (var item of trows) {
      item.id = item.planId;
      item.operationStyle = item.cost;
      item.period = item.cycle;
      item.category = item.cls;
      item.img = item.logo;
    }
    this.tableData = trows;
    this.total = parseInt(data.total);
    // this.r
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