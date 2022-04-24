import { getTaskListApi } from '@/api/task'

export default {
  state: {
    taskList: [],
    taskInfo: null,
    taskInfoForHistory: null,
    _taskItem: {
      id: null,
      task_id: '',
      pro_name: null,
      times: null,
      arrive_time: null,
      deadline: null,
      next_edge: null,
      state: null,
      description: null
    },
    mode: 'ADD'
  },
  getters: {
    formItem (state) {
      return { ...state._taskItem }
    },
    taskList (state) {
      console.log(state.taskList)
      return state.taskList.map(item => ({
        id: item.id,
        task_id: item.task_id,
        pro_name: item.pro_name,
        times: this.times,
        arrive_time: this.arrive_time,
        deadline: this.deadline,
        next_edge: this.next_edge,
        state: this.state,
        description: this.description }))
    }
  },
  mutations: {
    resetFormItem (state) {
      state._taskItem = {
        id: null,
        task_id: null,
        pro_name: null,
        times: null,
        arrive_time: null,
        deadline: null,
        next_edge: null,
        state: null,
        description: null
      }
    },
    setTaskList (state, taskList) {
      if (taskList == null) {
        state.taskList = []
        console.log(state.taskList)
      } else {
        state.taskList = taskList
        console.log(state.taskList)
      }
    }
  },
  actions: {
    async getTaskListAction ({ commit }) {
      let res = await getTaskListApi()
      commit('setTaskList', res)
      console.log('Get taskList from DB')
    }
  }
}
