<template>
  <Table border :columns="columns" :data="taskList" align="center">
    <template slot-scope="{ row }" slot="arrive_time">
      <strong>{{ row.arrive_time }}</strong>
    </template>
    <template slot-scope="{ row }" slot="deadline">
      <strong>{{ row.deadline }}</strong>
    </template>
    <template slot-scope="{ row }" slot="pro_name">
      <strong>{{ row.pro_name }}</strong>
    </template>
    <template slot-scope="{ row }" slot="action">
      <template v-if="row.state === 0">
<!--        <Button type="primary" size="median" style='margin-right:1%' @click="bindingBtnClick(row.id, )">-->
<!--          自动分配-->
<!--        </Button>-->
        <Button  size="median" style='margin-right:1%' @click="getTaskDeviceList(row.id, true, row.pro_name)">启动分配</Button>
      </template>
      <template v-if="row.state === 1">
        <Button type="success" size="median" style='margin-right:1%' @click="updateState(row.id, 3)">开始生产</Button>
      </template>
      <template v-if="row.state === 2">
        <Button type="warning" size="median" style='margin-right:1%' @click="changeXReportControl(true)">报告异常</Button>
      </template>
      <template v-if="row.state === 3">
        <Button type="primary" size="median" style='margin-right:1%' @click="updateState(row.id, 5)">
          暂停生产
        </Button>
        <Button  type="error" size="median" style='margin-right:1%' @click="updateState(row.id, 2)">终止生产</Button>
      </template>
      <template v-if="row.state === 4">
        <Button  type="normal" size="median" style='margin-right:1%' @click="changeCheckControl(true)">请求验收</Button>
      </template>
      <template v-if="row.state === 5">
        <Button  type="success" size="median" style='margin-right:1%' @click="updateState(row.id, 3)">继续生产</Button>
      </template>
    </template>
    <template slot-scope="{ row }" slot="state">
      <Button v-if="row.state === 0" type="normal" size="median" style='margin-right:1%'>
        待分配
      </Button>
      <Button v-if="row.state === 1" type="warning" size="median" style='margin-right:1%'>
        已分配
      </Button>
      <Button v-if="row.state === 2" type="error" size="median" style='margin-right:1%'>
        已终止
      </Button>
      <Button v-if="row.state === 3" loading="true" type="success" size="median" style='margin-right:1%'>
        生产中
      </Button>
      <Button v-if="row.state === 4" type="success" size="median" style='margin-right:1%'>
        已完成
      </Button>
      <Button v-if="row.state === 5" loading="true" type="error" size="median" style='margin-right:1%'>
        暂停中
      </Button>
    </template>
    <template slot-scope="{ row }" slot="task_id">
      <Button size="median" type="info" @click="taskDetail(row.task_id)" v-text="row.task_id">
      </Button>
      <Modal
        v-model="modalControl"
        footer-hide
        :closable="false"
      >
        <Card :model="task_info">
          <CellGroup>
            <cell title="任务进度： ">
              <strong>任务进度： </strong>
              <Progress :percent="90" :stroke-color="['#108ee9', '#87d068']" />
            </cell>
            <Divider plain orientation="left">任务基本信息</Divider>
            <cell>
              <p>任务ID： {{ task_info.task_id }}</p>
            </cell>
            <cell>
              <p>流程名称：{{ task_info.pro_name }} </p>
            </cell>
            <cell>
              <p>任务执行次数： {{ task_info.times }}</p>
            </cell>
            <cell>
              <p>任务发布时间： {{ task_info.arrive_time }}</p>
            </cell>
            <cell>
              <p>任务截止时间： {{ task_info.deadline }}</p>
            </cell>
            <cell>
              <p>下一个边缘端： {{ task_info.next_edge }}</p>
            </cell>
            <cell>
              <p>任务描述： {{ task_info.description }}</p>
            </cell>
            <Divider plain orientation="right">任务执行轨迹</Divider>
            <cell>
              <Timeline>
                <TimelineItem color="green">
                  <p class="time">{{ task_info.arrive_time }}</p>
                  <p class="content">任务发布</p>
                </TimelineItem>
                <TimelineItem color="blue">
                  <p class="time">{{ task_info.arrive_time }}</p>
                  <p class="content">任务分配完成</p>
                </TimelineItem>
                <TimelineItem color="red">
                  <p class="time">{{ task_info.deadline }}</p>
                  <p class="content">任务终止</p>
                </TimelineItem>
              </Timeline>
            </cell>
          </CellGroup>
        </Card>
      </Modal>
      <Modal
        v-model="checkControl"
        footer-hide
        :closable="false"
      >
        <Card :model="task_info">
          <Divider plain orientation="right">任务反馈</Divider>
          <Input v-model="check_input" type="textarea" :rows="8" placeholder="反馈信息..." />
          <Divider dashed="true"></Divider>
          <Button type="primary" long @click="changeCheckControl(false)">SUBMIT</Button>
        </Card>
      </Modal>
      <Modal
        v-model="xReportControl"
        footer-hide
        :closable="false"
      >
        <Card :model="task_info">
          <Divider plain orientation="left">异常信息补充</Divider>
          <Input v-model="x_report_input" type="textarea" :rows="8" placeholder="异常信息..." />
          <Divider dashed="true"></Divider>
          <Button type="primary" long @click="changeXReportControl(false)">SUBMIT</Button>
        </Card>
      </Modal>
      <Modal
        v-model="ManualAllocate"
        footer-hide
        :closable="false"
      >
