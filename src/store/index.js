import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import device from './module/device'
import sensor from './module/sensor'
import process from './module/process'
import craft from '@/store/module/craft'
import processManagement from '@/store/module/process-management'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    device,
    sensor,
    process,
    craft,
    processManagement
  }
})
