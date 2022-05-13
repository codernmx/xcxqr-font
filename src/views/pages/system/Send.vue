<template>
  <div class="app-container">
    <el-form ref="email" :model="email" label-width="80px" :rules="rules">
      <el-form-item label="收件邮箱" prop="email">
        <el-input v-model="email.email"></el-input>
      </el-form-item>
      <el-form-item label="邮件主题" prop="subject">
        <el-input v-model="email.subject"></el-input>
      </el-form-item>
      <el-form-item label="邮件内容" prop="content">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="email.content"
          :rows="4"
          maxlength="3000"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" @click="submit">立即发送</el-button>
        <el-button @click="email = {}">清空内容</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { sendEmail } from "@/api/user";
import { mapGetters } from "vuex";
export default {
  components: {},
  filters: {},
  data() {
    return {
      email: {},
      rules: {
        email: [{ required: true, message: "请输入收件邮箱", trigger: "blur" }],
        subject: [{ required: true, message: "请输入主题", trigger: "blur" }],
        content: [
          { required: true, message: "请输入邮件内容", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["config"]),
  },
  created() {},
  methods: {
    submit() {
      this.$refs.email.validate((valid) => {
        if (valid) {
          sendEmail(this.email).then((res) => {
            this.$notify.success("发送成功");
            this.email = {};
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
}
</style>
