<template>
  <Table border :columns="columns" :data="taskList">
    <template slot-scope="{ row }" slot="name">
      <strong>{{ row.name }}</strong>
    </template>
    <template slot-scope="{ row }" slot="action">
      <Button type="primary" size="median" style='margin-right:1%' @click="bindingBtnClick(row.id)">
        自动分配
      </Button>
      <Button  size="median" style='margin-right:1%' @click="processStopBtnClick(row.id)">手动分配</Button>
    </template>
    <template slot-scope="{ row }" slot="taskState">
      <Button v-if="row.taskState" type="success" size="median" style='margin-right:1%'>
        已分配
      </Button>
      <Button v-if="!row.taskState" type="warning" size="median" style='margin-right:1%'>
        未分配
      </Button>
    </template>
  </Table>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

const columns = [
  {
    title: '任务状态',
    slot: 'taskState'
  },
  {
    title: '任务名',
    slot: 'name'
  },
  {
    title: '发布时间',
    key: 'releaseTime'
  },
  {
    title: '操作',
    slot: 'action'
  }
]

export default {
  name: 'taskManagement',
  data: function () {
    return {
      columns,
      number: 1,
      visibleModal: false,
      processId: null,
      taskList: [
        { taskState: true, name: 335, releaseTime: '2020-11-20' },
        { taskState: false, name: 310, releaseTime: '2020-11-20' },
        { taskState: true, name: 234, releaseTime: '2020-11-20' },
        { taskState: false, name: 135, releaseTime: '2020-11-20' },
        { taskState: true, name: 1548, releaseTime: '2020-11-20' }
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
      'processStartAction', 'processDeleteAction'])
  }
}
</script>

<style lang=scss scoped>
</style>
