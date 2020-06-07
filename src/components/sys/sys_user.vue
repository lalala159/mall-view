<template>

    <div>
        <el-row :gutter="20">
            <el-col :span="24">
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item><router-link to="/sysUser">首页</router-link></el-breadcrumb-item>
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="1">
                <el-tag
                        type='info'
                        effect="dark">
                    用户名:
                </el-tag>
            </el-col>
            <el-col :span="3">
                <el-input
                        placeholder="请输入内容"
                        v-model="input"
                        clearable >
                </el-input>
            </el-col>
            <el-col :span="1">
            <el-button type="primary">查询</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px;">
            <el-col>
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%;height: 500px;">
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
                            label="电话号码"
                            width="180">
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
                        :page-sizes="[20, 50, 100]"
                        :page-size="20"
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
                pageSize: 20,
                pageNum: 1,
                currentPage: 1,
                input: ''
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
.el-row{
 margin-bottom: 10px;
}
</style>