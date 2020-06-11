
<style scoped>
    .el-row {
        margin-bottom: 10px;
    }
    a {
        text-decoraction: none;
    }
    .router-link-active {
        text-decoration: none;
    }
</style>
<template>

    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-breadcrumb separator="/" class="crumbs">
                    <el-breadcrumb-item>
                        <router-link to="/main">首页</router-link>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>系统设置</el-breadcrumb-item>
                    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="4">
                <el-input
                        placeholder="员工名称"
                        v-model="memberName"
                        clearable>
                </el-input>
            </el-col>
            <el-col :span="1">
                <el-button type="primary" @click="loadDatas()">查询</el-button>
            </el-col>
            <el-col :span="1" style="float: right;margin-right: 2%">
                <router-link to="/addUser"><el-button type="success">新增</el-button></router-link>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px;">
            <el-col>
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%;height: 500px;">
                    <el-table-column
                            prop="userName"
                            label="账号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="memberName"
                            label="员工名称"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="sex"
                            label="性别"
                            width="180"
                            :formatter="getSexName">
                    </el-table-column>
                    <el-table-column
                            prop="mobile"
                            label="电话号码"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="storeName"
                            label="门店名称"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="400">
                        <template slot-scope="scope">
                            　　　　　　
                            <el-button type="text" @click="checkDetail(scope.row.id)">查看详情</el-button>
                            　　　　　　
                            <el-button type="info" @click="modifyUser(scope.row.id)">修改</el-button>
                            <el-button type="info" @click="deleteUser(scope.row.id)">分配权限</el-button>
                            　　　　　　
                            <el-button type="info" @click="deleteUser(scope.row.id)">删除</el-button>
                        </template>
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
    import {queryList, getDelete} from '~/api/api';
    export default {
        name: "sys_user",
        data() {
            return {
                tableData: [],
                total: 0,
                pageSize: 20,
                pageNum: 1,
                currentPage: 1,
                memberName: ''
            }
        },
        mounted() {
            this.loadDatas()
        },
        methods: {
            getSexName(row, column) {
                if (row.sex === 1) {
                    return '男'
                } else {
                    return '女'
                }
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.loadDatas();
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                this.loadDatas();
            },
            deleteUser(id){
                const val = {
                    url: '/auth/sys/user/deleteUser',
                    params: {
                        id:id
                    }
                }
                getDelete(val).then(data => {
                    this.loadDatas();
                    this.Message.success("删除成功");
                });
            },
            loadDatas() {
                let url = '/auth/sys/user/queryList';
                let params = {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    memberName: this.memberName,
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
