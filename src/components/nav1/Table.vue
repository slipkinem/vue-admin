<template>
    <section>
        <template>
            <el-table
                    :data="tableData.data"
                    border
                    algin="center"
                    style="width: 100%">
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
                <el-button @click="handleClick($index, row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
                <el-button @click="deleteClick($index, row)" type="text" size="small">删除</el-button>
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
    </section>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      page: {
        current: 1,
        size: 10
      }
    }
  },
  computed: {
    ...mapState(['tableData'])
  },
  created () {
    this.getTableData(this.page)
  },
  methods: {
    ...mapActions(['getTableData']),
    handleClick ($index, row) {
      console.log($index, row)
    },
    deleteClick ($index, row) {
      this.tableData.splice($index, 1)
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