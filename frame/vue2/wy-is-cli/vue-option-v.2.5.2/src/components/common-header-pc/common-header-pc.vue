<template>
    <div class="index-header">
        <header class="pc-dom clearfix">
            <a href="" class="logo-pc-dom pull-left">
            </a>
            <div class="menu-pc-dom pull-left">
                <ul class="sidebar-menu">
                    <menuListPc :item="item" v-for="(item) in menuList" :key="item.id"></menuListPc>
                </ul>
            </div>
        </header>
    </div>
</template>

<script>
import menuListPc from "@/components/menu-list-pc/menu-list-pc";
import menuData from "@/assets/json-mock/menu-data.json";
export default {
    name: "commonHeaderPc",
    props: {
        item: {}
    },
    data() {
        return {
            menuList: [] //type  0不可点击一级菜单   1可点击菜单   3可点击一级菜单（下级菜单也可点击）4菜单隐藏
        };
    },
    mounted: function() {
        this.menuList = menuData;
    },
    components: {
        menuListPc
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index-header {
    width: 100%;
    height: 80px;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    background-color: #fff;
}
.pc-dom {
    height: 100%;
    width: 1060px;
    margin: 0 auto;
}
.logo-pc-dom {
    display: inline-block;
    width: 148px;
    height: 64px;
    margin-top: 8px;
    background: url(../../assets/images/index/logo.png) no-repeat;
    background-size: contain;
}
.menu-pc-dom {
    display: inline-block;
    width: calc(100% - 148px);
    height: 100%;
}
.sidebar-menu {
    float: right;
    height: 100%;
    line-height: 78px;
    font-size: 12px;
}
</style>
