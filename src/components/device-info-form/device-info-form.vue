<template>
  <!-- TODO: paceholder -->
  <div>
    <Form ref="formItem" :model="formItem" :label-width="80" :rules="ruleValidate">
      <FormItem label="设备名称" prop="name">
        <Input
          :disabled="isUpdateMode"
          v-model="formItem.name"
        ></Input>
      </FormItem>
      <!-- <FormItem label="类型">
            <Input v-model="category"></Input>
        </FormItem> -->
      <FormItem label="型号" prop="model">
        <Input
          :disabled="isUpdateMode"
          v-model="formItem.model"
        ></Input>
      </FormItem>

<!--&lt;!&ndash;      写不出来了 sigh&ndash;&gt;-->
<!--      <FormItem label="工艺单元" prop="crafts">-->
<!--        <div>-->
<!--          <Col-->
<!--            span="6"-->
<!--            v-for="(craft, listIndex) in craftList"-->
<!--            v-bind:key="listIndex"-->
<!--            style="padding: 10px; background: #f8f8f9"-->
<!--          >-->
<!--            <Button size="small" type="primary" v-text="craft.name" @click="handleCraft(craft.name)"></Button>-->
<!--            <InputNumber value="-1" size="small" :disabled="false"></InputNumber>-->
<!--          </Col>-->
<!--        </div>-->
<!--      </FormItem>-->
      <FormItem
        v-for="(citem, lIndex) in formItem.crafts"
        :key="lIndex"
        :label="'工艺流程 ' + `${lIndex + 1}`"
        :prop="'crafts.' + lIndex + '.value'"
        :rules="{
          required: false,
          message: '工艺流程 ' + `${lIndex + 1}` + ' 不能为空',
          trigger: 'blur',
        }"
      >
        <Row :gutter="10">
          <Col span="12">
            <Select v-model="citem.name">
              <Option
                v-for="craftItem in craftList"
                :value="craftItem.name"
                :key="craftItem.name"
              >
                {{ craftItem.name }}
              </Option>
            </Select>
          </Col>
          <Col span="2">
            用时
          </Col>
          <Col span="5">
            <InputNumber v-model="citem.time"/>
          </Col>
          <Col span="2">
            min
          </Col>
          <Col span="1">
            <Button
              @click="handleRemoveCraft(lIndex)"
              size="small"
              shape="circle"
            >
              <Icon type="md-close" />
            </Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Row type="flex" justify="start">
          <Col span="24">
            <Button type="dashed" long @click="handleAddCraft" icon="md-add">
              新增工艺流程
            </Button>
          </Col>
        </Row>
      </FormItem>

      <FormItem label="设备描述" prop="description">
        <Input
          v-model="formItem.description"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
        ></Input>
      </FormItem>
      <FormItem label="设备位置" prop="location">
        <Row :gutter="10">
          <Col>
            <Col span="2">
              经度
            </Col>
            <Col span="9">
              <Input
                v-model="formItem.longitude"
              ></Input>
            </Col>
            <Col span="1">
              &nbsp;
            </Col>
            <Col span="2">
              纬度
            </Col>
            <Col span="10">
              <Input
                v-model="formItem.latitude"
              ></Input>
            </Col>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="故障率信息" prop="failure">
        <Row :gutter="10">
          <Col>
            <Col span="3">
              故障率
            </Col>
            <Col span="4">
              <Input
                v-model="formItem.failure_rate"
              ></Input>
            </Col>
            <Col span="2">
              &nbsp;&nbsp;%&nbsp;&nbsp;
            </Col>
            <Col span="5">
              故障恢复时间
            </Col>
            <Col span="9">
              <Input
                v-model="formItem.repair_time"
              ></Input>
            </Col>
            <Col span="1">
              &nbsp;min
            </Col>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="操作用时" prop="failure">
        <Row :gutter="10">
          <Col>
            <Col span="3">
              上料用时
            </Col>
            <Col span="3">
              <Input
                v-model="formItem.load_material"
              ></Input>
            </Col>
            <Col span="2">
             &nbsp;min
            </Col>
            <Col span="3">
              下料用时
            </Col>
            <Col span="3">
              <Input
                v-model="formItem.lay_off"
              ></Input>
            </Col>
            <Col span="2">
              &nbsp;min
            </Col>
            <Col span="3">
              清洗用时
            </Col>
            <Col span="3">
              <Input
                v-model="formItem.cleaning_time"
              ></Input>
            </Col>
            <Col span="2">
              &nbsp;min
            </Col>
          </Col>
        </Row>
      </FormItem>
      <!-- TODO: validate -->
      <FormItem
        v-for="(item, listIndex) in formItem.values"
        :key="listIndex"
        :label="'Data ' + `${listIndex + 1}`"
        :prop="'values.' + listIndex + '.value'"
        :rules="{
          required: false,
          message: 'Data ' + `${listIndex + 1}` + ' 不能为空',
          trigger: 'blur',
        }"
      >
        <Row :gutter="10">
          <Col span="10">
            <Input v-model="item.name" />
          </Col>
          <Col span="5">
            <Select v-model="item.type">
              <Option
                v-for="dataTypeItem in deviceDataTypeList"
                :value="dataTypeItem.value"
                :key="dataTypeItem.value"
              >
                {{ dataTypeItem.label }}
              </Option>
            </Select>
          </Col>
          <Col span="6">
            <Select v-model="item.protocol">
              <Option
                v-for="protocolItem in deviceDataProtocolList"
                :value="protocolItem.value"
                :key="protocolItem.value"
              >
                {{ protocolItem.label }}
              </Option>
            </Select>
          </Col>
          <Col span="1">
            <Button
              @click="handleRemove(listIndex)"
              size="small"
              shape="circle"
            >
              <Icon type="md-close" />
            </Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Row type="flex" justify="start">
          <Col span="24">
            <Button type="dashed" long @click="handleAdd" icon="md-add">
              新增设备数据
            </Button>
          </Col>
        </Row>
      </FormItem>
      <Row :gutter="8" type="flex" justify="end">
        <Col>
          <!-- <span @click="cancelSlotClick">
            <slot name="cancelBtn" />
          </span> -->
          <Button @click="cancelBtnClick">取消</Button>
        </Col>
        <Col>
          <!-- <span @click="confirmSlotClick">
            <slot name="confirmBtn" />
          </span> -->
          <Button type="primary" :loading="loading" @click="confirmBtnClick">
            确认
          </Button>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
