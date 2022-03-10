<template>
  <div>
    <Card
      :prop="craftList"
    >
      <p slot="title">
        <Icon type="md-build" />
        现有工艺单元
      </p>
      <Row>
        <Col
          span="2"
          v-for="(craft, listIndex) in craftList"
          v-bind:key="listIndex"
        >
          <Col>
            <Tag size="large" type="primary" v-text="craft.name"></Tag>
          </Col>
        </Col>
      </Row>
      <br>
      <Row type="flex" justify="end">
        <Button type="info" @click="addCraftBtnClick" icon="md-add-circle">
          新增工艺单元
        </Button>
      </Row>
    </Card>
    <br>
    <Row>
      <Card>
        <Row type="flex" justify="end">
          <Button
            class="add-edge"
            type="primary"
            icon="md-add"
            ghost
            to="/process_management/process-configuration"
          >
            新建工艺流程
          </Button>
          <Modal
            v-model="craftControl"
            title="新建工艺流程"
            footer-hide
            :closable="false"
          >
            <Card>
              <Row>
                <Input v-model="craftName" placeholder="请输入工艺流程名称" />
              </Row>
              <br>
              <Row type="flex" justify="end">
                <Button type="primary" icon="md-checkmark" @click="addCraft" >
                    提交
                </Button>
              </Row>
            </Card>
          </Modal>
        </Row>
        <br>
        <Row>
          <paged-table
            :loading="loading"
            :columns="columns"
            :data-source=" processList"
            :total=" processList.length"
            style="margin-bottom: 50px"
          />
        </Row>
        <Modal
          v-model="modalControl"
          title="下发流程"
          footer-hide
          :closable="false"
        >
          <issue-form
            :issueProcess="issueProcess"
            :parentCancelBtnClick="modalCancelBtnClick"
            :parentConfirmBtnClick="modalConfirmBtnClick"
          >
          </issue-form>
        </Modal>
      </Card>
    </Row>
  </div>
</template>

<script>
import PagedTable from '_c/paged-table/paged-table.vue'
import PopConfirmButton from '_c/pop-confirm-button'
import issueForm from '_c/issue-form/issue-form'
import { mapState, mapActions, mapMutations } from 'vuex'
import { addCraftUnit } from '@/api/craft'

export default {
  name: 'ProcessManagement',
  components: {
    PagedTable,
    issueForm
  },
  data: function () {
    return {
      loading: true,
      modalControl: false,
      craftControl: false,
      issueProcess: null,
      craftName: '',
      changeTmp: false,
      columns: [
        {
          title: 'id',
          key: 'id'
        },
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '创建时间',
          key: 'createdTime'
        },
        {
          title: '流程状态',
          key: 'status'
        },
        // {
        //   title: '启用状态',
        //   key: 'flag'
        // },
        {
          title: '操作',
          key: 'operation',
          render: (h, { row }) => {
            // const banButton = h(PopConfirmButton, {
            //   props: {
            //     buttonProps: {
            //       size: 'small', type: 'warning'
            //     },
            //     buttonText: '禁用',
            //     popTipTitle: '确定要禁用这个流程？',
            //     ok: () => this.handleBan(row.id)
            //   }
            // })
            const deleteButton = h(PopConfirmButton, {
              props: {
                buttonProps: {
                  size: 'small', type: 'error'
                },
                buttonText: '删除',
                popTipTitle: '确定要删除这个流程？',
                ok: () => this.handleDelete(row.id)
              }
            })
            const editButton = h('Button',
              {
                props: {
                  size: 'small',
                  type: 'primary'
                },
                style: {
                  marginRight: '1%'
                },
                on: {
                  click: () => {
                    this.handleEdit(row)
                  }
                }
              },
              '编辑'
            )
            const issueButton = h('Button',
              {
                props: {
                  size: 'small',
                  type: 'primary'
                },
                style: {
                  marginRight: '1%'
                },
                on: {
                  click: () => {
                    this.modalControl = true
                    this.issueProcess = row
                  }
                }
              },
              '下发'
            )
            const buttons = [issueButton, editButton, deleteButton]
            return h('div', buttons)
          }
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'getProcessListAction',
      'removeProcessAction',
      'banProcessAction',
      'enableProcessAction',
      'connectProcessAction',
      'connectStopProcessAction',
      'getCraftListAction'
    ]),
    ...mapMutations(['setProcess']),
    handleDelete (id) {
      this.removeProcessAction(id).then(
        () => this.$Message.success('删除成功')
      ).catch(
        (err) => this.$Message.error(err.message)
      )
    },
    handleBan (id) {
      this.banProcessAction(id).then(
        () => this.$Message.success('禁用成功')
      ).catch(
        (err) => this.$Message.error(err.message)
      )
    },
    handleEnable (id) {
      this.enableProcessAction(id).then(
        () => this.$Message.success('启用成功')
      ).catch(
        (err) => this.$Message.error(err.message)
      )
    },
    handleEdit (data) {
      this.setProcess(data)
      this.$router.push({ path: 'process-modification' })
    },
    modalCancelBtnClick () {
      this.modalControl = false
    },
    modalConfirmBtnClick () {
      this.modalControl = false
    },
    addCraftBtnClick () {
      this.craftControl = true
    },
    addCraft () {
      let flag = false
      this.craftList.forEach((craft) => {
        console.log('craft' + craft)
        console.log('craftname' + craft.name)
        if (craft.name === this.craftName) {
          flag = true
        }
      })
      console.log('flag = ' + flag)
      if (flag === false) {
        addCraftUnit(this.craftName)
        console.log('添加工艺单元成功')
        this.craftList.push({ id: this.craftList.length, name: this.craftName })
        this.craftControl = false
        this.changeTmp = !this.changeTmp
        this.craftName = ''
        this.$Message.success('添加工艺单元成功')
      } else {
        this.craftName = ''
        console.log('该工艺单元已存在')
        this.$Message.error('该工艺单元已存在')
      }
    }
  },
  mounted () {
    this.loading = true
    this.getProcessListAction().then(() => {
      this.loading = false
    }).catch((err) => this.$Message.error(err.message))
    this.getCraftListAction()
    this.craftList = state.craft.craftList
  },
  computed: {
    ...mapState({
      processList: (state) => state.processManagement.processList,
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
