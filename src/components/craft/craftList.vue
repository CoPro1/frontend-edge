<template>
  <div>
        <Button icon="ios-search" @click="craftControl = true" type="primary" size="large">查看现有工艺单元</Button>
        <Drawer title="现有工艺单元" :closable="false" v-model="craftControl" :prop="craftList">
          <p slot="title">
            <Icon type="md-build" />
            现有工艺单元
          </p>
          <Row
            v-for="(craft, listIndex) in craftList"
            v-bind:key="listIndex"
          >
            <p v-text="craft.name" :style="pStyle"/>
          </Row>
        </Drawer>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'myCraftList',
  data: function () {
    return {
      loading: true,
      modalControl: false,
      craftControl: false,
      issueProcess: null,
      craftName: '',
      changeTmp: false,
      pStyle: {
        fontSize: '14px',
        lineHeight: '24px',
        display: 'block',
        marginBottom: '16px'
      }
    }
  },
  methods: {
    ...mapActions([
      'getCraftListAction'
    ])
  },
  mounted () {
    this.getCraftListAction()
    this.craftList = state.craft.craftList
  },
  computed: {
    ...mapState({
      craftList: (state) => state.craft.craftList
    })
  },
  watch: {
    changeTmp () {
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>

</style>
