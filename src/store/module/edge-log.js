import { getAllEdgeLog, getTaskLog } from '@/api/edge-log'

export default {
  state: {
    logList: [],
    logInfo: null,
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
        objectName: null,
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
    }
  },
  actions: {
    async getLogListAction ({ commit }) {
      let res = await getAllEdgeLog()
      commit('setLogList', res['respData'])
      console.log('Get LogList from DB' + res['respData'])
    },
    async getTaskLogListAction ({ commit, id }) {
      let res = await getTaskLog(id)
      commit('setLogList', res['respData'])
      console.log('Get LogList from DB' + res['respData'])
    }
  }
}
