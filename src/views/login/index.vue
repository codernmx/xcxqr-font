<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on"
      label-position="left">

      <div class="title-container">
        <h3 class="title">
          {{ $t('login.title') }}
        </h3>
        <!-- <lang-select class="set-language" /> -->
      </div>

      <el-form-item prop="username">
        <el-row style="padding-right:5px">
          <el-col :span="18">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input ref="username" v-model="loginForm.username" placeholder="请输入邮箱" name="username" type="text"
              tabindex="1" autocomplete="on" />
          </el-col>
          <el-col :span="6" style="margin-top:7px">
            <el-button type="primary" :disabled="disable" :class="{ codeGeting:isGeting }" @click="getVerCode">
              {{getCode}}</el-button>
          </el-col>
        </el-row>

      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item>
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input :key="passwordType" ref="password" v-model="loginForm.password" placeholder="请输入六位验证码"
            name="password" tabindex="2" autocomplete="on" @keyup.native="checkCapslock" @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin" />
          <!-- <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span> -->
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin">
        登录
      </el-button>

      <div style="position:relative">
        <div class="other-login">
          <div class="title">推荐使用其他方式登录</div>
          <img src="@/assets/mp.png" class="wx-logo" title="小程序登录" alt="小程序登录" @click="otherLogin">
        </div>
      </div>
    </el-form>

    <el-dialog title="微信扫码登录" :visible.sync="showDialog" align="center" width="30%" @close="wxLoginClose">
      <div>
        <el-image :src="qrUrl" alt="小程序码" height="10%" />
        <div style="margin:15px 0">请使用微信扫描小程序码登录{{ bindTimeout ? '(已超时)' : '' }}</div>
        <!-- (后期考虑是否启用选择性授权) -->
        <!-- <div>
          启用授权获取用户信息：
          <el-switch v-model="auth" active-color="#13ce66" inactive-color="#ff4949" @change="authChange" />
        </div> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { getCode, getToken, getUUid, sendMail, codeLogin } from '@/api/user'
import { GlobalGetUuidShort } from '@/utils/index'

export default {
  name: 'Login',
  components: {},
  data () {
    const validateUsername = (rule, value, callback) => {
      let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/;
      //       !reg.test(value)
      if (!reg.test(value)) {
        callback(new Error('请输入正确邮箱号码'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      qrUrl: '',
      auth: true,
      bindTimeout: false,
      timer: null, // 定时器
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      getCode: '获取验证码',
      isGeting: false,
      count: 60,
      disable: false
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created () {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted () {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed () {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    //获取验证码
    getVerCode () {
      if (this.loginForm.username) {
        sendMail(this.loginForm).then(res => {
          console.log(res, 'res')
        })
        var countDown = setInterval(() => {
          if (this.count < 1) {
            this.isGeting = false
            this.disable = false
            this.getCode = '获取验证码'
            this.count = 60
            clearInterval(countDown)
          } else {
            this.isGeting = true
            this.disable = true
            this.getCode = this.count-- + '秒后重发'
          }
        }, 1000)
      } else {
        this.$notify.error('请必须输入邮箱号码')
      }
    },
    //关闭弹窗清除定时器
    wxLoginClose () {
      this.timer && clearTimeout(this.timer)
      this.bindTimeout = false
    },
    // 点击其他方式登录
    otherLogin () {
      getToken().then(r => {
        this.showDialog = true
        this.getQrUrl()
      })

    },
    changeQr () {
      if (this.bindTimeout) {
        this.bindTimeout = false
        this.getQrUrl()
      } else {
        this.$notify.warning('请当前二维码过期之后重新获取')
      }
    },
    getQrUrl () {
      let uuid = GlobalGetUuidShort(), counter = 1
      this.qrUrl = `/api/getCode?useAuth=1&uuid=${uuid}`
      this.timer && clearTimeout(this.timer)// 清除定时器重新开启
      this.timer = setInterval(() => {
        getUUid({ uuid }).then((res) => {// 获取openid
          counter++
          if (counter === 31) { //超时
            clearTimeout(this.timer)
            this.bindTimeout = true
          }
          if (res.data.openid !== '') {
            clearTimeout(this.timer)
            this.showDialog = false
            this.$notify.success('扫码成功~~ 更多功能开发中~')
            // this.$store.dispatch('user/login', res.data).then(() => {// 登录跳转 (扫码登录)
            //   this.$router.push({ path: this.redirect || '/dashboard', query: this.otherQuery })
            // }).catch(err => {
            //   console.log(err, 'err')
            // })
          }
        }).catch((err) => {
          clearTimeout(this.timer)
        })
      }, 2000)
    },
    // 修改选项重新获取qr
    // authChange (val) {
    //   console.log(val)
    //   this.$nextTick(function () {
    //     this.qrUrl = `/api/getCode?uuid=${this.uuid}` + '&useAuth=' + (val ? 1 : 0)
    //   })
    // },
    checkCapslock (e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          //   this.$message.warning('开发中，目前仅支持扫码登录')
          codeLogin(this.loginForm).then(res => {
            console.log(res, 'res')
            this.loading = false
            this.$store.dispatch('user/login', res.data)
              .then(() => {
                console.log(55, '55')
                this.$router.push({ path: this.redirect || '/dashboard', query: this.otherQuery })
              })
              .catch(() => {
                // this.loading = false
              })
            //     this.$router.push({ path: this.redirect || '/dashboard', query: this.otherQuery })
          })
          // this.loading = true
          // this.$store.dispatch('user/login', this.loginForm)
          //   .then(() => {
          //     this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
          //     this.loading = false
          //   })
          //   .catch(() => {
          //     this.loading = false
          //   })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery (query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.codeGeting {
  background: #cdcdcd;
  border-color: #cdcdcd;
}
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .mask {
    opacity: 0.2;
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    .other-login {
      margin-top: 30px;
      text-align: center;
      .title {
        color: #dcdfe6;
        position: relative;
        font-size: 14px;
        &:before {
          position: absolute;
          left: 0;
          top: 50%;
          content: '';
          width: 100px;
          height: 1px;
          background: #dcdfe6;
          display: inline-block;
        }
        &:after {
          position: absolute;
          right: 0;
          top: 50%;
          content: '';
          width: 100px;
          height: 1px;
          background: #dcdfe6;
          display: inline-block;
        }
      }
      .wx-logo {
        margin-top: 20px;
        width: 36px;
        height: 36px;
        border-radius: 100%;
        cursor: pointer;
      }
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
