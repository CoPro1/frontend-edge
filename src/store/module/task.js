import { getProcessDeviceApi, getTaskCraftList, getTaskListApi } from '@/api/task'

export default {
  state: {
    taskList: [],
    taskInfo: null,
    taskCraftList: [],
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
    _taskCraftItem: {
      name: null,
      craft_list: []
    },
    mode: 'ADD'
  },
  getters: {
    formItem (state) {
      return { ...state._taskItem, ...state._taskCraftItem }
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
    },
    taskCraftList (state) {
      console.log(state.taskCraftList)
      return state.taskCraftList.map(item => ({
        name: item.name,
        craft_list: item.craft_list }))
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
      state._taskCraftItem = {
        name: null,
        craft_list: []
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
    },
    setTaskCraftList (state, taskCraftList) {
      if (taskCraftList == null) {
        state.taskCraftList = []
        console.log(state.taskCraftList)
      } else {
        state.taskCraftList = taskCraftList
        console.log('setTaskCraftList' + state.taskCraftList)
      }
    }
  },
  actions: {
    async getTaskListAction ({ commit }) {
      let res = await getTaskListApi()
      commit('setTaskList', res)
      console.log('Get taskList from DB')
    },
    async getTaskCraftListApi ({ commit }) {
      let res = await getTaskCraftList()
      commit('setTaskCraftList', res)
      console.log('Get TaskCraftListApi from DB')
    }
  }
}
