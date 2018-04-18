<template>
  <div>
    <div>
      <div class="tools">
        <div v-if="isShowTool">
          <el-button type="primary" icon="el-icon-plus" size="small" @click="handAdd">新增</el-button>
          <el-button type="info" icon="el-icon-edit" size="small" @click="handEdit">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="handDel">删除</el-button>
        </div>
        <div v-else>
          <el-button type="success" icon="el-icon-check" size="small" @click="handCommit">确认</el-button>
          <el-button type="warning" icon="el-icon-close" size="small" @click="handCancel">取消</el-button>
        </div>
      </div>
      <div class="main">
        <el-table :data="tableData" style="width: 100%" border @select="handSelect">
          <el-table-column type="selection" width="55" fixed>
          </el-table-column>
          <el-table-column label="域名" min-width="100" fixed>
            <template slot-scope="scope">
              <span>
                {{scope.row.domain}}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称" min-width="100">
            <template slot-scope="scope">
              <span v-if="!scope.row.edit">
                {{scope.row.name}}
              </span>
              <span v-else>
                <el-input v-model="scope.row.name">
                </el-input>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="category" label="网站类别" min-width="150">
            <template slot-scope="scope">
              <span v-if="!scope.row.edit">
                {{scope.row.category}}
              </span>
              <span v-else>
                <el-select v-model="scope.row.category">
                  <el-option v-for="item in siteCategorys" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="adNum" label="广告位">
          </el-table-column>
        </el-table>
        <div class="wrap-pagination">
          <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="currPage" :small="small" @current-change="currChange">
          </el-pagination>
        </div>
      </div>
      <div class="dialog">
        <el-dialog title="新建" :visible.sync="showDialog" :width="dialogWidth">
          <div>
            <el-form ref="form" :model="form" label-width="60px" style="padding:0px" :rules="rules">
              <el-form-item label="域名" prop="domain">
                <el-input v-model="form.domain"></el-input>
              </el-form-item>
              <el-form-item label="名称" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="类型" prop="category">
                <el-select v-model="form.category">
                  <el-option v-for="item in siteCategorys" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelAdd">取 消</el-button>
            <el-button type="primary" @click="commitAdd">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      small: false,
      total: 50,
      currPage: 1,
      pageSize: 10,
      showDialog: false,
      dialogWidth:
        document.documentElement.clientWidth < 1024 ? "95%" : "500px",
      form: {},
      tableData: [],
      siteCategorys: [],
      selections: [],
      isShowTool: true,
      currEditRow: undefined,
      rules: {
        name: [{ required: true, message: "请输入网站名称", trigger: "blur" }],
        domain: [{ required: true, message: "请输入域名", trigger: "blur" }],
        category: [{ required: true, message: "请选择分类", trigger: "blur" }]
      }
    };
  },
  methods: {
    currChange(currPage) {
      this.currPage = currPage;
      setTableData.bind(this)();
      // console.log(currPage);
      // axios({
      //   url: "/getSitList",
      //   data: {
      //     pageSize: this.pageSize,
      //     currPage: this.currPage
      //   }
      // }).then(resp => {
      //   this.tableData = resp.data.rows;
      // });
    },
    cancelAdd() {
      this.showDialog = false;
      this.$refs.form.resetFields();
    },
    commitAdd() {
      this.$refs.form.validate(validate => {
        if (validate) {
          axios({
            url: "/Site/Create",
            method: "post",
            data: {
              Name: this.form.name,
              Url: this.form.domain,
              ClassId: this.form.category
            }
          }).then(resp => {
            var data = resp.data;
            if (data.code == 0) {
              // debugger;
              var item = Object.assign({ adNum: 0, edit: false }, this.form);
              // debugger;
              item.originDoamin = item.domain;
              for (var each of this.siteCategorys) {
                if (each.id == item.category) {
                  item.originCategory = item.category = each.name;
                }
              }
              // debugger;
              item.id = data.data;
              this.tableData.push(item);
            } else {
              this.$message({
                message: "创建站点出错，请联系管理员",
                type: "error"
              });
            }
            this.showDialog = false;
            this.$refs.form.resetFields();
          });
        } else {
          return false;
        }
      });
    },
    handCommit() {
      this.currEditRow.originName = this.currEditRow.name;
      this.currEditRow.originCategory = this.currEditRow.category;
      for (var item of this.siteCategorys) {
        if (item.id == this.currEditRow.category) {
          this.currEditRow.originCategory = this.currEditRow.category =
            item.name;
        }
      }
      this.currEditRow.edit = false;
      this.isShowTool = true;
    },
    handCancel() {
      this.currEditRow.name = this.currEditRow.originName;
      this.currEditRow.category = this.currEditRow.originCategory;
      this.isShowTool = true;
      this.currEditRow.edit = false;
    },
    handSelect(selection, row) {
      this.selections = selection;
    },
    handAdd() {
      this.showDialog = true;
    },
    handDel() {
      var size = this.selections.length;
      if (size <= 0) {
        MessageBox.alert("请选择一条信息删除", "提示");
        return false;
      } else {
        MessageBox.confirm("确认删除" + size + "条信息吗？").then(action => {
          for (var item of this.selections) {
            var dex = this.tableData.indexOf(item);
            this.tableData.splice(dex, 1);
          }
        });
      }
    },
    handEdit() {
      if (this.selections.length != 1) {
        MessageBox.alert("请选择一个作品进行编辑", "提示");
        return false;
      }
      this.currEditRow = this.selections[0];
      this.selections[0].edit = true;
      this.isShowTool = false;
    }
  },
  created() {
    setTableData.bind(this)();
    axios({
      method: "post",
      url: "/Site/GetClass"
    }).then(resp => {
      var data = resp.data;
      this.siteCategorys = data;
    });
    // axios({
    //   url: "/getSiteCategorys"
    // }).then(resp => {
    //   this.siteCategorys = resp.data.rows;
    // });
  }
};
function resetForm() {
  this.form = {
    id: new Date().getTime(),
    domain: "",
    name: "",
    category: "",
    adNum: 0,
    status: ""
  };
}
function setTableData() {
  axios({
    method: "post",
    url: "/Site/List",
    data: {
      CurPage: this.currPage,
      PageSize: this.pageSize
    }
  }).then(resp => {
    //  console.log(resp.data);
    for (var item of resp.data.rows) {
      item.id = item.siteId;
      item.originName = item.name;
      item.category = item.cls;
      item.originCategory = item.category;
      item.adNum = item.adCount;
      item.domain = item.url;
      item.edit = false;
    }
    this.tableData = resp.data.rows;
    this.total = parseInt(resp.data.total);
  });
}
</script>
<style scoped lang='less'>
// * {
//   background-color: white;
// }
.tools {
  padding: 10px 0px 10px 10px;
}
.main {
  padding-left: 10px;
  padding-right: 10px;
}
.wrap-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>