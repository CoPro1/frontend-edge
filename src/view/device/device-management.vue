<template>
  <div>
    <Row style="margin: 0 1%">
      <Col span="2">
        <add-device />
      </Col>
    </Row>
    <Row>
      <Col
        span="6"
        v-for="(device, listIndex) in deviceList"
        v-bind:key="listIndex"
        style="padding: 10px; background: #f8f8f9"
      >
        <Card
          :title="device.name"
          icon="ios-information-circle-outline"
          :padding="0"
          shadow
          style="width: 300px"
        >
          <CellGroup>
            <Cell>
              <strong>信任度:  100</strong>
            </Cell>
            <Cell :title="'型号: ' + device.model"/>
            <div @click="deviceDetailClick(device.id)">
              <Cell title="查看设备详细内容">
                <Icon slot="extra" type="ios-link" />
              </Cell>
            </div>
            <div @click="deviceHistoryDataClick(device.id)">
              <Cell title="查看设备历史数据">
                <Icon slot="extra" type="ios-link" />
              </Cell>
            </div>
          </CellGroup>
          <Row type="flex" justify="space-around" style="padding: 10px">
            <Col span="10">
              <Button type="info" long @click="modifyDeviceBtnClick(device.id)">
                修改设备信息
              </Button>
              <Modal
                v-model="modalControl"
                title="修改设备信息"
                footer-hide
                :closable="false"
              >
                <device-info-form
                  :deviceInfo="activeDevice"
                  :parentCancelBtnClick="modalCancelBtnClick"
                  :parentConfirmBtnClick="modalConfirmBtnClick"
                >
                </device-info-form>
              </Modal>
            </Col>
            <Col span="10">
              <Button type="warning" long @click="deleteBtnClick(listIndex)">
                删除设备
              </Button>
            </Col>
          </Row>
          <Row type="flex" justify="space-around" style="padding: 19px">
            <Button type="error" long @click="handleUpReport(true)">
              上报设备异常
            </Button>
            <Modal
              v-model="upReport"
              title="上报设备异常"
              footer-hide
              :closable="false"
            >
              <Card>
                <Divider plain orientation="right">异常信息补充</Divider>
                <Input v-model="check_input" type="textarea" :rows="5" placeholder="反馈信息..." />
                <Divider dashed="true"></Divider>
                <Button type="info" long @click="handleUpReport(false)">SUBMIT</Button>
              </Card>
            </Modal>
          </Row>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import addDevice from '_c/add-device'
import deviceInfoForm from '_c/device-info-form'

export default {
  components: {
    addDevice,
    deviceInfoForm
  },
  data () {
    return {
      searchInput: '',
      modalControl: false,
      upReport: false,
      check_input: '',
      // detailModalControl: false,
      activeDevice: {
        id: null,
        name: '',
        model: '',
        description: '',
        status: null,
        values: [
          {
            valueIndex: null,
            name: '',
            type: '',
            protocol: ''
          }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      deviceList: (state) => state.device.deviceList
    })
    // ...mapGetters(['formItem'])
  },
  methods: {
    ...mapMutations(['modeChange', 'setDeviceInfo', 'setDeviceInfoForHistory', 'releaseSensorAllHistoryData']),
    ...mapActions([
      'modifyDeviceListAction',
      'getDeviceListAction',
      'deleteDeviceAction',
      'getDeviceStatusAction'
    ]),
    handleStatus (status) {
      let ret = ''
      switch (status) {
        case 1: {
          ret = 'processing'
          break
        }
        case 2: {
          ret = 'success'
          break
        }
        case 3: {
          ret = 'error'
          break
        }
      }
      return ret
    },
    handleUpReport (sta) {
      this.upReport = sta
      if (sta === false) {
        this.$Message.success('设备异常上报成功')
        this.check_input = ''
      }
    },
    handleStatusCell (statue) {
      let ret = ''
      switch (statue) {
        case 1: {
          ret = '<span style="color:green">处理中</span>'
          break
        }
        case 2: {
          ret = '<span style="color:green">空闲</span>'
          break
        }
        case 3: {
          ret = '<span style="color:red">出错</span>'
          break
        }
      }
      return ret
    },
    modifyDeviceBtnClick (deviceId) {
      this.modalControl = true
      this.activeDevice = this.deviceList.find(
        (device) => device.id === deviceId
      )
      this.modeChange('UPDATE')
    },
    modalConfirmBtnClick (updateDeviceInfo) {
      this.modalControl = false
      this.modifyDeviceListAction(updateDeviceInfo)
    },
    modalCancelBtnClick () {
      this.modalControl = false
    },
    deleteBtnClick (listId) {
      this.deleteDeviceAction(listId)
    },
    deviceDetailClick (deviceId) {
      const deviceInfo = this.deviceList.find(
        (device) => device.id === deviceId
      )
      this.setDeviceInfo(deviceInfo)
      this.$router.push('/device/detail')
      this.modeChange('DETAIL')
    },
    deviceHistoryDataClick (deviceId) {
      const deviceInfo = this.deviceList.find(
        (device) => device.id === deviceId
      )
      this.setDeviceInfo(deviceInfo)
      this.releaseSensorAllHistoryData()
      this.setDeviceInfoForHistory(deviceInfo)
      this.$router.push('/device/history')
    }
  },
  watch: {},
  async mounted () {
    await this.getDeviceListAction()
    await this.getDeviceStatusAction()
  }
}
</script>
