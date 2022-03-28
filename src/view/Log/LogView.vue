<template>
  <div>
    <Card>
      <p class="card-title">
        <Icon type="ios-pricetags" />
        边端日志记录
      </p>
      <Timeline class="timeline">
        <TimelineItem v-for="(log, listIndex) in logList"
                      v-bind:key="listIndex">
          <p class="title">{{log.operationAlias}}</p>
          <p class="time">操作员 : {{ log.operator }}</p>
          <p class="time">操作时间 : {{ log.extraWords }}</p>
        </TimelineItem>
      </Timeline>
    </Card>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
  name: 'LogView',
  inject: ['reload'],
  components: {
  },
  data: function () {
    return {
    }
  },
  computed: {
    ...mapState({
      logList: (state) => state.edgeLog.logList
    })
  },
  methods: {
    ...mapActions(['getLogListAction']),
    refresh () {
      this.reload()
    }
  },
  mounted () {
    this.loading = true
    this.getLogListAction().then(() => {
      this.loading = false
    }).catch((err) => this.$Message.error(err.message))
    this.logList = state.edgeLog.logList
    console.log('是这个嘛' + this.logList)
  }

}
</script>

<style scoped>
.timeline{
  padding-left: 70px;
}
.title{
  font-size: 20px;
  font-weight: bold;
}
.time{
  padding-left: 30px;
  font-size: 15px;
  /*font-weight: bold;*/
}
.card-title{
  font-size: 30px;
  padding-bottom: 30px;
  padding-left: 30px;
  font-weight: bold;
}
</style>
