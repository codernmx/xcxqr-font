<template>
  <div class="app-container">
    <div class="search">
      <el-row type="flex" justify="space-between" style="margin: 15px 0">
        <el-col :span="4" style="display: flex">
          <el-input
            v-model="search.appid"
            clearable
            placeholder="请输入"
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
            >搜索</el-button
          >
        </el-col>
        <el-col :span="1">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="add"
            >添加</el-button
          >
        </el-col>
      </el-row>
    </div>
    <!-- show-overflow-tooltip -->
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column prop="id" label="ID" width="100" align="center" />
      <el-table-column label="客户">
        <template slot-scope="scope">
          <el-select v-model="scope.row.app_id" disabled>
            <el-option
              v-for="item in customerList"
              :key="item.id"
              :label="item.title"
              :value="item.appid"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="city_name" label="城市" />
      <el-table-column align="center" label="限行数据">
        <el-table-column prop="monday" label="周一" />
        <el-table-column prop="tuesday" label="周二" />
        <el-table-column prop="wednesday" label="周三" />
        <el-table-column prop="thursday" label="周四" />
        <el-table-column prop="friday" label="周五" />
        <el-table-column prop="saturday" label="周六" />
        <el-table-column prop="sunday" label="周日" />
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="备注"
        align="center"
      />
      <el-table-column
        prop="create_time"
        label="创建时间"
        min-width="100"
        align="center"
      />
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
    <el-dialog :title="title" :visible.sync="dialog" width="40%" center>
      <div>
        <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="客户" prop="appid">
                <el-select v-model="ruleForm.appid" style="width: 100%">
                  <el-option
                    v-for="item in customerList"
                    :key="item.id"
                    :label="item.title"
                    :value="item.appid"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="城市名称" prop="appid">
                <el-input v-model="ruleForm.city_name" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="周一" prop="appid">
                <el-input v-model="ruleForm.monday" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="周二" prop="appid">
                <el-input v-model="ruleForm.tuesday" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="周三" prop="appid">
                <el-input v-model="ruleForm.wednesday" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="周四" prop="appid">
                <el-input v-model="ruleForm.thursday" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="周五" prop="appid">
                <el-input v-model="ruleForm.friday" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="周六" prop="appid">
                <el-input v-model="ruleForm.saturday" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="周日" prop="appid">
                <el-input v-model="ruleForm.sunday" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注信息" prop="appid">
                <el-input v-model="ruleForm.remarks" />
              </el-form-item>
            </el-col>
          </el-row>
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
import { getRoleList, getUserRoleById } from "@/api/user";
import { getCityList, getCityCustomerList, cityInsert,cityDel,cityUpdate } from "@/api/gzh";
export default {
  name: "City",
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      ruleForm: {
        appid: "",
        PASSWORD: "",
        ROLE: [],
      },
      title: "",
      list: [],
      customerList: [],
      roleList: [],
      dialog: false,
      edit: false,
      search: {
        pageNum: 1,
        appid: "",
        total: 0,
      },
    };
  },
  created() {
    this.fetchData();
    console.log(this.$store.getters.roles);
    this.getRoleList();
    this.getCustomer();
  },
  methods: {
    async getCustomer() {
      try {
        const res = await getCityCustomerList();
        this.customerList = res.data;
      } catch (error) {}
    },
    getRoleList() {
      getRoleList({
        pageNum: 1,
        pageSize: 100,
        NAME: "",
      }).then((res) => {
        this.roleList = res.data;
      });
    },
    changePage(e) {
      this.search.pageNum = e;
      this.fetchData();
    },
    del(id) {
      this.$confirm("是否删除数据", { type: "warning" }).then((res) => {
        cityDel({ id }).then((res) => {
          if (res.code == 200) {
            this.$notify.success(res.msg);
            this.fetchData();
          }
        });
      });
    },
    add() {
      this.dialog = true;
      this.ruleForm = { appid: "", PASSWORD: "" };
      this.edit = false;
      this.title = "新增用户";
    },
    // 修改
    async editItem(row) {
      this.dialog = true;
      this.edit = true;
      this.title = "编辑";
      this.ruleForm = {
        ...row,
        appid:row.app_id
      };
    },
    addSubmit() {
      if (this.edit) {
        // 修改
        cityUpdate(this.ruleForm).then((res) => {
          if (res.code == 200) {
            this.$notify.success(res.msg);
            this.dialog = false;
            this.fetchData();
          }
        });
      } else {
        cityInsert(this.ruleForm).then((res) => {
          if (res.code == 200) {
            this.$notify.success(res.msg);
            this.dialog = false;
            this.fetchData();
          }
        });
      }
    },
    fetchData() {
      getCityList(this.search).then((res) => {
        console.log(res, "res");
        this.list = res.data;
        this.search.total = res.total;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  .editBtn {
    font-size: 18px;
  }
}
</style>