// TODO: remove property valueIndex
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'deviceInfoForm',
  components: {
    // deviceCraft
  },
  props: {
    deviceInfo: {
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
    let formItem = JSON.parse(JSON.stringify(this.deviceInfo))
    return {
      valueIndex,
      formItem,
      loading: false,
      bindingModalControl: false,
      activeDataSource: {},
      bindingList: [],
      ruleValidate: {
        name: [
          { required: true, message: '设备名称不能为空', trigger: 'blur' }
        ],
        model: [
          { required: true, message: '设备类型不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      deviceDataTypeList: (state) => state.device.deviceDataTypeList,
      deviceDataProtocolList: (state) => state.device.deviceDataProtocolList,
      craftList: (state) => state.craft.craftList,
      mode: (state) => state.device.mode
    }),
    isUpdateMode () {
      return this.mode === 'UPDATE'
    }
  },
  methods: {
    ...mapMutations([]),
    ...mapActions([
      'getCraftListAction'
    ]),
    // 因为当parentConfirmBtnClick为Component addDevice所传的方法时，是异步方法，所以要在这加async用来等待异步完成
    async confirmBtnClick () {
      let newDevice = this.formItem
      this.loading = true
      await this.parentConfirmBtnClick(newDevice)
      this.loading = false
      this.resetFormItem()
    },
    cancelBtnClick () {
      this.parentCancelBtnClick()
      this.resetFormItem()
    },
    resetFormItem () {
      // this.valueIndex = 1
      this.formItem = JSON.parse(JSON.stringify(this.deviceInfo))
      // console.log(`reset: ${JSON.stringify(this.deviceInfo)}`)
    },
    handleAdd () {
      // this.valueIndex++
      this.formItem.values.push({
        // valueIndex: this.valueIndex,
        name: '',
        type: '',
        protocol: ''
      })
    },
    handleRemove (listIndex) {
      // console.log("Delete listItem: " + listIndex);
      this.formItem.values.splice(listIndex, 1)
    },
    handleAddCraft () {
      // this.valueIndex++
      this.formItem.crafts.push({
        // valueIndex: this.valueIndex,
        name: '',
        time: ''
      })
    },
    handleRemoveCraft (listIndex) {
      // console.log("Delete listItem: " + listIndex);
      this.formItem.crafts.splice(listIndex, 1)
    }
  },
  watch: {
    deviceInfo (val) {
      this.formItem = JSON.parse(JSON.stringify(val))
      // console.log(`deviceInfo: ${JSON.stringify(val)}`)
    }
  },
  async mounted () {
    await this.getCraftListAction()
  }
  // mounted () {
  //   this.$nextTick(() => {
  //     // console.log(this._uid)
  //   })
  // }
}
</script>
