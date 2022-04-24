<template>
  <div>
    <my-craft-list/>
    <br>
    <vue-bpmn />
  </div>
</template>

<script>
import VueBpmn from '_c/vue-bpmn'
import MyCraftList from '_c/craft/craftList'

export default {
  name: 'ProcessConfiguration',
  components: {
    MyCraftList,
    VueBpmn
  },
  data: function () {
    return {
    }
  },
  methods: {

  },
  mounted () {

  },
  computed: {

  }
}
</script>

<style lang=scss scoped>

</style>
