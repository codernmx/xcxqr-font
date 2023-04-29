<template>
  <div class="page">
    <div v-if="!ruleForm.name" class="form">
      <el-skeleton :rows="30" animated />
    </div>
    <el-form v-else ref="ruleForm" :model="ruleForm" :rules="rules" label-width="auto" class="form">
      <h1>基本信息：</h1>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="姓别" prop="sex">
            <el-input v-model="ruleForm.sex" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="年龄" prop="age">
            <el-input v-model="ruleForm.age" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="籍贯" prop="native">
            <el-input v-model="ruleForm.native" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="住址" prop="address">
            <el-input v-model="ruleForm.address" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="微信" prop="weChat">
            <el-input v-model="ruleForm.weChat" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="QQ" prop="qq">
            <el-input v-model="ruleForm.qq" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="电话" prop="phone">
            <el-input v-model="ruleForm.phone" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="邮件" prop="email">
            <el-input v-model="ruleForm.email" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="政治面貌" prop="politics">
            <el-input v-model="ruleForm.politics" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="最高学历" prop="degree">
            <el-input v-model="ruleForm.degree" />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="工作年限" prop="workingYears">
            <el-input v-model="ruleForm.workingYears" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="期望薪资" prop="salary">
            <el-input v-model="ruleForm.salary" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="头像地址" prop="avatar">
            <el-input v-model="ruleForm.avatar" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="头像右侧标签" prop="avatar">
            <el-input v-model="ruleForm.yearTags" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="gitHub链接" prop="gitHubUrl">
            <el-input v-model="ruleForm.gitHubUrl" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="gitHub描述" prop="gitHubDesc">
            <el-input v-model="ruleForm.gitHubDesc" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="CSDN链接" prop="csdnUrl">
            <el-input v-model="ruleForm.csdnUrl" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="CSDN描述" prop="csdnDesc">
            <el-input v-model="ruleForm.csdnDesc" />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="岗位意向" prop="job">
            <el-input v-model="ruleForm.job" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="个人优势" prop="advantage">
            <el-input v-model="ruleForm.advantage" type="textarea" autosize />
          </el-form-item>
        </el-col>
      </el-row>

      <h1>教育经历：</h1>
      <el-row v-for="(item, index) in ruleForm.education" :gutter="20" class="top project">
        <el-tag class="tag" type="warning">教育{{ index + 1 }}</el-tag>
        <i class="el-icon-remove delItem" @click="delItem('education', index)" />
        <el-col :span="6">
          <el-form-item label="学校名称">
            <el-input v-model="item.school" type="text" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="入学时间">
            <el-input v-model="item.startDate" type="text" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="毕业日期">
            <el-input v-model="item.endDate" type="text" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="专业">
            <el-input v-model="item.major" type="text" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="学历">
            <el-input v-model="item.degree" type="text" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="排序">
            <el-input v-model="item.sort" type="text" />
          </el-form-item>
        </el-col>
      </el-row>

      <div class="top" style="text-align: center;"><el-button type="primary" @click="addItem('education')">添加教育经历
        <i class="el-icon-plus el-icon--right" /></el-button></div>
      <h1>技能标签：</h1>
      <el-row v-for="(item, index) in ruleForm.skill" :gutter="20" class="top project">
        <el-tag class="tag" type="info">标签{{ index + 1 }}</el-tag>
        <i class="el-icon-remove delItem" @click="delItem('skill', index)" />
        <el-col :span="6">
          <el-form-item label="标签名称">
            <el-input v-model="item.name" type="text" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="type">
            <el-select v-model="item.type" placeholder="请选择" @change="val => { changeTag(val, item) }">
              <el-option label="primary" value="0" />
              <el-option label="success" value="1" />
              <el-option label="danger" value="2" />
              <el-option label="warning" value="3" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="预览">
            <el-tag :type="item.typeStr">{{ item.name }}</el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="排序">
            <el-input v-model="item.sort" type="text" />
          </el-form-item>
        </el-col>
      </el-row>

      <div class="top" style="text-align: center;"><el-button type="primary" @click="addItem('skill')">添加技能标签
        <i class="el-icon-plus el-icon--right" /></el-button></div>

      <h1>工作经历：</h1>
      <el-row v-for="(item, index) in ruleForm.company" :gutter="20" class="top project">
        <el-tag class="tag">工作{{ index + 1 }}</el-tag>
        <i class="el-icon-remove delItem" @click="delItem('company', index)" />
        <el-col :span="6">
          <el-form-item label="公司名称">
            <el-input v-model="item.companyName" type="text" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="入职时间">
            <el-input v-model="item.startDate" type="text" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="离职日期">
            <el-input v-model="item.endDate" type="text" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="职位">
            <el-input v-model="item.job" type="text" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="排序">
            <el-input v-model="item.sort" type="text" />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="内容/介绍">
            <el-input v-model="item.content" type="textarea" autosize />
          </el-form-item>
        </el-col>
      </el-row>

      <div class="top" style="text-align: center;"><el-button type="primary" @click="addItem('company')">添加工作经历
        <i class="el-icon-plus el-icon--right" /></el-button></div>

      <h1>项目经历：</h1>
      <el-row v-for="(item, index) in ruleForm.project" :gutter="20" class="top project">
        <i class="el-icon-remove delItem" @click="delItem('project', index)" />
        <el-tag type="success" class="tag">项目{{ index + 1 }}</el-tag>
        <el-col :span="6">
          <el-form-item label="项目名称">
            <el-input v-model="item.projectName" type="text" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="所属公司">
            <el-input v-model="item.company" type="text" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="开始时间">
            <el-input v-model="item.startDate" type="text" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结束时间">
            <el-input v-model="item.endDate" type="text" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="项目介绍">
            <el-input v-model="item.projectDesc" type="textarea" autosize />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="项目职责">
            <el-input v-model="item.projectContent" type="textarea" autosize />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="技术栈">
            <el-input v-model="item.technology" type="text" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预览地址">
            <el-input v-model="item.previewUrl" type="text" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="职责">
            <el-input v-model="item.job" type="text" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="排序">
            <el-input v-model="item.sort" type="text" />
          </el-form-item>
        </el-col>
      </el-row>

      <div class="top" style="text-align: center;"><el-button type="primary" @click="addItem('project')">添加项目经历
        <i class="el-icon-plus el-icon--right" /></el-button></div>
      <div style="height: 200px;" />
      <el-form-item>
        <div class="top submit">
          <el-button type="primary" @click="submitForm('ruleForm')">提交修改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getResumeInfo, resumeInfoUpdate } from '@/api/user'
