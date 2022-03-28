<template>
  <Table border :columns="columns" :data="taskList">
    <template slot-scope="{ row }" slot="arrive_time">
      <strong>{{ row.arrive_time }}</strong>
    </template>
    <template slot-scope="{ row }" slot="deadline">
      <strong>{{ row.deadline }}</strong>
    </template>
    <template slot-scope="{ row }" slot="description">
      <strong>{{ row.description }}</strong>
    </template>
    <template slot-scope="{ row }" slot="action">
      <template v-if="row.state === 0">
        <Button type="primary" size="median" style='margin-right:1%' @click="bindingBtnClick(row.id, )">
          自动分配
        </Button>
        <Button  size="median" style='margin-right:1%' @click="processStopBtnClick(row.id)">手动分配</Button>
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
      <Button size="median" type="info" style='margin-right:1%' @click="taskDetail(row.task_id)" v-text="row.task_id">
      </Button>
      <Modal
        v-model="modalControl"
        footer-hide
        :closable="false"
      >
        <Card>
          <CellGroup>
            <cell title="任务进度： ">
              <strong>任务进度： </strong>
              <Progress :percent="90" :stroke-color="['#108ee9', '#87d068']" />
            </cell>
            <Divider plain orientation="left">任务基本信息</Divider>
            <cell>
              <p>任务ID： {{ row.task_id }}</p>
            </cell>
            <cell>
              <p>流程名称：{{ row.pro_name }} </p>
            </cell>
            <cell>
              <p>任务执行次数： {{ row.times }}</p>
            </cell>
            <cell>
              <p>任务发布时间： {{ row.arrive_time }}</p>
            </cell>
            <cell>
              <p>任务截止时间： {{ row.deadline }}</p>
            </cell>
            <cell>
              <p>下一个边缘端： {{ row.next_edge }}</p>
            </cell>
            <cell>
              <p>任务描述： {{ row.description }}</p>
            </cell>
            <Divider plain orientation="right">任务执行轨迹</Divider>
            <cell>
              <Timeline>
                <TimelineItem color="green">
                  <p class="time">{{ row.arrive_time }}</p>
                  <p class="content">任务发布</p>
                </TimelineItem>
                <TimelineItem color="blue">
                  <p class="time">{{ row.arrive_time }}</p>
                  <p class="content">任务分配完成</p>
                </TimelineItem>
                <TimelineItem color="red">
                  <p class="time">{{ row.deadline }}</p>
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
        <Card>
          <CellGroup>
            <cell title="任务进度： ">
              <strong>任务进度： </strong>
              <Progress :percent="100" :stroke-color="['#108ee9', '#87d068']" />
            </cell>
            <Divider plain orientation="left">任务基本信息</Divider>
            <cell>
              <p>任务ID： {{ row.task_id }}</p>
            </cell>
            <cell>
              <p>任务发布时间： {{ row.arrive_time }}</p>
            </cell>
            <cell>
              <p>任务截止时间： {{ row.deadline }}</p>
            </cell>
          </CellGroup>
          <Divider plain orientation="right">任务反馈</Divider>
          <Input v-model="check_input" type="textarea" :rows="4" placeholder="反馈信息..." />
          <Divider dashed="true"></Divider>
          <Button type="success" long @click="changeCheckControl(false)">SUBMIT</Button>
        </Card>
      </Modal>
      <Modal
        v-model="xReportControl"
        footer-hide
        :closable="false"
      >
        <Card>
          <CellGroup>
          <Divider plain orientation="left">任务  {{ row.task_id }}  执行轨迹</Divider>
            <cell>
              <Timeline>
                <TimelineItem color="green">
                  <p class="time">{{ row.arrive_time }}</p>
                  <p class="content">任务发布</p>
                </TimelineItem>
                <TimelineItem color="blue">
                  <p class="time">{{ row.arrive_time }}</p>
                  <p class="content">任务分配完成</p>
                </TimelineItem>
                <TimelineItem color="red">
                  <p class="time">{{ row.deadline }}</p>
                  <p class="content">任务终止</p>
                </TimelineItem>
              </Timeline>
            </cell>
          </CellGroup>
          <Divider plain orientation="right">异常信息补充</Divider>
          <Input v-model="x_report_input" type="textarea" :rows="4" placeholder="异常信息..." />
          <Divider dashed="true"></Divider>
          <Button type="success" long @click="changeXReportControl(false)">SUBMIT</Button>
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
    title: '任务名（点击查看任务详情）',
    slot: 'task_id'
  },
  {
    title: '发布时间',
    slot: 'arrive_time',
    sortable: true
  },
  {
    title: '任务截止时间',
    slot: 'deadline',
    sortable: true
  },
  {
    title: '任务描述',
    slot: 'description'
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
      task_id: ''
    }
  },
  computed: {
    ...mapState({
      processList: (state) => state.process.processList,
      taskList: (state) => state.task.taskList,
      taskLogList: (state) => state.edgeLog.taskLogList
    })
  },
  methods: {
    ...mapActions(['getLogListAction']),
    ...mapMutations(['setActiveProcess']),
    ...mapActions(['getTaskListAction', 'getBindingListAction', 'processStopAction',
      'processStartAction', 'processDeleteAction']),
    taskDetail (id) {
      console.log(id)
      this.task_id = id
      console.log('taskDetail')
      // state.getTaskLogListAction(id)
      this.modalControl = true
    },
    changeXReportControl (s) {
      this.xReportControl = s
    },
    updateState (id, newState) {
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
    },
    refresh () {
      this.reload()
    }
  },
  mounted () {
    this.getTaskListAction().then(() => {
      this.loading = false
    }).catch((err) => this.$Message.error(err.message))
    this.getTaskListAction()
    this.taskList = state.task.taskList
    console.log(this.taskList)
    console.log(this.logList)
  }
}
</script>

<style lang=scss scoped>
</style>
