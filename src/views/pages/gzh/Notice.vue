<template>
  <div>
    <el-card>
      <json-editor ref="jsonEditor" v-model="value" />
      <el-row type="flex" justify="center">
        <el-button type="primary" class="top" @click="send">发送单个</el-button>
        <el-button type="primary" class="top" @click="sendAll"
          >批量发送</el-button
        >
      </el-row>
      <div class="top">结果：</div>
      <el-row
        v-for="(item, i) in logList"
        :key="i"
        style="padding-left: 15px"
        class="top"
        >{{ item }}</el-row
      >
    </el-card>
  </div>
</template>

<script>
import JsonEditor from "@/components/JsonEditor";
import { sendNotice } from "@/api/gzh";
export default {
  name: "Notice",
  components: { JsonEditor },
  data() {
    return {
      value: {
        touser: "oatSL6WPLJc_ypZ0_Q3w77TBEg9M",
        template_id: "QWcqPsYlMUwNpZUF3Ru1W1XkK0MHN_cWU6RhEemtVNM",
        miniprogram: {
          appid: "wx95465a816219bd5a",
          pagepath: "/pages/index/index",
        },
        data: {
          first: {
            value: "这是first对应的内容",
          },
          keyword1: {
            value: "这是keyword1对应的内容",
            color: "#FF0101",
          },
          keyword2: {
            value: "这是keyword2对应的内容",
          },
          remark: {
            value: "remark",
            color: "#007BF9",
          },
        },
      },
      logList: [],
    };
  },

  mounted() {},

  methods: {
    async send() {
      const value = this.value;
      const { code, msg, data } = await sendNotice({
        params: typeof value == "object" ? value : JSON.parse(value),
      });
      if (code == 200) {
        this.$notify.success(msg);
        this.logList.push(data);
      } else {
        this.$notify.error(msg);
      }
    },
    sendAll() {
      this.$confirm("请确保单个正常，操作不可逆，是否继续发送！", {
        type: "warning",
      }).then((res) => {
        this.$notify.error("开发中~~");
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
