import { getCraftListApi } from '@/api/craft'

export default {
  state: {
    craftList: [],
    craftInfo: null,
    craftInfoForHistory: null,
    _craftItem: {
      name: null
    },
    mode: 'ADD'
  },
  getters: {
    formItem (state) {
      return { ...state._craftItem }
    },
    craftList (state) {
      console.log(state.craftList)
      return state.craftList.map(item => ({ id: item.id, name: item.name }))
    }
  },
  mutations: {
    resetFormItem (state) {
      state._craftItem = {
        name: null
      }
    },
    setCraftList (state, craftList) {
      if (craftList == null) {
        state.craftList = []
        console.log(state.craftList)
      } else {
        state.craftList = craftList
        console.log(state.craftList)
      }
    }
  },
  actions: {
    async getCraftListAction ({ commit }) {
      let res = await getCraftListApi()
      commit('setCraftList', res)
      console.log('Get craftList from DB')
    }
    // async addCraftAction ({ state, commit, getters, dispatch }, name) {
    //   let newCraft = await addCraftUnit(name)
    //   commit('addCraft', newCraft)
    //   console.log(`Add Craft ${JSON.stringify(newCraft)}`)
    // }
  }
}
