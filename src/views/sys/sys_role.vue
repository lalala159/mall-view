
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
                    <el-breadcrumb-item>角色管理</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="20">
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
                            prop="roleName"
                            label="角色名称"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="valid"
                            label="是否有效"
                            width="180"
                            :formatter="getValids">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="300">
                        <template slot-scope="scope">
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
    import {requestGET, getDelete} from '~/api/api';
    export default {
        name: "sys_role",
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
            getValids(row, column) {
                if (row.valid) {
                    return '有效';
                } else{
                    return '无效';
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
                this.$confirm('确认删除？').then(_ => {
                    const val = {
                        url: '/auth/sys/user/deleteUser',
                        params: {
                            id: id
                        }
                    }
                    getDelete(val).then(data => {
                        this.loadDatas();
                        this.Message.success("删除成功");
                    });
                });
            },
            loadDatas() {
                let url = '/auth/sys/role/queryList?pageNum='+this.pageNum+'&pageSize='+this.pageSize;
                requestGET(url).then(data => {
                    this.tableData = data.list;
                    this.total = data.total;
                    this.currentPage = this.pageNum;
                });
            }
        }
    }
</script>
