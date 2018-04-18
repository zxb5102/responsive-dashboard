<template>
    <div class="userAccount">
        <div class="wrap-label-tools">
            <div class="account-label">
                <span>基本信息</span>
            </div>
            <div class="tools">
                <div v-if="!edit">
                    <el-button type="info" icon="el-icon-edit" size="mini" @click="handEdit">编辑</el-button>
                </div>
                <div v-else>
                    <el-button type="success" icon="el-icon-check" size="mini" @click="handCommit">确认</el-button>
                    <el-button type="warning" icon="el-icon-close" size="mini" @click="handCancel">取消</el-button>
                </div>
            </div>
        </div>
        <div class="main">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名" class="e-form-item">
                    <el-input v-model="form.name" v-if="edit"></el-input>
                    <span v-else>{{form.name}}</span>
                </el-form-item>
                <el-form-item label="QQ" class="e-form-item">
                    <el-input v-model="form.qq" v-if="edit"></el-input>
                    <span v-else>{{form.qq}}</span>
                </el-form-item>
                <!-- <el-form-item label="邮箱" class="e-form-item">
                    <el-input v-model="form.mail" v-if="edit"></el-input>
                    <span v-else>{{form.mail}}</span>
                </el-form-item> -->
            </el-form>
        </div>
        <!-- 财务信息 -->
        <div class="wrap-label-tools">
            <div class="account-label">
                <span>财务信息</span>
            </div>
            <!-- <div class="tools">
                <div v-if="!edit">
                    <el-button type="info" icon="el-icon-edit" size="mini" @click="handEdit">编辑</el-button>
                </div>
                <div v-else>
                    <el-button type="success" icon="el-icon-check" size="mini" @click="handCommit">确认</el-button>
                    <el-button type="warning" icon="el-icon-close" size="mini" @click="handCancel">取消</el-button>
                </div>
            </div> -->
        </div>
        <div class="main">
            <el-form ref="finaceForm" :model="form" label-width="90px">
                <el-form-item label="收款银行" class="e-form-item">
                    <el-input v-model="form.bankName" v-if="editFinance"></el-input>
                    <span v-else>{{form.bankName}}</span>
                </el-form-item>
                <el-form-item label="开户地分行" class="e-form-item">
                    <el-input v-model="form.bankName2" v-if="editFinance"></el-input>
                    <span v-else>{{form.bankName2}}</span>
                </el-form-item>
                <el-form-item label="银行账号" class="e-form-item">
                    <el-input v-model="form.bankAccountNum" v-if="editFinance"></el-input>
                    <span v-else>{{form.bankAccountNum}}</span>
                </el-form-item>
                <el-form-item label="收款人" class="e-form-item">
                    <el-input v-model="form.bankAccountName" v-if="editFinance"></el-input>
                    <span v-else>{{form.bankAccountName}}</span>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      //   isShowTool: true,
      form: {},
      edit: false,
      editFinance: false
    };
  },
  methods: {
    handCommit() {
      this.form.originName = this.form.name;
      this.form.originQQ = this.form.qq;
      //   this.form.originMail = this.form.mail;
      this.edit = false;
    },
    handCancel() {
      this.form.qq = this.form.originQQ;
      this.form.name = this.form.originName;
      //   this.form.phone = this.form.originPhone;
      this.edit = false;
      //   this.form.originMail = this.form.mail;
      //   this.form.originName
    },
    handEdit() {
      //   this.isShowTool = false;
      this.edit = true;
    }
  },
  created() {
    axios({
      method: "post",
      url: "/Account/GetInfo"
    }).then(resp => {
      var data = resp.data;
      //   data.userName = data
      data.name = data.originName = data.userName;
      data.qq = data.originQQ = data.QQ;
      data.bankName = data.payBank;
      data.bankName2 = data.payMethod;
      data.bankAccountNum = data.payAccount;
      data.bankAccountName = data.payUserName;
      this.form = data;
      // 	userName
      // 	password
      // 	QQ
      // 	payMethod
      // 	payUserName
      // 	payBank
      // 	payAccount
    });
  }
};
</script>
<style lang="less" scoped>
.tools {
  //   padding: 10px 0px 10px 10px;
  padding-left: 10px;
}
.userAccount {
  padding-right: 10px;
  background-color: white;
  // min-height: 1800px;
}
.wrap-label-tools {
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 20px;
  padding-top: 20px;
  border-bottom: 1px solid black;
  .account-label {
    font-size: 24px;
  }
}
</style>
<style lang='less'>
.e-form-item {
  margin-left: 30px;
  label {
    text-align: left;
    min-width: 70px;
  }
}
</style>


