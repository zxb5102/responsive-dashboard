<template>
    <div class="auto-ad">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules" label-position="top">
            <el-form-item label="投放网站" prop="domain">
                <el-select v-model="form.domain" placeholder="请选择投放的域名">
                    <el-option label="wwww.zhchxxx.com" value="2"></el-option>
                    <el-option label="www.test1.com" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目类型" prop="category">
                <el-radio v-model="form.category" label="1">cpa</el-radio>
                <el-radio v-model="form.category" label="2">cpc</el-radio>
                <el-radio v-model="form.category" label="3">cpa</el-radio>
                <el-radio v-model="form.category" label="4">cpc</el-radio>
                <!-- <el-select v-model="form.category" placeholder="请选择项目类型">
                    <el-option label="cpc" value="2"></el-option>
                    <el-option label="cpa" value="1"></el-option>
                </el-select> -->
            </el-form-item>
            <el-form-item label="广告模式" prop="pattern">
                <el-radio v-model="form.pattern" label="1">普通图片</el-radio>
                <el-radio v-model="form.pattern" label="2">右下角悬浮</el-radio>
                <el-radio v-model="form.pattern" label="3">对联广告</el-radio>
                <!-- <el-select v-model="form.pattern" placeholder="请选择广告模式">
                    <el-option label="普通图片" value="1"></el-option>
                    <el-option label="右下角悬浮" value="2"></el-option>
                </el-select> -->
            </el-form-item>
            <el-form-item label="广告尺寸" prop="size">
                <el-radio v-model="form.size" label="1">102 x 500</el-radio>
                <el-radio v-model="form.size" label="2">100 x 200</el-radio>
                <el-radio v-model="form.size" label="3">100 x 204</el-radio>
                <el-radio v-model="form.size" label="4">102 x 500</el-radio>
                <el-radio v-model="form.size" label="5">100 x 200</el-radio>
                <el-radio v-model="form.size" label="6">100 x 204</el-radio>
                <!-- <el-select v-model="form.size" placeholder="请选择广告尺寸">
                    <el-option label="1024 x 500" value="1"></el-option>
                    <el-option label="200 x 600" value="2"></el-option>
                </el-select> -->
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">选择广告</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="提示" :visible.sync="dialogVisible" :width="dialogWidth" :before-close="handleClose">
            <span>广告关联成功,到广告位管理获取代码。</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogWidth:
        document.documentElement.clientWidth > 1024 ? "500px" : "95%",
      form: {},
      rules: {
        domain: [
          {
            required: true,
            message: "请选择要投放的网站"
          }
        ],
        category: [
          {
            required: true,
            message: "请选择要投放的网站"
          }
        ],
        pattern: [
          {
            required: true,
            message: "请选择要广告模式"
          }
        ],
        size: [
          {
            required: true,
            message: "请选择要广告尺寸"
          }
        ]
      }
    };
  },
  watch: {
    dialogVisible: function (newValue, oldValue){
    //   debugger;
      if (newValue == false) {
        this.form = {};
      }
    }
  },
  methods: {
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
</script>
<style lang="less">
.auto-ad .el-form-item__content label:nth-child(1) {
  margin-left: 30px;
}
</style>


