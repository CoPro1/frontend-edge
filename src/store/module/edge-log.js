import { getAllEdgeLog, getTaskLog } from '@/api/edge-log'

export default {
  state: {
    logList: [],
    taskLogList: [],
    logInfo: null,
    id: '',
    logInfoForHistory: null,
    _logItem: {
      id: null,
      appName: null,
      objectName: null,
      objectId: null,
      operator: null,
      operationName: null,
      operationAlias: null,
      extraWords: null,
      comment: null,
      operationTime: null,
      attributeModelList: null
    },
    mode: 'ADD'
  },
  getters: {
    formItem (state) {
      return { ...state._logItem }
    },
    logList (state) {
      console.log(state.logList)
      return state.logList.map(item => ({
        id: item.id,
        appName: item.appName,
        objectName: item.objectName,
        objectId: this.objectId,
        operator: this.operator,
        operationName: this.operationName,
        operationAlias: this.operationAlias,
        extraWords: this.extraWords,
        comment: this.comment,
        operationTime: this.operationTime,
        attributeModelList: this.attributeModelList }))
    }
  },
  mutations: {
    resetFormItem (state) {
      state._logItem = {
        id: null,
        appName: null,
        objectName: '',
        objectId: null,
        operator: null,
        operationName: null,
        operationAlias: null,
        extraWords: null,
        comment: null,
        operationTime: null,
        attributeModelList: null
      }
    },
    setLogList (state, logList) {
      if (logList == null) {
        state.logList = []
      } else {
        state.logList = logList
      }
      console.log(logList)
    },
    setTaskLog (state, taskLogList) {
      if (taskLogList == null) {
        state.taskLogList = []
      } else {
        state.taskLogList = taskLogList
      }
      console.log(taskLogList)
    }
  },
  actions: {
    async getLogListAction ({ commit }) {
      let res = await getAllEdgeLog()
      commit('setLogList', res['respData'])
      console.log('Get LogList from DB' + res['respData'])
    },
    getTaskLogListAction ({ commit, id }) {
      this.id = id
      let res = getTaskLog(this.id)
      console.log('getTaskLogListAction' + this.id)
      commit('setTaskLog', res['respData'])
      console.log('Get TaskLog from DB' + res['respData'])
    }
  }
}
