<template>
    <div>
    <el-row :gutter="20">
        <el-col :span="24">
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
    <el-form ref="addForm" :model="form" :rules="rules">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-form-item label="账号:" :label-width="'100px'" prop="userName">
                    <el-input v-model="form.userName"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-form-item label="员工姓名:" :label-width="'100px'" prop="memberName">
                    <el-input v-model="form.memberName"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-form-item label="电话号码:" :label-width="'100px'" prop="mobile">
                    <el-input v-model="form.mobile"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-form-item label="性别:" :label-width="'100px'" prop="sex">
                    <el-select value="1" >
                        <el-option v-for="item in sex" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item label="所属门店:" :label-width="'100px'" prop="storeId">
                    <el-select v-model="form.storeId">
                        <el-option label="总部" value="1"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button type="primary" v-on:click="addUser('addForm')">确 定</el-button>
    </div>
    </div>
</template>

<script>
    import {addUser} from "~/api/api";
    import {Message} from "element-ui";

    export default {
        name: "user_edit",
        data() {
            return {
                dialogFormVisible: false,
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
        },
        methods: {
            addUser(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let url = '/auth/sys/user/addUser';
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