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
                <el-button type="success" @click="dialogFormVisible = true">新增</el-button>
            </el-col>
        </el-row>
        <el-dialog title="新增" :visible.sync="dialogFormVisible">
            <el-form ref="addForm" :model="form" :rules="rules">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="账号" :label-width="'80px'" prop="userName">
                            <el-input v-model="form.userName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="员工姓名" :label-width="'80px'" prop="memberName">
                            <el-input v-model="form.memberName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="电话号码" :label-width="'80px'" prop="mobile">
                            <el-input v-model="form.mobile"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="性别" :label-width="'80px'" prop="sex">
                            <el-select v-model="form.sex">
                                <el-option label="男" value="1"></el-option>
                                <el-option label="女" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="所属门店" :label-width="'80px'" prop="storeId">
                            <el-select v-model="form.storeId">
                                <el-option label="总部" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" v-on:click="addUser('addForm')">确 定</el-button>
            </div>
        </el-dialog>
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
                memberName: '',
                dialogFormVisible: false,
                form: {
                    userName: '',
                    memberName: '',
                    mobile: '',
                    storeId: '',
                    sex: ''
                },
                rules: {
                    userName: [{
                        required: true,
                        message: '账号不可为空',
                        trigger: 'blur'
                    }, {
                        min: 3,
                        max: 12,
                        message: '账号长度在3到12',
                        trigger: 'blur'
                    }],
                    memberName: [{
                        required: true,
                        message: '员工姓名不能为空',
                        trigger: 'blur'
                    }],
                    mobile: [{
                        required: true,
                        message: '电话号码不能为空',
                        trigger: 'blur'
                    },
                        {
                            validator: this.checkPhone,
                            trigger: 'change'
                        }
                    ], storeId: [{
                        required: true,
                        message: '请选择门店',
                        trigger: 'blur'
                    }]
                }
            }
        },
        mounted() {
            this.loadDatas()
        },
        methods: {
            checkPhone(rule, value, callback) {
                if (!(/^1[34578]\d{9}$/.test(value))) {
                    callback(new Error('请输入正确的手机号码!'));
                }
            },
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
            addUser(form) {
                this.$refs[form].validate((valid) => {
                    console.log(this.form);
                    this.dialogFormVisible = false
                })
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

<style scoped>
    .el-row {
        margin-bottom: 10px;
    }
</style>