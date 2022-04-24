<template>
  <div>
    <my-craft-list/>
    <br>
    <vue-bpmn :processData="this.processData" />
  </div>
</template>

<script>
import VueBpmn from '_c/vue-bpmn'
import { mapState } from 'vuex'
import MyCraftList from '_c/craft/craftList'

export default {
  name: 'ProcessModification',
  components: {
    MyCraftList,
    VueBpmn
  },
  data: function () {
    return {

    }
  },
  computed: {
    ...mapState({
      processData: (state) => { return state.processManagement.processData }
    })
  }
}
</script>

<style lang=scss scoped>

</style>
