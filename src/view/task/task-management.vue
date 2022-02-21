<template>
  <Table border :columns="columns" :data="taskList">
    <template slot-scope="{ row }" slot="releaseTime">
      <strong>{{ row.releaseTime }}</strong>
    </template>
    <template slot-scope="{ row }" slot="action">
      <template v-if="row.taskState === 0">
        <Button type="primary" size="median" style='margin-right:1%' @click="bindingBtnClick(row.id)">
          自动分配
        </Button>
        <Button  size="median" style='margin-right:1%' @click="processStopBtnClick(row.id)">手动分配</Button>
      </template>
      <template v-if="row.taskState === 1">
        <Button type="success" size="median" style='margin-right:1%' @click="processStopBtnClick(row.id)">开始生产</Button>
      </template>
      <template v-if="row.taskState === 2">
        <Button type="warning" size="median" style='margin-right:1%' @click="processStopBtnClick(row.id)">报告异常</Button>
      </template>
      <template v-if="row.taskState === 3">
        <Button type="primary" size="median" style='margin-right:1%' @click="bindingBtnClick(row.id)">
          暂停生产
        </Button>
        <Button  type="error" size="median" style='margin-right:1%' @click="processStopBtnClick(row.id)">终止生产</Button>
      </template>
      <template v-if="row.taskState === 4">
        <Button  type="normal" size="median" style='margin-right:1%' @click="processStopBtnClick(row.id)">查看报告</Button>
      </template>
      <template v-if="row.taskState === 5">
        <Button  type="success" size="median" style='margin-right:1%' @click="processStopBtnClick(row.id)">继续生产</Button>
      </template>
    </template>
    <template slot-scope="{ row }" slot="taskState">
      <Button v-if="row.taskState === 0" type="normal" size="median" style='margin-right:1%'>
        待分配
      </Button>
      <Button v-if="row.taskState === 1" type="warning" size="median" style='margin-right:1%'>
        已分配
      </Button>
      <Button v-if="row.taskState === 2" type="error" size="median" style='margin-right:1%'>
        已终止
      </Button>
      <Button v-if="row.taskState === 3" loading="true" type="success" size="median" style='margin-right:1%'>
        生产中
      </Button>
      <Button v-if="row.taskState === 4" type="success" size="median" style='margin-right:1%'>
        已完成
      </Button>
      <Button v-if="row.taskState === 5" loading="true" type="error" size="median" style='margin-right:1%'>
        暂停中
      </Button>
    </template>
    <template slot-scope="{ row }" slot="name">
      <Button size="median" type="info" style='margin-right:1%' @click="taskDetail(row.name)" v-text="row.name">
      </Button>
      <Modal
        v-model="modalControl"
        title="任务详情"
        footer-hide
        :closable="false"
      >
        <Card>
          <p>这里还没传值</p>
          <p>不出意外的话传任务的基本信息</p>
          <p>会变的值应该只有任务状态、剩余尚未生产的量、预计剩余时间这种</p>
        </Card>
      </Modal>
    </template>
  </Table>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
// import taskDatailInfoForm from 'src/view/task/task-detail-form.vue'

const columns = [
  {
    title: '任务状态',
    slot: 'taskState'
  },
  {
    title: '任务名（点击查看任务详情）',
    slot: 'name'
  },
  {
    title: '发布时间',
    slot: 'releaseTime'
  },
  {
    title: '操作',
    slot: 'action'
  }
]

export default {
  name: 'taskManagement',
  components: {
  },
  data: function () {
    return {
      columns,
      number: 1,
      visibleModal: false,
      processId: null,
      modalControl: false,
      taskList: [
        // taskState : 0:待分配  1：已分配 2：已终止 3：生产中 4：已完成 5：暂停中
        { taskState: 0, name: 335, releaseTime: '2020-11-21' },
        { taskState: 1, name: 310, releaseTime: '2020-11-20' },
        { taskState: 2, name: 234, releaseTime: '2020-11-24' },
        { taskState: 3, name: 135, releaseTime: '2020-11-06' },
        { taskState: 4, name: 148, releaseTime: '2020-11-29' },
        { taskState: 5, name: 268, releaseTime: '2020-11-25' }
      ]
    }
  },
  computed: {
    ...mapState({
      processList: (state) => state.process.processList
    })
  },
  methods: {
    ...mapMutations(['setActiveProcess']),
    ...mapActions(['getAllProcessesAction', 'getBindingListAction', 'processStopAction',
      'processStartAction', 'processDeleteAction']),
    taskDetail (name) {
      this.modalControl = true
      this.modeChange('ADD')
    }
  }
}
</script>

<style lang=scss scoped>
</style>
