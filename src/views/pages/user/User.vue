<template>
  <div class="app-container">
    <div class="search">
      <el-row type="flex" justify="space-between" style="margin:15px 0">
        <el-col :span="4" style="display:flex">
          <el-input v-model="search.NAME" placeholder="请输入用户名" size="mini"></el-input>
          <el-button type="primary" size="mini" style="margin:0 15px" @click="fetchData()">搜索</el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="primary" size="mini" icon="el-icon-plus"
            @click="dialog = true;ruleForm = {NAME: '',PASSWORD: ''};edit = false">添加</el-button>
        </el-col>

      </el-row>

    </div>
    <el-table :data="list"  border fit highlight-current-row>
      <el-table-column prop="ID" label="ID" width="50" />
      <el-table-column prop="AVATAR_URL" label="头像" width="80">
        <template v-slot="scope">
          <el-avatar :src="scope.row.AVATAR_URL"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="NICK_NAME" label="用户名">
      </el-table-column>
      <el-table-column prop="OPENID" label="OPENID">
      </el-table-column>

      <el-table-column prop="CREATE_TIME" label="创建时间" />

      <el-table-column label="操作" width="110" align="center">
        <template slot-scope="scope">
          <span class="editBtn">
            <el-tooltip class="item" effect="dark" content="修改" placement="top">
              <i class="el-icon-edit" @click="editItem(scope.row)"></i>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <i class="el-icon-delete" @click="del(scope.row.ID)" style="margin:0 15px"></i>
            </el-tooltip>

          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin: 30px 0" @current-change="changePage" background layout="total,prev, pager, next"
      :total="search.total">
    </el-pagination>

    <el-dialog title="" :visible.sync="dialog" width="40%">
      <div>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账户" prop="name">
            <el-input v-model="ruleForm.NICK_NAME"></el-input>
          </el-form-item>
          <!-- <el-form-item label="密码" prop="name">
            <el-input v-model="ruleForm.PASSWORD"></el-input>
          </el-form-item> -->
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, addUser, updateUser, delUser } from '@/api/user'
// import md5 from 'js-md5'
export default {
  filters: {
    statusFilter (status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    //     md5 (val) {
    //       return md5(val)
    //     }
  },
  data () {
    return {
      ruleForm: {
        NICK_NAME: '',
        PASSWORD: '',
      },
      list: null,
      dialog: false,
      edit: false,
      search: {
        pageNum: 1,
        NICK_NAME: '',
        total: 0,
      }
    }
  },
  created () {
    this.fetchData()
    console.log(this.$store.getters.roles)
  },
  methods: {
    changePage (e) {
      this.search.pageNum = e
      this.fetchData()
    },
    del (ID) {
      this.$confirm('是否删除数据', { type: 'warning' }).then(res => {
        delUser({ ID }).then(res => {
          if (res.code == 200) {
            this.$notify.success(res.msg)
            this.fetchData()
          }
        })
      })
    },
    // 修改
    editItem (row) {
      this.dialog = true
      this.ruleForm = JSON.parse(JSON.stringify(row))
      this.edit = true
    },
    addSubmit () {
      if (this.edit) { //修改
        updateUser(this.ruleForm).then(res => {
          if (res.code == 200) {
            this.$notify.success(res.msg)
            this.dialog = false
            this.fetchData()
          }
        })
      } else {
        addUser(this.ruleForm).then(res => {
          if (res.code == 200) {
            this.$notify.success(res.msg)
            this.dialog = false
            this.fetchData()
          }
        })
      }
    },
    fetchData () {
      getUserList(this.search).then(res => {
        console.log(res, 'res')
        this.list = res.data
        this.search.total = res.total
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .editBtn {
    font-size: 18px;
  }
}
</style>
