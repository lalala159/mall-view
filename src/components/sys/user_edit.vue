<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-breadcrumb separator="/" class="crumbs">
                    <el-breadcrumb-item>
                        <router-link to="/main">首页</router-link>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>系统设置</el-breadcrumb-item>
                    <el-breadcrumb-item>
                        <router-link to="/sysUser">用户管理</router-link>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>新增</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="24">
            <el-col :span="10">
                <el-form ref="addForm" :model="form" :rules="rules">
                    <el-row :gutter="20">
                        <el-col :span="18">
                            <el-form-item label="账号:" :label-width="'100px'" prop="userName">
                                <el-input v-model="form.userName"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="18">
                            <el-form-item label="员工姓名:" :label-width="'100px'" prop="memberName">
                                <el-input v-model="form.memberName"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="18">
                            <el-form-item label="电话号码:" :label-width="'100px'" prop="mobile">
                                <el-input v-model="form.mobile"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="18">
                            <el-form-item label="性别:" :label-width="'100px'" prop="sex">
                                <el-select v-model="form.sex">
                                    <el-option v-for="item in sex" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="18">
                            <el-form-item label="所属门店:" :label-width="'100px'" prop="storeId">
                                <el-select v-model="form.storeId">
                                    <el-option label="总部" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="18">
                            <el-form-item label="角色:" :label-width="'100px'" prop="roleId">
                                <el-checkbox-group v-model="form.roleId"  @change="checkItem">
                                    <el-checkbox v-for="role in roles" :label="role.id" :key="role.id">
                                        {{role.roleName}}
                                    </el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
            <el-col :span="14">
                <el-row v-for="menu in menus">
                    <el-col :span="4">
                        <span style="float: left">{{menu.title}}:</span>
                    </el-col>
                    <el-col :span="20">
                        <el-checkbox-group v-model="checkedMenus">
                            <el-checkbox v-for="child in menu.children" :label="child.id" :key="child.id" disabled>
                                {{child.title}}
                            </el-checkbox>
                        </el-checkbox-group>
                        <el-divider></el-divider>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" v-on:click="addUser('addForm')">确 定</el-button>
        </div>
    </div>
</template>

<script>
    import {addUser, requestGET} from "~/api/api";
    import {Message} from "element-ui";

    export default {
        name: "user_edit",
        data() {
            return {
                dialogFormVisible: false,
                roles: [],
                menus: [],
                checkedMenus: [],
                sex: [{
                    value: '1',
                    label: '男'
                }, {
                    value: '2',
                    label: '女'
                }],
                form: {
                    userName: '',
                    memberName: '',
                    mobile: '',
                    storeId: '',
                    sex: '',
                    roleId:[]
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
                        trigger: 'blur',
                        validator: this.checkPhone
                    }],
                    storeId: [{
                        required: true,
                        message: '请选择门店',
                        trigger: 'blur'
                    }]
                }
            }
        },
        mounted() {
            this.loadRole();
            this.loadMenu();
        },
        methods: {
            loadRole() {
                let username = localStorage.getItem('username');
                let url = '/auth/sys/role/getRole?userName=' + username;
                requestGET(url).then(data => {
                    this.roles = data.data;
                })
            },
            checkItem(value){
                let roleIds = value.join(',');
                let url = '/auth/sys/role/getPermissionIds?roleIds=' + roleIds;
                requestGET(url).then(data => {
                    this.checkedMenus = data.data;
                })
            },
            loadMenu() {
                let username = localStorage.getItem('username');
                let url = '/auth/sys/permission/getMenuList?userName=' + username;
                requestGET(url).then(data => {
                    this.menus = data.data;
                })
            },
            addUser(form) {
                console.log(this.form);
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let url = '/auth/sys/user/addUser';
                        this.form.roleIds = this.form.roleId.join(',');
                        let params = this.form;
                        const val = {
                            url: url,
                            params: params
                        }
                        addUser(val).then(data => {
                            if (data.code == 200) {
                                Message.success('新增成功');
                            }
                            if (data.code == 888) {
                                Message.error('该账号已存在');
                            }

                        });

                    }
                })
            }, checkPhone(rule, value, callback) {
                if (!(/^1[34578]\d{9}$/.test(value))) {
                    callback(new Error('请输入正确的手机号码!'));
                } else {
                    callback();
                }
            }
        }
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 10px;
    }
</style>