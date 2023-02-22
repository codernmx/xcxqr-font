<template>
  <div class="page">
    <div class="search">
      <el-row type="flex" justify="space-between" style="margin: 15px 0">
        <el-col :span="4" style="display: flex">
          <el-input v-model="search.NICK_NAME" clearable placeholder="请输入" size="mini" />
          <el-button type="primary" size="mini" style="margin: 0 15px">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="dataList" border style="width: 100%" :row-style="{ height: '65px' }"
      :cell-style="{ padding: '0px' }">
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="ACTION" label="用户行为" min-width="250" show-overflow-tooltip/>
      <el-table-column prop="IP" label="IP地址" />
      <el-table-column prop="ADDRESS" label="归属地" />
      <el-table-column prop="CREATE_TIME" label="创建时间" />
      <el-table-column width="120" label="操作">
        <template v-slot="scope">
          <span class="editBtn">
            <!-- <el-tooltip
              class="item"
              effect="dark"
              content="修改"
              placement="top"
            >
              <i class="el-icon-edit" />
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
            >
              <i class="el-icon-delete" style="margin: 0 15px" />
            </el-tooltip> -->
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin: 30px 0" background layout="total,prev, pager, next" :total="search.total"
      @current-change="changePage" />
  </div>
</template>

<script>
import { getLogList } from '@/api/user'

export default {
  name: 'UserList',
  data () {
    return {
      dataList: [],
      search: {
        pageNum: 1
      }
    }
  },
  created () {
    this.getDataList(this.search)
  },
  methods: {
    changePage (e) {
      this.search.pageNum = e
      this.getDataList(this.search)
    },
    getDataList (params) {
      getLogList(params).then((res) => {
        console.log(res)
        this.dataList = res.data
        this.search.total = res.total
      })
    }
  }
}
</script>

<style scoped lang="scss">
.page {
  padding: 20px;
  .editBtn {
    font-size: 18px;
  }
}
</style>
