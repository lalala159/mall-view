<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-breadcrumb separator="/" class="crumbs">
                    <el-breadcrumb-item>
                        <router-link to="/main">首页</router-link>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                    <el-breadcrumb-item>字典管理</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-tree
                :data="splxList"
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
                  @click="() => edit(data)">
            修改
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
                title="更新"
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
                        <el-form-item label="字典名称:" :label-width="'100px'" prop="zdmc">
                            <el-input v-model="form.zdmc"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="字典CODE:" :label-width="'100px'" prop="zdCode">
                            <el-input v-model="form.zdCode" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="排序:" :label-width="'100px'" prop="sort">
                            <el-input v-model="form.sort" ></el-input>
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
        name: "sys_zd",
        methods: {
            getList() {
                let url = '/info/mallZidian/list';
                requestGET(url).then(data => {
                    this.splxList[0].children = data.data;
                });
            }, openContext(data){
                this.form.parentName = data.label;
                this.form.pId = data.id;
                this.dialogVisible = true;
            }, edit(data){
                this.form.zdmc = data.label;
                this.form.id = data.id;
                this.dialogVisible = true;
            },addPermission(form) {
                if(this.form.id==''){
                    this.$refs[form].validate((valid) => {
                        if (valid) {
                            let url = '/info/mallZidian/insert';
                            let params = this.form;
                            requestPost(url, params).then(data => {
                                if (data.code == 200) {
                                    Message.success('新增成功');
                                    this.resetProp();
                                    this.getList();
                                    this.dialogVisible = false;
                                }
                            });
                        }
                    })
                }else{
                    this.$refs[form].validate((valid) => {
                        if (valid) {
                            let url = '/info/sp/lx/edit';
                            let params = this.form;
                            requestPost(url, params).then(data => {
                                if (data.code == 200) {
                                    Message.success('修改成功');
                                    this.resetProp();
                                    this.getList();
                                    this.dialogVisible = false;
                                }
                            });
                        }
                    })
                }
            },
            resetProp(){
                this.form = {
                    parentName: '',
                    zdmc: '',
                    pId: '',
                    id : '',
                    sort:''
                };
                console.log(this.form)
            },
            remove(node, data) {
                if(data.children.length==0){
                    this.$confirm('确认删除？').then(_ => {
                        const val = {
                            url: '/info/sp/lx/delete',
                            params: {
                                id:data.id
                            }
                        }
                        getDelete(val).then(data => {
                            this.getList();
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
                splxList: [{
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
                    zdmc: '',
                    pId: '',
                    id : '',
                    sort:'',
                    zdCode:''
                },
                rules: {
                    zdmc: [{
                        required: true,
                        message: '字典名称不能为空',
                        trigger: 'blur'
                    }, {
                        max: 12,
                        message: '长度不得超过12',
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