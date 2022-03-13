<template>
  <div class="page">
    <el-table
      :data="dataList"
      border
      style="width: 100%">
      <el-table-column
        prop="ID"
        label="ID"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="ACTION"
        label="用户行为"
      >
      </el-table-column>
      <el-table-column
        prop="IP"
        label="IP"
      >
      </el-table-column>
      <el-table-column
        prop="ADDRESS"
        label="IP解析地址">
      </el-table-column>
      <el-table-column
        prop="CREATE_TIME"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="avatarUrl"
        width="120"
        label="操作">
        <template v-slot="scope">
          <i class="el-icon-edit"></i>
          <i class="el-icon-delete"></i>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
      style="margin: 30px 0"
      @current-change="changePage"
      background
      layout="total,prev, pager, next"
      :total="search.total">
    </el-pagination>
  </div>
</template>

<script>
import {getLogList} from '@/api/user'

export default {
  name: "UserList",
  data() {
    return {
      dataList: [],
      search: {
        pageNum: 1
      },
    }
  },
  created() {
    this.getDataList(this.search)
  },
  methods: {
    changePage(e) {
      this.search.pageNum = e
      this.getDataList(this.search)
    },
    getDataList(params) {
      getLogList(params).then(res => {
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
}

</style>