<!--        <Col class="demo-spin-col" span="8">-->
<!--          <Spin fix v-if="spinShow">-->
<!--            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>-->
<!--            <div>智能算法分配中</div>-->
<!--          </Spin>-->
<!--        </Col>-->
        <Spin fix v-if="spinShow" class="demo-spin-col">
          <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
          <div>智能算法分配中</div>
        </Spin>
<!--        <Spin size="large" fix v-if="spinShow"></Spin>-->
        <Card>
          <Divider plain orientation="center">智能分配完成，可进行手动调整</Divider>
          <Row>
            <Col>
              <Button style="width:80px" class="button">裁剪</Button>
              <Select style="width:326px" class="select" placeholder="裁剪机器-ABB84">
                <Option value="New York" label="裁剪机器-ABB84">
                  <span>裁剪机器-ABB84</span>
                  <span style="float:right;color:#ccc">设备状态: 空闲 操作用时: 50min</span>
                </Option>
                <Option value="London" label="裁剪机器-IRB53">
                  <span>裁剪机器-IRB53</span>
                  <span style="float:right;color:#ccc">设备状态: 运行中 预计10min后完成任务 操作用时: 45min</span>
                </Option>
                <Option value="Sydney" label="裁剪机器-XC40">
                  <span>裁剪机器-XC40</span>
                  <span style="float:right;color:#ccc">设备状态: 空闲 操作用时: 50min</span>
                </Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button style="width:80px" class="button">切边</Button>
              <Select style="width:326px" class="select" placeholder="切边机器-XC30">
                <Option value="New York" label="切边机器-XC62">
                  <span>切边机器-XC62</span>
                  <span style="float:right;color:#ccc">设备状态: 空闲 操作用时: 20min</span>
                </Option>
                <Option value="London" label="切边机器-XC30">
                  <span>切边机器-XC30</span>
                  <span style="float:right;color:#ccc">设备状态: 空闲 操作用时: 30min</span>
                </Option>
                <Option value="Sydney" label="切边机器-XC75">
                  <span>切边机器-XC75</span>
                  <span style="float:right;color:#ccc">设备状态: 空闲 操作用时: 50min</span>
                </Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col class="button">
              <Button style="width:80px" class="button">压制</Button>
              <Select style="width:326px" class="select" placeholder="压制机器-XC597">
                <Option value="New York" label="压制机器-IRB75">
                  <span>压制机器-IRB75</span>
                  <span style="float:right;color:#ccc">设备状态: 空闲 操作用时: 20min</span>
                </Option>
                <Option value="London" label="压制机器-XC597">
                  <span>压制机器-XC597</span>
                  <span style="float:right;color:#ccc">设备状态: 空闲 操作用时: 30min</span>
                </Option>
                <Option value="Sydney" label="压制机器-ABB72" :disabled="true">
                  <span>压制机器-ABB72</span>
                  <span style="float:right;color:#ccc">待维修 不可用</span>
                </Option>
              </Select>
            </Col>
          </Row>
          <Divider orientation="right">预计生产时间</Divider>
          <Poptip word-wrap width="200" content="预计生产时长: 100min">
            <Button>预计生产时长</Button>
          </Poptip>
          <Divider orientation="left">分配完成</Divider>
          <Button type="primary" long @click="updateState(id, 1)">确认分配</Button>
        </Card>
      </Modal>
    </template>
  </Table>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { updateStateApi } from '@/api/task'

