<template>
    <div>
        <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
            <h3 class="login-title">欢迎登录</h3>
            <el-form-item label="账号" prop="username">
                <el-input type="text" placeholder="请输入账号" v-model="form.username"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
            </el-form-item>
            <section class="login-btn">
                <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
            </section>
        </el-form>
    </div>
</template>
<script>
    import {getToken, requestGET} from "../api/api";
    import {Message} from "element-ui";

    export default {
        name: "Login",
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                    scope: 'read',
                    client_id: 'gateway',
                    grant_type: 'password',
                    client_secret: '123456',
                },
                // 表单验证，需要在 el-form-item 元素中增加 prop 属性
                rules: {
                    username: [{
                        required: true,
                        message: '账号不可为空',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '密码不可为空',
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            onSubmit(formName) {
                // 为表单绑定验证功能
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        getToken(this.form).then(data => {
                            window.localStorage.setItem('access_token', data.access_token);
                            let url = '/auth/sys/permission/getUserInfo?userName=' + this.form.username;
                            requestGET(url).then(data => {
                                console.log(data);
                            });
                            this.$router.push('/main')
                        }, (error) => {
                            // Do something with response error
                            // 提示错误信息
                            Message.error('账号或密码错误');
                        });
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login-box {
        border: 1px solid #DCDFE6;
        width: 350px;
        margin: 180px auto;
        padding: 35px 35px 15px 35px;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        box-shadow: 0 0 25px #909399;
    }

    .login-title {
        text-align: center;
        margin: 0 auto 40px auto;
        color: #303133;
    }

    .login-btn {
        text-align: center;
        margin: 0 auto 10px auto;
    }
</style>
