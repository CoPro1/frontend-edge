<template>
  <div>
        <Card title="现有工艺单元(点击进行复制)" :closable="false" v-model="craftControl" :prop="craftList">
          <p slot="title">
            <Icon type="md-build" />
            现有工艺单元(点击进行复制)
          </p>
          <Row class="row">
            <Col
              class="col"
              span="2"
              v-for="(craft, listIndex) in craftList"
              v-bind:key="listIndex"
            >
              <Col>
                <Button
                  size="small"
                  class="copy"
                  @click="copywxtap"
                  :data-clipboard-text="craft.name"
                  v-text="craft.name"
                  type="info"
                >
                </Button>
              </Col>
            </Col>
          </Row>
        </Card>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Clipboard from 'clipboard'

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
    ]),
    copywxtap () {
      const clipboard = new Clipboard('.copy')
      clipboard.on('success', (e) => {
        this.$Message.success('复制成功')
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', (e) => {
        // 不支持复制
        this.$Message.error('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    }
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
.row {
  margin-top: 10px;
  margin-bottom: 10px;
}
.col{
  margin-top: 4px;
  margin-bottom: 4px;
}
</style>
