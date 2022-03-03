<template>
  <div class="property-panel" ref="propertyPanel">
    <el-form :inline="true" :model="form" label-width="100px" size="small">
      <el-form-item label="节点ID">
        <el-input v-model="form.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="节点名称">
        <el-input v-model="form.name" @input="nameChange"></el-input>
      </el-form-item>
      <el-form-item label="节点颜色">
        <el-color-picker v-model="form.color" @active-change="colorChange"></el-color-picker>
      </el-form-item>
      <!-- 任务节点允许选择人员 -->
      <el-form-item label="节点人员" v-if="userTask">
        <el-select v-model="form.userType" placeholder="请选择" @change="typeChange">
          <el-option value="assignee" label="指定人员"></el-option>
          <el-option value="candidateUsers" label="候选人员"></el-option>
          <el-option value="candidateGroups" label="角色/岗位"></el-option>
        </el-select>
      </el-form-item>
      <!-- 指定人员 -->
      <el-form-item label="指定人员" v-if="userTask && form.userType === 'assignee'">
        <el-select
          v-model="form.assignee"
          placeholder="请选择"
          key="1"
          @change="(value) => addUser({assignee: value})"
        >
          <el-option
            v-for="item in users"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 候选人员 -->
      <el-form-item label="候选人员" v-else-if="userTask && form.userType === 'candidateUsers'">
        <el-select
          v-model="form.candidateUsers"
          placeholder="请选择"
          key="2"
          multiple
          @change="(value) => addUser({candidateUsers: value.join(',') || value})"
        >
          <el-option
            v-for="item in users"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 角色/岗位 -->
      <el-form-item label="角色/岗位" v-else-if="userTask && form.userType === 'candidateGroups'">
        <el-select
          v-model="form.candidateGroups"
          placeholder="请选择"
          @change="(value) => addUser({candidateGroups: value})"
        >
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 分支允许添加条件 -->
      <el-form-item label="分支条件" v-if="sequenceFlow">
        <el-select v-model="form.user" placeholder="请选择">
          <el-option
            v-for="item in users"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
// eslint-disable-next-line no-unused-vars
import craft from '@/store/module/craft'
import { red } from 'mockjs/src/mock/random/color_dict'

export default {
  name: 'PropertyPanel',
  props: {
    modeler: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      resString: '',
      form: {
        id: '',
        name: '',
        color: null
      },
      element: {},
      users: [
        {
          value: 'zhangsan',
          label: '张三'
        },
        {
          value: 'lisi',
          label: '李四'
        },
        {
          value: 'wangwu',
          label: '王五'
        }
      ],
      roles: [
        {
          value: 'manager',
          label: '经理'
        },
        {
          value: 'personnel',
          label: '人事'
        },
        {
          value: 'charge',
          label: '主管'
        }
      ]
    }
  },
  mounted () {
    this.handleModeler()
    this.getCraftListAction()
    this.craftList = state.craft.craftList
  },
  methods: {
    ...mapActions([
      'getCraftListAction'
    ]),
    handleModeler () {
      // 监听节点选择变化
      this.modeler.on('selection.changed', e => {
        console.log('执行函数')
        const element = e.newSelection[0]
        this.element = element
        console.log('监听节点变化' + this.element)
        if (!element) return
        this.form = {
          ...element.businessObject,
          ...element.businessObject.$attrs
        }
        console.log('this.form: ' + this.form)
        const tmp = this.form.id.toString()
        console.log(tmp)
        if (tmp.includes('Activity')) {
          if (!this.form.name) return
          const cname = this.form.name.toString()
          console.log(cname)
          if (!this.checkCraftUnit(cname)) {
            this.$Message.error('工艺单元: ' + cname + ' 不存在， 请检查输入')
          }
        }
      })

      //  监听节点属性变化
      this.modeler.on('element.changed', e => {
        const { element } = e
        if (!element) return
        //  新增节点需要更新回属性面板
        if (element.id === this.form.id) {
          this.form.name = element.businessObject.name
          this.form = { ...this.form }
        }
      })
    },
    // 属性面板名称，更新回流程节点
    nameChange (name) {
      const modeling = this.modeler.get('modeling')
      modeling.updateLabel(this.element, name)
    },
    // 属性面板颜色，更新回流程节点
    colorChange (color) {
      const modeling = this.modeler.get('modeling')
      modeling.setColor(this.element, {
        fill: null,
        stroke: color
      })
      modeling.updateProperties(this.element, { color: color })
    },
    // 任务节点配置人员
    addUser (properties) {
      this.updateProperties(
        Object.assign(properties, {
          userType: Object.keys(properties)[0]
        })
      )
    },
    // 切换人员类型
    typeChange () {
      const types = ['assignee', 'candidateUsers', 'candidateGroups']
      types.forEach(type => {
        delete this.element.businessObject.$attrs[type]
        delete this.form[type]
      })
    },
    // 在这里我们封装一个通用的更新节点属性的方法
    updateProperties (properties) {
      const modeling = this.modeler.get('modeling')
      modeling.updateProperties(this.element, properties)
    },
    // tmp (name) {
    //   // // eslint-disable-next-line no-return-assign
    //   // checkCraftUnit(name).then(value => this.resString = value)
    //   checkCraftUnit(name)
    //     .then((d) => {
    //       // 请求成功后
    //       console.log('d' + d)
    //       return { data: d }
    //     }).catch(err => {
    //     // 请求失败
    //       console(err)
    //     //   let { response } = err
    //       // let resJson = response.json()
    //       // // resJson 是一个promise response.text() 似乎同样
    //       // resJson.then((res: any) => {
    //       //   console.log(res)
    //       // })
    //     })
    // },
    checkCraftUnit (cname) {
      // checkCraftUnit(name)
      //   .then((d) => {
      //     // 请求成功后
      //     console.log('d' + d)
      //     this.tmp(name)
      //     console.log(this.resString)
      //     if (d !== 'success') {
      //       // console.log(this.resString)
      //       this.$Message.error('工艺单元不存在， 请检查输入')
      //     }
      //     return { data: d }
      //   }).catch(err => {
      //   // 请求失败
      //     console(err)
      //   })
      var flag = false
      this.craftList.forEach((craft) => {
        console.log('craft' + craft)
        console.log('craftname' + craft.name)
        if (craft.name === cname) {
          flag = true
        }
      })
      // if (!this.craftList.includes(name)) {
      //   this.$Message.error('工艺单元不存在， 请检查输入')
      // }
      console.log('flag = ' + flag)
      return flag
    }
  },
  computed: {
    ...mapState({
      craftList: (state) => state.craft.craftList
    }),
    userTask () {
      if (!this.element) {
        return
      }
      return this.element.type === 'bpmn:UserTask'
    },
    sequenceFlow () {
      if (!this.element) {
        return
      }
      return this.element.type === 'bpmn:SequenceFlow'
    }
  }
}
</script>

<style lang="scss" scoped>
.property-panel {
  position: absolute;
  right: 0px;
  top: 0px;
  border-left: 1px solid #cccccc;
  padding: 20px 0;
  width: 300px;
  height: 100%;
}
</style>
