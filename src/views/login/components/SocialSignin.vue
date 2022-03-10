<template>
  <div>
    <img :src="qrUrl" alt="小程序码" height="200"/>
    <div class="tip">请使用微信扫描小程序码登录{{ bindTimeout ? '(已超时)' : '' }}</div>
    <div>
      启用授权获取用户信息：
      <el-switch
        v-model="auth"
        @change="authChange"
        active-color="#13ce66"
        inactive-color="#ff4949"
      >
      </el-switch>
    </div>
  </div>
</template>

<script>
import {getCode, getToken} from '@/api/user'

export default {
  name: 'SocialSignin',
  data() {
    return {
      qrUrl: '',
      auth: true,
      bindTimeout: '',
    }
  },
  methods: {
    authChange(val) {
      console.log(val)
      this.$nextTick(function () {
        this.qrUrl = '/api/getCode?&uuid=ba7db785' + '&useAuth=' + (val ? 1 : 0)
      })
    }
  },
  created() {
    getToken()

    // getCode({useAuth: 0, uuid: 'ba7db785'}).then(res => {
    this.qrUrl = '/api/getCode?useAuth=0&uuid=ba7db785'
    // this.$forceUpdate()
    // })
  }
}
</script>

<style lang="scss" scoped>
.tip {
  margin: 15px 0;
}
</style>
