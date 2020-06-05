<template>
    <el-row class="tac">
        <el-col :span="24">
            <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#53a8ff"
                    text-color="#303133"
                    active-text-color="#fff">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span>系统管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">用户管理</el-menu-item>
                        <el-menu-item index="1-2">角色管理</el-menu-item>
                        <el-menu-item index="1-3">资源管理</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-col>
    </el-row>
</template>
<script>
    export default {
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
<style>

</style>