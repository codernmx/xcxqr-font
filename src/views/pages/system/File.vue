<template>
  <div class="app-container">
    <div class="search">
      <el-row type="flex" justify="space-between" style="margin: 15px 0">
        <el-col :span="5" style="display: flex">
          <el-input
              v-model="search.name"
              placeholder="请输入原文件名"
              size="mini"
              clearable
          />
          <el-button
              type="primary"
              size="mini"
              style="margin: 0 15px"
              @click="
              search.pageNum = 1;
              fetchData();
            "
          >搜索
          </el-button>
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
          >添加
          </el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column type="index" label="序号" width="80" align="center"/>
      <el-table-column label="预览" width="150" align="center">
        <template v-slot="scope">
          <el-image
              v-if="getImgUrl(scope.row).length > 15"
              lazy
              style="width: 75px; height: 75px"
              :src="getImgUrl(scope.row)"
              fit="scale-down"
              :preview-src-list="[getImgUrl(scope.row)]"
          />
          <span v-else class="suffix">{{ getImgUrl(scope.row) }}</span>
        </template>
      </el-table-column>

      <el-table-column
          label="URL地址"
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
      <el-table-column prop="oldName" label="原始名称" show-overflow-tooltip/>
      <el-table-column prop="suffix" label="文件类型" width="100"/>
      <el-table-column label="文件名" show-overflow-tooltip align="center">
        <template v-slot="scope">
          <span class="copyName" @click="copy('.copyName', scope.row.name)">{{
              scope.row.name
            }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文件大小" width="100">
        <template v-slot="scope">
          <span>{{ (scope.row.size / 1024 / 1024).toFixed(4) }}MB</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"/>

      <el-table-column label="操作" width="110" align="center">
        <template slot-scope="scope">
          <span class="editBtn">
            <el-tooltip
                class="item"
                effect="dark"
                content="修改"
                placement="top"
            >
              <i class="el-icon-edit" @click="editItem(scope.row)"/>
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
            action="/api/upload/file"
            :file-list="fileList"
            list-type="picture"
            drag
            multiple
            :on-success="upploadSuccess"
            style="width: 100%"
        >
          <!-- <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            上传之后可以以原文件名检索
          </div> -->
          <i class="el-icon-upload"/>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
    </el-dialog>
    <el-dialog title="修改文件名" :visible.sync="editDialog" width="40%" center>
      <el-input v-model="edit.oldName" placeholder="请输入文件名"/>
      <span slot="footer">
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Clipboard from 'clipboard'

import {getFileList, fileUpadte, delFile} from '@/api/user'
import {mapGetters} from 'vuex'

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
      edit: {},
      dialog: false,
      editDialog: false,
      edit: false,
      search: {
        pageNum: 1,
        name: '',
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
        text: function () {
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
      const suffix = row.name.substring(row.name.lastIndexOf('.'))
      if (suffix == '.jpg' || suffix == '.png' || suffix == '.jpeg') {
        return this.config.value + row.path
      } else {
        return '--格式不支持--'
      }
    },
    getUrl(row) {
      return this.config.value + row.path
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
      this.$confirm('是否删除数据', {type: 'warning'}).then(() => {
        delFile({id}).then((res) => {
          if (res.code == 200) {
            this.$notify.success('删除成功~~')
            this.fetchData()
          }
        })
      })
    },
    // 修改
    editItem(row) {
      this.editDialog = true
      this.edit = JSON.parse(JSON.stringify(row))
    },
    addSubmit() {
      fileUpadte({
        id: this.edit.id,
        oldName: this.edit.oldName
      }).then((res) => {
        if (res.code == 200) {
          this.editDialog = false
          this.fetchData()
        }
      })
    },
    fetchData() {
      getFileList(this.search).then((res) => {
        console.log(res, 'res')
        this.list = res.data.rows
        this.search.total = res.data.count
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .suffix {
    font-size: 8px;
    color: gray;
  }

  .editBtn {
    font-size: 18px;
  }

  ::v-deep {
    .el-upload {
      display: block;
    }

    .el-upload-dragger {
      width: 100%;
    }
  }
}
</style>
