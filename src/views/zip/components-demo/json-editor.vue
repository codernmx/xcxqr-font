<template>
  <div class="components-container">
    <aside>公用模板：</aside>
    <div class="editor-container">
      <json-editor ref="jsonEditor" v-model="value" />
    </div>
  </div>
</template>

<script>
import JsonEditor from '@/components/JsonEditor'

const jsonData =
  '{"touser":"OPEN_ID","template_id":"QWcqPsYlMUwNpZUF3Ru1W1XkK0MHN_cWU6RhEemtVNM","miniprogram":{"appid":"wx95465a816219bd5a","pagepath":"/pages/index/index"},"data":{"first":{"value":"您的爱车【{}】今天在【成都】限行,请合理安排出行方式,避免罚款!"},"keyword1":{"value":"CAR_NUMBER","color":"#FF0101"},"keyword2":{"value":"REASON"},"remark":{"value":"宝!每天快乐开车鸭~~~","color":"#007BF9"}}}'

export default {
  name: 'JsonEditorDemo',
  components: { JsonEditor },
  data() {
    return {
      value: JSON.parse(jsonData)
    }
  },
  created() {
    const json = JSON.stringify({
      touser: 'OPEN_ID',
      template_id: 'QWcqPsYlMUwNpZUF3Ru1W1XkK0MHN_cWU6RhEemtVNM',
      miniprogram: {
        appid: 'wx95465a816219bd5a',
        pagepath: '/pages/index/index'
      },
      data: {
        first: {
          value:
            '您的爱车【{}】今天在【成都】限行,请合理安排出行方式,避免罚款!'
        },
        keyword1: {
          value: 'CAR_NUMBER',
          color: '#FF0101'
        },
        keyword2: {
          value: 'REASON'
        },
        remark: {
          value: '宝!每天快乐开车鸭~~~',
          color: '#007BF9'
        }
      }
    })

    console.log(json, 'json')
  }
}
</script>

<style scoped>
.editor-container {
  position: relative;
  height: 100%;
}
</style>
