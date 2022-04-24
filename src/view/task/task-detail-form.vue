<template>
  <div>
    <Form ref="formItem" :model="formItem" :label-width="80" :rules="ruleValidate">
      <FormItem label="任务名" prop="name">
      </FormItem>
    </Form>
  </div>
</template>
<script>
// TODO: remove property valueIndex
import { mapState } from 'vuex'
export default {
  name: 'taskDatailInfoForm',
  components: {
  },
  props: {
    taskDetailInfo: {
      type: Object
    },
    parentCancelBtnClick: {
      type: Function
    },
    parentConfirmBtnClick: {
      type: Function
    }
  },
  data () {
    let valueIndex = 1
    let formItem = JSON.parse(JSON.stringify(this.taskDatailInfo))
    // formItem.values[0] = {...formItem.values[0], valueIndex}
    return {
      valueIndex,
      formItem,
      loading: false,
      bindingModalControl: false,
      activeDataSource: {},
      bindingList: []
    }
  },
  computed: {
    ...mapState({
      // deviceDataTypeList: (state) => state.device.deviceDataTypeList,
      // deviceDataProtocolList: (state) => state.device.deviceDataProtocolList,
      // mode: (state) => state.device.mode
    }),
    isUpdateMode () {
      return this.mode === 'UPDATE'
    }
  },
  methods: {
  },
  watch: {
    taskDatailInfo (val) {
      // this.formItem = JSON.parse(JSON.stringify(val))
      // console.log(`taskDatailInfo: ${JSON.stringify(val)}`)
    }
  },
  mounted () {
    // this.$nextTick(() => {
    //   // console.log(this._uid)
    // })
  }
}
</script>
