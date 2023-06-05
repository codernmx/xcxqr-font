<template>
  <div class="app-container">
    <div class="search">
      <el-row type="flex" justify="space-between" style="margin: 15px 0">
        <el-col :span="4" style="display: flex">
          <el-input v-model="search.name" clearable placeholder="请输入用户名" size="mini" />
          <el-button type="primary" size="mini" style="margin: 0 15px" @click=" search.pageNum = 1; fetchData();">搜索
          </el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="list" border fit highlight-current-row current-row-key="id">
      <el-table-column type="index" label="序号" width="100" align="center" />
      <el-table-column prop="avatar" label="头像" width="80">
        <template v-slot="scope">
          <el-avatar :src="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="用户名" />
      <el-table-column label="openId" align="center">
        <template slot-scope="scope">
          {{ scope.row.openId ? scope.row.openId : "-" }}
        </template>
      </el-table-column>
      <el-table-column label="登录邮箱" align="center">
        <template slot-scope="scope">
          {{ scope.row.email ? scope.row.email : "-" }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="email" label="邮箱" /> -->
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="loginNum" label="登录次数" />
      <el-table-column prop="updateTime" label="最近登录时间" />
      <el-table-column label="是否启用" width="100" align="center">
        <template v-slot="scope">
          <el-switch
            v-model="scope.row.status"
            :inactive-value="1"
            :active-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="(val) => {changeStatus(val, scope.row.id);}"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="110" align="center">
        <template slot-scope="scope">
          <span class="editBtn">
            <el-tooltip class="item" effect="dark" content="修改" placement="top">
              <i class="el-icon-edit" @click="editItem(scope.row)" />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <i class="el-icon-delete" style="margin: 0 15px" @click="del(scope.row.id)" />
            </el-tooltip>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin: 30px 0"
      background
      layout="total,prev, pager, next"
      :total="search.total"
      @current-change="changePage"
    />
    <el-dialog :title="title" :visible.sync="dialog" width="40%" center>
      <div>
        <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户昵称" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="邮箱号码" prop="email">
            <el-input v-model="ruleForm.email" />
          </el-form-item>
          <el-form-item v-if="edit" label="角色信息">
            <el-select v-model="ruleForm.role" style="width: 100%" placeholder="请选择角色" multiple>
              <el-option v-for="(item,index) in roleList" :key="index" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
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
import {
  getUserList,
  addUser,
  updateUser,
  updateUserStatus,
  delUser,
  getRoleList,
  getUserRoleById
} from '@/api/user'
import { baseFileUrl } from '@/config/index'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      baseFileUrl,
      ruleForm: {
        name: '',
        password: '',
        role: []
      },
      title: '',
      list: [],
      roleList: [],
      dialog: false,
      edit: false,
      search: {
        pageNum: 1,
        name: '',
        total: 0
      }
    }
  },
  created() {
    this.fetchData()
    console.log(this.$store.getters.roles)
    this.getRoleList()
  },
  methods: {
    changeStatus(status, id) {
      console.log(status, id)
      updateUserStatus({ id, status }).then((res) => {
        if (res.code == 200) {
          this.$notify.success(res.msg)
          this.fetchData()
        }
      })
    },
    getRoleList() {
      getRoleList({
        pageNum: 1,
        pageSize: 100,
        name: ''
      }).then((res) => {
        this.roleList = res.data.rows
      })
    },
    changePage(e) {
      this.search.pageNum = e
      this.fetchData()
    },
    del(id) {
      this.$confirm('是否删除数据', { type: 'warning' }).then((res) => {
        delUser({ id }).then((res) => {
          if (res.code == 200) {
            this.$notify.success(res.msg)
            this.fetchData()
          }
        })
      })
    },
    add() {
      this.dialog = true
      this.ruleForm = { name: '', password: '' }
      this.edit = false
      this.title = '新增用户'
    },
    // 修改
    async editItem(row) {
      this.dialog = true
      this.edit = true
      this.title = '编辑用户'
      const { data } = await getUserRoleById({ id: row.id })
      this.ruleForm = {
        ...data,
        name: data.name,
        role: data.role
      }
    },
    addSubmit() {
      if (this.edit) {
        // 修改
        updateUser(this.ruleForm).then((res) => {
          if (res.code == 200) {
            this.$notify.success(res.msg)
            this.dialog = false
            this.fetchData()
          }
        })
      } else {
        addUser(this.ruleForm).then((res) => {
          if (res.code == 200) {
            this.$notify.success(res.msg)
            this.dialog = false
            this.fetchData()
          }
        })
      }
    },
    fetchData() {
      getUserList(this.search).then((res) => {
        this.list = res.data.rows
        this.search.total = res.data.count
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
