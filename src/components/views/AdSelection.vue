<template>
    <div class="selection">
        <div class="wrap-btn">
            <el-button type="primary" size="small" @click="handCheck">选择广告</el-button>
        </div>
        <div class="filters">
            <div class="each-filter">
                <div class="label">广告尺寸</div>
                <el-select v-model="searchFilters.size" placeholder="选择尺寸" @change="handleFilterChange">
                    <el-option :label="item.label" :value="item.value" v-for="(item,dex) in filters.size" :key="item.label"></el-option>
                </el-select>
            </div>
            <div class="each-filter">
                <div class="label">广告模式</div>
                <el-select v-model="searchFilters.pattern" placeholder="选择模式" @change="handleFilterChange">
                    <el-option :label="item.label" :value="item.value" v-for="(item,dex) in filters.pattern" :key="item.label"></el-option>
                </el-select>
            </div>
            <div class="each-filter">
                <div class="label">项目类型</div>
                <el-select v-model="searchFilters.patten" placeholder="选择类型" @change="handleFilterChange">
                    <el-option :label="item.label" :value="item.value" v-for="(item,dex) in filters.category" :key="item.label"></el-option>
                </el-select>
            </div>
            <div class="each-filter">
                <div class="label">项目审核</div>
                <el-select v-model="searchFilters.access" placeholder="审核类型" @change="handleFilterChange">
                    <el-option :label="item.label" :value="item.value" v-for="(item,dex) in filters.access" :key="item.label"></el-option>
                </el-select>
            </div>
            <div class="each-filter">
                <!-- <el-button type="primary" size="small" @click="handFilter">搜索</el-button> -->
                <el-button type="warning" size="small" @click="handClearFilter">清空过滤条件</el-button>
            </div>
        </div>
        <div class="main">
            <el-table :data="tableData" style="width: 100%" @selection-change="selectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="name" label="广告名称">
                </el-table-column>
                <el-table-column prop="demand" label="推广要求">
                </el-table-column>
                <el-table-column prop="chargePattern" label="计费模式">
                </el-table-column>
                <el-table-column prop="price" label="单价">
                </el-table-column>
                <el-table-column prop="size" label="尺寸">
                </el-table-column>
                <el-table-column prop="preview" label="预览">
                    <template slot-scope="scope">
                        <div class="wrap-preview-img">
                            <img :src="scope.row.preview" alt="">
                        </div>
                        <!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
                    </template>
                </el-table-column>
                <el-table-column prop="period" label="结算周期">
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
export default {
  data() {
    return {
      small: false,
      searchFilters: {},
      filters: {},
      tableData: [],
      selection: [],
      pageSize: 10,
      currPage: 1,
      total: 50
    };
  },
  methods: {
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
      url: "/getAllFilters"
    }).then(resp => {
      //   console.log(resp.data);
      this.filters = resp.data;
    });
    getAllAds.bind(this)();
  }
};
function getAllAds() {
  axios({
    url: "/getAllAds",
    data: {
      ...this.filters,
      pageSize: this.pageSize,
      currPage :this.currPage
    }
  }).then(resp => {
    //   console.log(resp.data);
    this.tableData = resp.data.rows;
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
  display: flex;
  justify-content: left;
  align-items: center;
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
</style>