const columns = [
  {
    title: '任务状态',
    slot: 'state',
    width: 150,
    // taskState : 0:待分配  1：已分配 2：已终止 3：生产中 4：已完成 5：暂停中
    filters: [
      {
        label: '待分配',
        value: 0
      },
      {
        label: '已分配',
        value: 1
      },
      {
        label: '已终止',
        value: 2
      },
      {
        label: '生产中',
        value: 3
      },
      {
        label: '已完成',
        value: 4
      },
      {
        label: '暂停中',
        value: 5
      }
    ],
    filterMethod (value, row) {
      return row.state === value
    }
  },
  {
    title: '任务ID（点击查看任务详情）',
    slot: 'task_id',
    width: 300,
    align: 'center'
  },
  {
    title: '发布时间',
    slot: 'arrive_time',
    width: 160,
    sortable: true
  },
  {
    title: '任务截止时间',
    slot: 'deadline',
    width: 160,
    sortable: true
  },
  {
    title: '任务名称',
    slot: 'pro_name'
  },
  {
    title: '操作',
    slot: 'action'
  }
]

export default {
  name: 'taskManagement',
  inject: ['reload'],
  components: {
  },
  data: function () {
    return {
      columns,
      number: 1,
      visibleModal: false,
      processId: null,
      modalControl: false,
      checkControl: false,
      x_report_input: '',
      check_input: '',
      xReportControl: false,
      task_id: '',
      taskDeviceList: [],
      ManualAllocate: false,
      id: -1,
      spinShow: true,
      ManualAllocateNotice: false,
      task_info: {
        id: '',
        task_id: '',
        pro_name: '',
        times: null,
        arrive_time: null,
        deadline: null,
        next_edge: null,
        state: null,
        description: null
      },
      taskCraft: {
        name: '',
        craft_list: []
      }
    }
  },
  computed: {
    ...mapState({
      processList: (state) => state.process.processList,
      taskList: (state) => state.task.taskList,
      taskCraftList: (state) => state.task.taskCraftList,
      taskLogList: (state) => state.edgeLog.taskLogList
    })
  },
  methods: {
    ...mapActions(['getLogListAction', 'getTaskLogListAction']),
    ...mapMutations(['setActiveProcess']),
    ...mapActions(['getTaskListAction', 'getBindingListAction', 'processStopAction',
      'processStartAction', 'processDeleteAction', 'getTaskCraftListApi']),
    taskDetail (id) {
      this.modalControl = true
      console.log(this.taskList)
      this.task_info = this.taskList.find(
        (task_info) => task_info.task_id === id
      )
      console.log('task_item' + this.task_info.task_id)
      this.getTaskLogListAction(id)
      console.log(state.task.taskLogList)
    },
    taskCraftDetail (name) {
      this.taskCraft = this.taskCraftList.find(
        (taskCraft) => taskCraft.name === name
      )
      console.log('taskCraft' + this.taskCraft.craft_list)
    },
    changeXReportControl (s) {
      this.xReportControl = s
      this.x_report_input = ''
    },
    updateState (id, newState) {
      this.ManualAllocate = false
      const data = { id: id, newState: newState }
      updateStateApi(data).then(() => {
        this.$Message.success('操作成功')
        this.refresh()
      }).catch(e => {
        this.$Message.error(e.message)
      })
    },
    changeCheckControl (s) {
      this.checkControl = s
      this.check_input = ''
    },
    getTaskDeviceList (id, state, name) {
      setTimeout(() => {
        this.spinShow = false
      }, 3000)
      this.taskCraftDetail(name)
      this.ManualAllocate = state
      this.ManualAllocateNotice = true
      this.id = id
    },
    refresh () {
      this.reload()
    }
  },
  mounted () {
    this.getTaskListAction().then(() => {
      this.loading = false
    }).catch((err) => this.$Message.error(err.message))
    this.getTaskCraftListApi().then(() => {
      console.log('in View state.task.taskCraftList' + this.taskCraftList)
    }).catch((err) => this.$Message.error(err.message))
    this.taskList = state.task.taskList
  }
}
</script>

<style lang=scss scoped>
.button{
  margin-right: 24px;
  margin-bottom: 10px;
}
.select{
  margin-bottom: 10px;
}
.demo-spin-icon-load{
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from { transform: rotate(0deg);}
  50%  { transform: rotate(180deg);}
  to   { transform: rotate(360deg);}
}
.demo-spin-col{
}
</style>
