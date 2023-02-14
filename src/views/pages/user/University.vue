<template>
  <div class="app-container">
    <div class="search">
      <el-row type="flex" justify="space-between" style="margin: 15px 0">
        <el-col :span="4" style="display: flex">
          <el-input v-model="search.NAME" placeholder="请输入角色名称" clearable size="mini" />
          <el-button type="primary" size="mini" style="margin: 0 15px" @click="
              search.pageNum = 1;
              fetchData();
            ">搜索</el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="list" border fit highlight-current-row @row-dblclick="dblclick">
      <el-table-column prop="ID" label="ID" width="100" align="center" />
      <el-table-column prop="NAME" label="收集项目名称" />
      <el-table-column prop="REMARKS" label="备注信息" />
      <el-table-column prop="CREATE_TIME" label="创建时间" />
      <el-table-column label="操作" width="110" align="center">
        <template slot-scope="scope">
          <span class="editBtn">
            <el-tooltip class="item" effect="dark" content="修改" placement="top">
              <i class="el-icon-edit" @click="editItem(scope.row)" />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="下载所有文件" placement="top">
              <i class="el-icon-download" style="margin: 0 15px" @click="downLoad(scope.row)" />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <i class="el-icon-delete" @click="del(scope.row.ID)" />
            </el-tooltip>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin: 30px 0" background layout="total,prev, pager, next" :total="list.length" @current-change="changePage" />
    <el-dialog :title="title" :visible.sync="dialog" width="40%" center>
      <div>
        <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="收集项目名称" prop="NAME">
            <el-input v-model="ruleForm.NAME" />
          </el-form-item>
          <el-form-item label="备注信息" prop="REMARKS">
            <el-input v-model="ruleForm.REMARKS" />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 双击详情 -->
    <el-dialog title="详细信息" :visible.sync="detail" width="50%" center>
      <el-table :data="alreadyUploadList" border fit highlight-current-row>
        <el-table-column type="index" label="序号" width="100" align="center" />
        <el-table-column prop="NAME" label="姓名" />
        <el-table-column prop="NUMBER" label="学号" />
        <el-table-column label="图片" width="150" align="center">
          <template v-slot="scope">
            <el-image lazy style="width: 75px; height: 75px" :src="getImgUrl(scope.row)" fit="scale-down" :preview-src-list="[getImgUrl(scope.row)]" />
          </template>
        </el-table-column>
        <el-table-column prop="CREATE_TIME" label="上传时间" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getGatherList, addGather, updateGather, delGather, alreadyUpload, getCompressingFile } from '@/api/user'
export default {
  name: 'Role',
  filters: {
    statusFilter (status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  computed: {
    ...mapGetters(['config'])
  },
  data () {
    return {
      title: '',
      ruleForm: {
        NAME: '',
        REMARKS: ''
      },
      showName: '',//当前展示的项目
      alreadyUploadList: [],
      list: [],
      dialog: false,
      detail: false,
      edit: false,
      search: {
        pageNum: 1,
        NAME: '',
        total: 0
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
    downLoad ({ NAME }) {
      getCompressingFile({ folderName: NAME }).then(res => {
        console.log(res, 'res')
        if (res.code == 200) {
          window.open(this.config.BASE_URL_FILE + res.data)
        }else{
          this.$message.error('报错了~~请联系小主人~~')
        }
      })
    },
    getImgUrl (row) {
      const { NAME, NUMBER, SUFFIX } = row
      // return this.config.BASE_URL_FILE + `${this.showName}/${NAME}${NUMBER}${SUFFIX}`
      let url = this.config.BASE_URL_FILE + `${this.showName}/${NUMBER}${NAME}${SUFFIX}`
      return url
    },
    del (ID) {
      this.$confirm('是否删除数据', { type: 'warning' }).then((res) => {
        delGather({ ID }).then((res) => {
          if (res.code == 200) {
            this.$notify.success(res.msg)
            this.fetchData()
          }
        })
      })
    },
    add () {
      this.dialog = true
      this.ruleForm = { NAME: '', REMARKS: '' }
      this.edit = false
      this.title = '新增收集项目'
    },
    // 修改
    editItem (row) {
      this.$notify.error('暂不支持修改~')
      // this.dialog = true
      // this.title = '修改收集项目信息'
      // this.ruleForm = JSON.parse(JSON.stringify(row))
      // this.edit = true
    },
    dblclick (row) {
      const { ID, NAME } = row
      this.showName = NAME
      this.alreadyUpload({ ID })
      this.detail = true
    },
    addSubmit () {
      if (this.edit) {
        // 修改
        updateGather(this.ruleForm).then((res) => {
          if (res.code == 200) {
            this.$notify.success(res.msg)
            this.dialog = false
            this.fetchData()
          }
        })
      } else {
        addGather(this.ruleForm).then((res) => {
          if (res.code == 200) {
            this.$notify.success(res.msg)
            this.dialog = false
            this.fetchData()
          }
        })
      }
    },
    async alreadyUpload (param) {
      const { data } = await alreadyUpload(param)
      this.alreadyUploadList = data || []
    },
    fetchData () {
      getGatherList(this.search).then((res) => {
        console.log(res, 'res')
        this.list = res.data
        this.search.total = 1
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
