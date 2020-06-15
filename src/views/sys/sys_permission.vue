<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-breadcrumb separator="/" class="crumbs">
                    <el-breadcrumb-item>
                        <router-link to="/main">首页</router-link>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>系统设置</el-breadcrumb-item>
                    <el-breadcrumb-item>资源管理</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-tree
                :data="menuList"
                node-key="id"
                default-expand-all
                :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
                  type="text"
                  size="mini"
                  @click="() => openContext(data)">
            新增下级目录
          </el-button>
          <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
        </el-tree>
        <el-dialog
                title="新增"
                :visible.sync="dialogVisible"
                width="40%">
            <el-form ref="addForm" :model="form" :rules="rules">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="上级菜单:" :label-width="'100px'" prop="parentName">
                            <el-input v-model="form.parentName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="菜单名称:" :label-width="'100px'" prop="permissionName">
                            <el-input v-model="form.permissionName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="前端路由:" :label-width="'100px'" prop="url">
                            <el-input v-model="form.url"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="前端页面地址:" :label-width="'100px'" prop="component">
                            <el-input v-model="form.component"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="图标样式:" :label-width="'100px'" prop="图标">
                            <el-input v-model="form.icon"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="排序:" :label-width="'100px'" prop="ranks">
                            <el-input v-model="form.ranks"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" v-on:click="addPermission('addForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {requestGET, requestPost, getDelete} from "~/api/api";
    import {Message} from "element-ui";
    let id = 1000;
    export default {
        name: "sys_permission",
        methods: {
            getList() {
                let username = localStorage.getItem('username');
                let url = '/auth/sys/permission/getMenu?userName=' + username;
                requestGET(url).then(data => {
                    this.menuList[0].children = data.data;
                });
            }, openContext(data){
                this.form.parentName = data.label;
                this.form.parentId = data.id;
                this.dialogVisible = true;
            },addPermission(form) {
                this.$refs[form].validate((valid) => {
                        if (valid) {
                            let url = '/auth/sys/permission/addMenu';
                            let params = this.form;
                            requestPost(url, params).then(data => {
                                if (data.code == 200) {
                                    Message.success('新增成功');
                                    this.getList();
                                    let username = localStorage.getItem('username');
                                    let url = '/auth/sys/permission/getMenuList?userName=' + username;
                                    requestGET(url).then(data => {
                                        localStorage.removeItem('menu');
                                        localStorage.setItem('menu', JSON.stringify(data.data));
                                    });
                                    this.dialogVisible = false;
                                }
                            });
                        }
                })
            },
            remove(node, data) {
                if(data.children.length==0){
                    this.$confirm('确认删除？').then(_ => {
                    const val = {
                        url: '/auth/sys/permission/deleteMenu',
                        params: {
                            id:data.id
                        }
                    }
                    getDelete(val).then(data => {
                        this.getList();
                        let username = localStorage.getItem('username');
                        let url = '/auth/sys/permission/getMenuList?userName=' + username;
                        requestGET(url).then(data => {
                            localStorage.removeItem('menu');
                            localStorage.setItem('menu', JSON.stringify(data.data));
                        });
                        Message.success("删除成功");
                    });
                    });
                }else{
                    Message.error("请先清空下级目录");
                }
            }
        },
        mounted() {
            this.getList()
        },
        data() {
            return {
                menuList: [{
                    id:0,
                    label:'DOPAMINE',
                    children:[]
                }],
                dialogVisible: false,
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                form: {
                    parentName: '',
                    permissionName: '',
                    url: '',
                    icon: '',
                    ranks: '',
                    component: '',
                    parentId: ''
                },
                rules: {
                    permissionName: [{
                        required: true,
                        message: '菜单名称不能为空',
                        trigger: 'blur'
                    }, {
                        max: 12,
                        message: '账号长度不得超过12',
                        trigger: 'blur'
                    }],
                    ranks: [{
                        required: true,
                        message: '排序不能为空',
                        trigger: 'blur'
                    }]
                }
            };
        }
    }
</script>

<style scoped>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
    .el-row {
        margin-bottom: 10px;
    }
</style>