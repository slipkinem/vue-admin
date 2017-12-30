<template>
  <section>
    <el-row :gutter="20">
      <el-col :span="24" :offset="22">
        <el-button type="text" @click="insertClick">
          <i class="el-icon-plus"></i>新增
        </el-button>
      </el-col>
    </el-row>
    <template>
      <el-table
        :data="tableData.data"
        border
        algin="center"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          width="120"
          sortable
        ></el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="120"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="100"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="province"
          label="省份"
          width="100"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="city"
          label="市区"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="300"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="zip"
          label="邮编"
          width="100"
          sortable
        >
        </el-table-column>
        <el-table-column
          inline-template
          :context="_self"
          label="操作"
        >
            <span>
                <el-button @click="editClick($index, row)" type="text" size="small">编辑</el-button>
                <el-button @click="deleteData(row)" type="text" size="small">删除</el-button>
            </span>
        </el-table-column>
      </el-table>
    </template>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total">
      </el-pagination>
    </div>
    <!--edit form-->
    <el-dialog :title="dialogTitle" v-model="dialogFormVisible">
      <el-form :model="formData" :rules="rules" ref="formData">

        <el-form-item label="日期" :label-width="'120px'" prop="date">
          <el-date-picker
            v-model="formData.date"
            type="date"
            align="right"
            :picker-options="pickerOptions"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="姓名" :label-width="'120px'" prop="name">
          <el-input auto-complete="off" v-model="formData.name"></el-input>
        </el-form-item>

        <el-form-item label="省份" :label-width="'120px'" prop="province">
          <el-input auto-complete="off" v-model="formData.province"></el-input>
        </el-form-item>

        <el-form-item label="市区" :label-width="'120px'" prop="city">
          <el-input auto-complete="off" v-model="formData.city"></el-input>
        </el-form-item>

        <el-form-item label="地址" :label-width="'120px'" prop="address">
          <el-input auto-complete="off" v-model="formData.address"></el-input>
        </el-form-item>

        <el-form-item label="邮编" :label-width="'120px'" prop="zip">
          <el-input auto-complete="off" v-model="formData.zip"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog" type="info">取 消</el-button>
        <el-button @click="closeDialog" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    data () {
      let zipValidator = (rule, value, callback) => {
        if (!/^[0-9]*$/.test(value.trim())) {
          callback(new Error('请输入数字'))
        } else {
          callback()
        }
      }
      return {
        page: {
          current: 1,
          size: 10
        },
        formData: {
          date: '',
          name: '',
          province: '',
          city: '',
          address: '',
          zip: ''
        },
        rules: {
          name: [{
            required: true, message: '请输入名称', trigger: 'blur'
          }],
          province: [{
            required: true, trigger: 'blur'
          }],
          city: [{
            required: true, trigger: 'blur'
          }],
          address: [{
            required: true, trigger: 'blur'
          }],
          zip: [{
            required: true, trigger: 'blur', type: 'string', validator: zipValidator
          }]
        },
        dialogFormVisible: false,
        dialogType: '',
        dialogTitle: '',
        pickerOptions: {
          shortcuts: [
            {
              text: '今天',
              onClick (picker) {
                picker.$emit('pick', new Date())
              }
            }, {
              text: '昨天',
              onClick (picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24)
                picker.$emit('pick', date)
              }
            }, {
              text: '一周前',
              onClick (picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', date)
              }
            }
          ]
        }
      }
    },
    computed: {
      ...mapState(['tableData'])
    },
    created () {
      this.getTableData('xxx')
      console.log('kaishi ')
    },
    methods: {
      ...mapActions(['getTableData', 'deleteData', 'editData', 'insertData']),
      editClick ($index, row) {
        this.dialogType = 'edit'
        this.dialogTitle = '编辑数据'
        this.formData = Object.assign({}, row)
        this.dialogFormVisible = true
      },
      insertClick () {
        this.dialogType = 'insert'
        this.dialogTitle = '添加数据'
        this.formData = {
          date: '',
          name: '',
          province: '',
          city: '',
          address: '',
          zip: ''
        }
        this.dialogFormVisible = true
      },
      cancelDialog () {
        this.dialogFormVisible = false
      },
      closeDialog () {
        this.$refs['formData'].validate((valid) => {
          if (!valid) return false
          if (this.dialogType === 'edit') {
            this.editData(this.formData)
          }
          if (this.dialogType === 'insert') {
            this.insertData(this.formData)
          }
          this.dialogFormVisible = false
        })
      },
      handleSizeChange (val) {
        this.page.size = val
        this.page.current = 1
        this.getTableData(this.page)
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.page.current = val
        this.getTableData(this.page)
        console.log(`当前页是: ${val}`)
      }
    }
  }
</script>

<style>
  .block {
    margin-top: 20px;
    margin-left: 30px;
    position: relative;
  }
</style>
