<template>
  <div class="app-container">
    <div class="search">
      <el-row type="flex" justify="space-between" style="margin: 15px 0">
        <el-col :span="4" style="display: flex">
          <el-input v-model="search.name" clearable placeholder="请输入用户名" size="mini" />
          <el-button type="primary" disabled size="mini" style="margin: 0 15px" @click=" search.pageNum = 1; fetchData();">搜索
          </el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="primary" size="mini" icon="el-icon-plus" disabled @click="add">添加</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="list" border fit highlight-current-row @row-dblclick="dbClick">
      <el-table-column type="index" label="序号" width="100" align="center" />
      <el-table-column prop="avatar" label="头像" width="80">
        <template v-slot="scope">
          <el-avatar :src="baseFileUrl + scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="用户名" />
      <el-table-column label="openId" align="center">
        <template slot-scope="scope">
          {{ scope.row.openId ? scope.row.openId : "-" }}
        </template>
      </el-table-column>
      <el-table-column label="邀请用户数" width="110" align="center">
        <template slot-scope="scope">
          <el-tag type="danger">{{ scope.row.children.length }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="注册时间" />
    </el-table>
    <el-pagination
      style="margin: 30px 0"
      background
      layout="total,prev, pager, next"
      :total="search.total"
      @current-change="changePage"
    />

    <el-dialog :title="title" :visible.sync="dialog" width="50%" center>
      <el-table :data="showTable" border fit highlight-current-row>
        <el-table-column type="index" label="序号" width="100" align="center" />
        <el-table-column prop="avatar" label="头像" width="80">
          <template v-slot="scope">
            <el-avatar :src="baseFileUrl + scope.row.avatar" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户名" />
        <el-table-column label="openId" align="center">
          <template slot-scope="scope">
            {{ scope.row.openId ? scope.row.openId : "-" }}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserInviteList,
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
        PASSWORD: '',
        ROLE: []
      },
      showTable: [],
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
    // console.log(this.$store.getters.roles);
    // this.getRoleList();
  },
  methods: {
    dbClick(row) {
      this.dialog = true
      this.showTable = row.children
    },
    changeStatus(STATUS, ID) {
      console.log(STATUS, ID)
      updateUserStatus({ ID, STATUS }).then((res) => {
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
        this.roleList = res.data
      })
    },
    changePage(e) {
      this.search.pageNum = e
      this.fetchData()
    },
    del(ID) {
      this.$confirm('是否删除数据', { type: 'warning' }).then((res) => {
        delUser({ ID }).then((res) => {
          if (res.code == 200) {
            this.$notify.success(res.msg)
            this.fetchData()
          }
        })
      })
    },
    add() {
      this.dialog = true
      this.ruleForm = { name: '', PASSWORD: '' }
      this.edit = false
      this.title = '新增用户'
    },
    // 修改
    async editItem(row) {
      this.dialog = true
      this.edit = true
      this.title = '编辑用户'
      const { data } = await getUserRoleById({ ID: row.ID })
      this.ruleForm = {
        ...data,
        name: data.name,
        ROLE: data.role
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
      getUserInviteList(this.search).then((res) => {
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
