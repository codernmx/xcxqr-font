<template>
  <div class="app-container">
    <div class="search">
      <el-row type="flex" justify="space-between" style="margin: 15px 0">
        <el-col :span="4" style="display: flex">
          <el-input
            v-model="search.NAME"
            placeholder="请输入原文件名"
            size="mini"
            clearable
          />
          <el-button
            type="primary"
            size="mini"
            style="margin: 0 15px"
            @click="fetchData()"
          >搜索</el-button>
        </el-col>
        <el-col :span="1">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-plus"
            @click="
              dialog = true;
              fileList = [];
              edit = false;
            "
          >添加</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
    >
      <el-table-column prop="ID" label="ID" width="50" />
      <el-table-column label="图片" width="150" align="center">
        <template v-slot="scope">
          <el-image
            lazy
            style="width: 75px; height: 75px"
            :src="getImgUrl(scope.row)"
            :preview-src-list="[getImgUrl(scope.row)]"
          />
        </template>
      </el-table-column>

      <el-table-column
        label="地址"
        width="150"
        align="center"
        show-overflow-tooltip
      >
        <template v-slot="scope">
          <span class="copyUrl" @click="copy('.copyUrl', getUrl(scope.row))">{{
            getUrl(scope.row)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="OLD_NAME" label="原始名称" />
      <el-table-column prop="SUFFIX" label="文件类型" width="100" />
      <el-table-column prop="FOLDER" label="文件夹" width="150" />
      <el-table-column label="文件名" show-overflow-tooltip>
        <template v-slot="scope">
          <span class="copyName" @click="copy('.copyName', scope.row.NAME)">{{
            scope.row.NAME
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="SIZE" label="文件大小" />
      <el-table-column prop="CREATE_TIME" label="创建时间" />

      <el-table-column label="操作" width="110" align="center">
        <template slot-scope="scope">
          <span class="editBtn">
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
            >
              <i
                class="el-icon-delete"
                style="margin: 0 15px"
                @click="del(scope.row.id)"
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

    <el-dialog
      title="上传附件"
      :visible.sync="dialog"
      width="40%"
      center
      :before-close="dialogClose"
    >
      <div>
        <el-upload
          class="upload-demo"
          action="/api/upload/file"
          :file-list="fileList"
          list-type="picture"
          multiple
          :on-success="upploadSuccess"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            上传之后可以以原文件名检索
          </div>
        </el-upload>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Clipboard from 'clipboard'

import { getFileList, addUser, updateUser, delUser } from '@/api/user'
import { mapGetters } from 'vuex'
export default {
  components: {
    Clipboard
  },
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
      fileList: [],
      ruleForm: {
        NICK_NAME: '',
        PASSWORD: ''
      },
      list: null,
      dialog: false,
      edit: false,
      search: {
        pageNum: 1,
        NAME: '',
        total: 0
      }
    }
  },
  computed: {
    ...mapGetters(['config'])
  },
  created() {
    this.fetchData()
    console.log(this.$store.getters.roles)
  },
  methods: {
    copy(dom, val) {
      var clipboard = new Clipboard(dom, {
        text: function() {
          return val
        }
      })
      // 复制成功回调
      clipboard.on('success', () => {
        this.$notify.success('复制成功')
        // 释放内存
        clipboard.destroy()
      })
      // 复制失败回调
      clipboard.on('error', () => {
        this.$notify.error('暂不支持复制')
        // 释放内存
        clipboard.destroy()
      })
    },

    upploadSuccess(response, file, fileList) {
      console.log(response, 'response')
      this.$message.success('上传成功')
    },
    getImgUrl(row) {
      const suffix = row.NAME.substring(row.NAME.lastIndexOf('.'))
      if (suffix == '.jpg' || suffix == '.png' || suffix == '.jpeg') {
        return this.config.BASE_URL_FILE + row.PATH
      } else {
        return (
          this.config.BASE_URL_FILE +
          '2022-05-11/c877923f5d4b14bf397c836c3e087f71.webp'
        )
      }
    },
    getUrl(row) {
      return this.config.BASE_URL_FILE + row.PATH
    },
    /* 关闭弹窗刷新列表 */
    dialogClose() {
      this.dialog = false
      this.fetchData()
    },
    changePage(e) {
      this.search.pageNum = e
      this.fetchData()
    },
    del(id) {
      this.$confirm('是否删除数据', { type: 'warning' }).then((res) => {
        this.$notify.error('开发中~~')
      })
    },
    // 修改
    editItem(row) {
      this.dialog = true
      this.ruleForm = JSON.parse(JSON.stringify(row))
      this.edit = true
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
      getFileList(this.search).then((res) => {
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
