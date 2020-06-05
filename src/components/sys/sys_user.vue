<template>
    <div>
        <el-row :gutter="20">
            <el-col>
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="memberName"
                            label="用户名称"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="sex"
                            label="性别"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="mobile"
                            label="电话号码">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="6" :offset="18">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="this.currentPage"
                        layout="sizes, prev, pager, next, total"
                        :page-sizes="[1, 50, 100]"
                        :page-size="1"
                        :total=this.total>
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {queryList} from '~/api/api';

    export default {
        name: "sys_user",
        data() {
            return {
                tableData: [],
                total: 0,
                pageSize: 1,
                pageNum: 1,
                currentPage: 1
            }
        },
        mounted() {
            this.loadDatas()
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val;
                this.loadDatas();
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                this.loadDatas();
            },
            loadDatas() {
                let url = '/auth/sys/user/queryList';
                let params = {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    memberName: '',
                    mobile: ''
                }
                const val = {
                    url: url,
                    params: params
                }
                queryList(val).then(data => {
                    this.tableData = data.list;
                    this.total = data.total;
                    this.currentPage = this.pageNum;
                });
            }
        }
    }
</script>

<style scoped>

</style>