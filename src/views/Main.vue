<style scoped>
    router-link {
        text-decoraction: none;
    }

    .router-link-active {
        text-decoration: none;
    }
</style>
<template>
    <div>
        <el-container class="main">
            <el-aside :width="tabWidth+'px'">
                <div>
                    <div class="isClossTab" @click="isClossTabFun">
                        <i :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></i>
                    </div>
                    <el-menu :class="'menu'"
                             default-active="1-4-1"
                             class="el-menu-vertical-demo"
                             @open="handleOpen"
                             @close="handleClose"
                             :collapse="isCollapse"
                             background-color="#545c64"
                             text-color="#fff"
                             active-text-color="#ffd04b"
                    >
                        <el-submenu :index="item.key" v-for="(item,index) in menuList">
                            <template slot="title">
                                <i :class="item.icon"></i>
                                <span slot="title">{{item.title}}</span>
                            </template>
                            <el-menu-item-group>
                                <router-link tag="li" v-for="child in item.children" :to="child.path">
                                    <el-menu-item :index="child.key" v-if="!child.hidden">{{child.title}}</el-menu-item>
                                </router-link>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </div>
            </el-aside>
            <el-container>
                <el-header class="main-header">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <img src="../assets/photo/hid.jpg"/>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-header>
                <el-main>
                    <div>
                        <router-view></router-view>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style>
    * {
        padding: 0;
        margin: 0;
    }

</style>
<style scoped lang="scss">
    $header-height: 60px;
    $background-color: #545c64;
    $color: #FFF;

    .main {
        height: 100vh;
        min-width: 800px;
        min-height: 600px;
        overflow: hidden;

        aside {
            overflow: visible;
            height: 100%;
            background-color: $background-color;
            color: $color;

            .isClossTab {
                width: 100%;
                height: $header-height;
                cursor: pointer;
                font-size: 25px;
                text-align: center;
                line-height: $header-height;
                font-weight: bold;
                border-right: 1px solid #807c7c;
                box-sizing: border-box;
            }

            .menu {
                width: 100%;
                border-right: 0;


            }

        }

        .main-header {
            background-color: $background-color;
            color: $color;

            .el-dropdown {
                cursor: pointer;
                float: right;
            }

            .el-dropdown-link {

                img {
                    $imgMargin: (($header-height - 50)/2);
                    display: inline-block;
                    width: 50px;
                    height: 50px;
                    border-radius: 25px;
                    background-color: #FFF;
                    margin-top: $imgMargin;
                }
            }
        }

        .crumbs {
            margin-bottom: 20px;
        }

        .main-footer {
            text-align: center;
            background-color: $background-color;
            color: $color;
            line-height: 50px;
        }

    }

</style>

<script>
    import {requestGET} from "../api/api";
    export default {
        data() {
            return {
                isCollapse: false,
                tabWidth: 200,
                test1: 1,
                intelval: null,
                menuList: [],


            };
        },
        mounted() {
            this.getMenuTree()
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            getMenuTree() {
                let username = localStorage.getItem('username');
                let menu = JSON.parse(localStorage.getItem('menu'));
                if (menu) {
                    console.log(menu);
                    this.menuList = menu;
                } else {
                    let url = '/auth/sys/permission/getMenuList?userName=' + username;
                    requestGET(url).then(data => {
                        localStorage.setItem('menu', JSON.stringify(data.data));
                        this.menuList = data.data;
                    });
                }
            },
            isClossTabFun() {
                clearInterval(this.intelval);
                if (!this.isCollapse) {
                    this.intelval = setInterval(() => {
                        if (this.tabWidth <= 64)
                            clearInterval(this.intelval);
                        this.tabWidth -= 1;
                    }, 1);
                } else {
                    this.tabWidth = 200;
                }
                this.isCollapse = !this.isCollapse;
            }
        }
    }
</script>
