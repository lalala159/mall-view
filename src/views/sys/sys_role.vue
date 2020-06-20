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
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
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
            <el-col :span="1" style="float: right;margin-right: 3%">
                <router-link to="/addRole">
                    <el-button type="success">新增</el-button>
                </router-link>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px;">
            <el-col>
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%;height: 500px;">
                    <el-table-column
                            prop="roleCode"
                            label="角色编码"
                            width="180">
                    </el-table-column>
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
                            <el-button type="info" @click="addMenu(scope.row.id)">分配权限</el-button>
                            <el-button type="info" @click="deleteRole(scope.row.id)">删除</el-button>
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

        <el-dialog
                title="权限菜单"
                :visible.sync="dialogVisible"
                width="20%">
            <el-tree
                    :data="menuList"
                    show-checkbox
                    node-key="id"
                    default-expand-all
                    :default-checked-keys="checkMenu"
                    ref="tree"
                    highlight-current
                    :expand-on-click-node="false">
            </el-tree>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="getCheckedKeys()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {requestGET, getDelete, requestPost} from '~/api/api';
    import {Message} from "element-ui";
    export default {
        name: "sys_role",
        data() {
            return {
                tableData: [],
                total: 0,
                pageSize: 20,
                pageNum: 1,
                currentPage: 1,
                memberName: '',
                dialogVisible: false,
                menuList: [],
                checkMenu:[],
                roleId:0
            }
        },
        mounted() {
            this.loadDatas()
        },
        methods: {
            getValids(row, column) {
                if (row.valid) {
                    return '有效';
                } else {
                    return '无效';
                }
            },
            getCheckedKeys() {
                let url = '/auth/sys/role/addMenu';
                let params =  {
                        menuIds: this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()).join(','),
                        roleId: this.roleId
                    }
                requestPost(url, params).then(data => {
                    if(data.code == 200){
                        Message.success(data.message);
                    }else{
                        Message.error(data.message);
                    }
                });
                console.log();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.loadDatas();
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                this.loadDatas();
            },
            addMenu(id) {
                this.checkMenu = [];
                this.roleId = id;
                let username = localStorage.getItem('username');
                let url = '/auth/sys/permission/getMenu?userName=' + username;
                requestGET(url).then(data => {
                    this.menuList = data.data;
                    let urlC = '/auth/sys/role/getPermissioned?roleId=' + this.roleId;
                    requestGET(urlC).then(data => {
                        this.checkMenu = data.data;
                        console.log(this.checkMenu);
                    });
                });
                this.dialogVisible = true;
            },
            deleteRole(id) {
                this.$confirm('确认删除？').then(_ => {
                    const val = {
                        url: '/auth/sys/role/deleteRole',
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
                let url = '/auth/sys/role/queryList?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize;
                requestGET(url).then(data => {
                    this.tableData = data.list;
                    this.total = data.total;
                    this.currentPage = this.pageNum;
                });
            }
        }
    }
</script>
