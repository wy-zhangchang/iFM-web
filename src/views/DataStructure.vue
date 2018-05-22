<style>
  ul {
    list-style: none;
  }
</style>
<template>
      <Modal
        width="80%"
        v-model="modal1"
        title="编辑">
        <Form :model="formDynamic" :label-width="80">
          <FormItem label="名称">
            <Input v-model="formDynamic.objectName" placeholder="请输入名称"></Input>
          </FormItem>
          <ul>
            <li v-for="(item, index) in formDynamic.items">
              <FormItem label="标准组">
                <Row>
                  <Col span="20">
                    <Select v-model="formDynamic.items[index].groupId" placeholder="请选择标准组名称">
                      <Option v-for="m in manageGroup" :value="m.id" :key="m.id">{{ m.name }}</Option>
                    </Select>
                  </Col>
                  <Col span="4">
                    <Button type="primary" style="margin-left: 68px">删除标准组</Button>
                  </Col>
                </Row>
              </FormItem>
              <FormItem v-for="(v, k) in formDynamic.items[index].standards" label="标准项" style="margin-left: 50px">
                <Row>
                  <Col span="20">
                    <AutoComplete
                      v-model="formDynamic.items[index].standards[k]"
                      placeholder="请输入标准项名称">
                      <Option v-for="s in standarsAll['id' + formDynamic.items[index].groupId]" :value="s" :key="s">{{ s }}</Option>
                    </AutoComplete>
                  </Col>
                  <Col span="4">
                    <Button type="primary" style="margin-left: 60px">删除标准项</Button>
                  </Col>
                </Row>
              </FormItem>
              <FormItem style="margin-left: 50px">
                <Button type="primary" long style="width: 25%">新增标准项</Button>
              </FormItem>
            </li>
          </ul>
          <FormItem>
            <Button type="primary" long style="width: 80%">新增标准组</Button>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="primary">确&nbsp;&nbsp;定</Button>
          <Button type="ghost">取&nbsp;&nbsp;消</Button>
        </div>
      </Modal>
</template>

<script>
  export default {
    data () {
      return {
        modal1: true,
        formDynamic: {
          objectName: 'demo',
          items: [
            {groupId: 4, standards: ['d1', 'd3']},
            {groupId: 1, standards: ['a1', 'a3']},
            {groupId: 2, standards: ['b1', 'b3']},
          ]
        },
        manageGroup: [
          {id: 1, name: 'a'},
          {id: 2, name: 'b'},
          {id: 3, name: 'c'},
          {id: 4, name: 'd'},
        ],
        standarsAll: {
          id1:['a1', 'a2', 'a3'],
          id4:['d1', 'd2', 'd3'],
          id2:['b1', 'b2', 'b3'],
          id3:['c1', 'c2', 'c3'],
        }
      }
    }
  }
</script>

<style>

</style>
