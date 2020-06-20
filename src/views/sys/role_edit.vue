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
                        <router-link to="/sysRole">角色管理</router-link>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>新增</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-form ref="addForm" :model="form" :rules="rules">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="角色编码:" :label-width="'100px'" prop="roleCode">
                        <el-input v-model="form.roleCode"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="角色名称:" :label-width="'100px'" prop="roleName">
                        <el-input v-model="form.roleName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" v-on:click="addRole('addForm')">确 定</el-button>
        </div>
    </div>
</template>

<script>
    import {addUser, requestPost} from "~/api/api";
    import {Message} from "element-ui";

    export default {
        name: "role_edit",
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    roleCode: '',
                    roleName: ''
                },
                rules: {
                    roleCode: [{
                        required: true,
                        message: '角色编码不能为空',
                        trigger: 'blur'
                    }, {
                        min: 2,
                        max: 6,
                        message: '编码长度在2到6',
                        trigger: 'blur'
                    }],
                    roleName: [{
                        required: true,
                        message: '角色名称不能为空',
                        trigger: 'blur'
                    }]
                }
            }
        },
        mounted() {
        },
        methods: {
            addRole(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let url = '/auth/sys/role/addRole';
                        let params = {
                            roleCode: 'ROLE_' + this.form.roleCode,
                            roleName: this.form.roleName
                        };
                        requestPost(url, params).then(data => {
                            if (data.code == 200) {
                                Message.success('新增成功');
                            }
                            if (data.code == 888) {
                                Message.error('该账号已存在');
                            }

                        });

                    }
                })
            }
        }
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 10px;
    }
</style>