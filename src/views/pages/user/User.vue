<template>
  <div class="app-container">
    <div class="search">
      <el-row type="flex" justify="space-between" style="margin: 15px 0">
        <el-col :span="4" style="display: flex">
          <el-input
            v-model="search.NICK_NAME"
            clearable
            placeholder="请输入用户名"
            size="mini"
          />
          <el-button
            type="primary"
            size="mini"
            style="margin: 0 15px"
            @click="
              search.pageNum = 1;
              fetchData();
            "
          >搜索</el-button>
        </el-col>
        <el-col :span="1">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-plus"
            @click="add"
          >添加</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column prop="ID" label="ID" width="100" align="center" />
      <el-table-column prop="AVATAR_URL" label="头像" width="80">
        <template v-slot="scope">
          <el-avatar :src="scope.row.AVATAR_URL" />
        </template>
      </el-table-column>
      <el-table-column prop="NICK_NAME" label="用户名" />
      <el-table-column prop="OPENID" label="OPENID" />
      <el-table-column prop="EMAIL" label="邮箱" />
      <el-table-column prop="CREATE_TIME" label="创建时间" />
      <el-table-column prop="UPDATE_TIME" label="登录时间" />
      <el-table-column label="操作" width="110" align="center">
        <template slot-scope="scope">
          <span class="editBtn">
            <el-tooltip
              class="item"
              effect="dark"
              content="修改"
              placement="top"
            >
              <i class="el-icon-edit" @click="editItem(scope.row)" />
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
            >
              <i
                class="el-icon-delete"
                style="margin: 0 15px"
                @click="del(scope.row.ID)"
              />
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
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户昵称" prop="name">
            <el-input v-model="ruleForm.NICK_NAME" />
          </el-form-item>

          <el-form-item label="角色信息">
            <el-select
              v-model="ruleForm.ROLE"
              style="width: 100%"
              placeholder="请选择角色"
              multiple
            >
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.NAME"
                :value="item.ID"
              />
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
  delUser,
  getRoleList
} from '@/api/user'
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
      ruleForm: {
        NICK_NAME: '',
        PASSWORD: ''
      },
      title: '',
      list: [],
      roleList: [],
      dialog: false,
      edit: false,
      search: {
        pageNum: 1,
        NICK_NAME: '',
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
    getRoleList() {
      getRoleList({
        pageNum: 1,
        pageSize: 100,
        NAME: ''
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
      this.ruleForm = { NICK_NAME: '', PASSWORD: '' }
      this.edit = false
      this.title = '新增用户'
    },
    // 修改
    editItem(row) {
      this.dialog = true
      this.ruleForm = JSON.parse(JSON.stringify(row))
      this.edit = true
      this.title = '编辑用户'
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