export default {
  name: 'Resume',

  data() {
    return {
      openId: '',
      oldJson: '', // 记录老值
      ruleForm: {
        company: [{}],
        skill: [{}],
        education: [{}],
        project: [{}]
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      }

    }
  },

  mounted() {
    const { openId } = this.$route.query
    if (openId) {
      this.openId = openId
      this.getResumeInfo({ openId })
    }
  },

  methods: {
    async getResumeInfo(param) {
      try {
        const res = await getResumeInfo(param)
        console.log(res.data)
        this.ruleForm = res.data
        this.oldJson = JSON.stringify(res.data)
      } catch (error) {
        console.log(error)
      }
    },
    async resumeInfoUpdate(param) {
      try {
        const res = await resumeInfoUpdate(param)
        console.log(res.data)
        this.$message.success('修改成功~')
        this.getResumeInfo({ openId: this.openId })
      } catch (error) {
        console.log(error)
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          this.resumeInfoUpdate({
            ...this.ruleForm,
            newJson: JSON.stringify(this.ruleForm),
            oldJson: this.oldJson
          })
        } else {
          this.$message.error('请填写完整信息~')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    changeTag(val, item) {
      const typeList = {
        '0': 'primary',
        '1': 'success',
        '2': 'danger',
        '3': 'warning'
      }
      this.$set(item, 'typeStr', typeList[val])
    },
    addItem(key) {
      this.ruleForm[key].push({})
    },
    delItem(key, index) {
      if (this.ruleForm[key].length > 1) {
        this.$confirm('此操作将删除当前记录,保存之前刷新页面可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.ruleForm[key].splice(index, 1)
        }).catch(() => {
          this.$message.info('取消删除~')
        })
      } else {
        this.$message.error('至少保留一个~')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
	.form {
		width: 1200px;
		margin: 30px auto;
	}

	.project {
		border: 1px solid #e8e8e8;
		padding-top: 30px;
		position: relative;

		.tag {
			position: absolute;
			top: 0;
			left: -25px;
		}

		.delItem {
			font-size: 30px;
			color: #5cb6ff;
			position: absolute;
			top: 50%;
			right: -40px;
		}
	}

	.submit {
		position: fixed;
		left: 30px;
		bottom: 50px;
	}
}
</style>
