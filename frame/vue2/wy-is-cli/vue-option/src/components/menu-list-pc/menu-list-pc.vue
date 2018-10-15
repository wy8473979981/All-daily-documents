<template>
    <li>
        <router-link v-if="item.type === 0" to="javascript:;">{{item.name}}</router-link>

        <ul v-if="item.type === 0||item.type === 3" class="treeview-menu-show">
            <menuListPc :item="item" v-for="item in item.list" :key="item.id"></menuListPc>
        </ul>

        <router-link v-if="item.type === 1 && item.parentId === 0" :to="item.url">{{item.name}}</router-link>

        <router-link v-if="item.type === 1 && item.parentId != 0" :to="item.url">{{item.name}}</router-link>
        <router-link v-if="item.type === 3" :to="item.url">{{item.name}}</router-link>
        <router-link v-if="item.type === 4" :to="item.url">{{item.name}}</router-link>
    </li>
</template>

<script>
export default {
    name: "menuListPc",
    props: {
        item: {}
    },
    data() {
        return {
            msg: "Welcome to Your Vue.js App"
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul > li.show > .treeview-menu-show {
    display: none;
}
.sidebar-menu > li:hover .treeview-menu-show {
    display: block;
}
.sidebar-menu > li {
    position: relative;
    margin: 0;
    padding: 0;
    float: left;
}
.sidebar-menu > li a {
    display: block;
    border: none !important;
    padding: 0 15px;
    color: #312d2c;
    text-decoration: none;
}
.show {
    display: block !important;
}
.sidebar-menu > li:hover {
    border-bottom: 2px solid #db3c17;
}
.sidebar-menu > li:hover > a,
.sidebar-menu > li.active > a {
    color: #b53437;
    background: #fff;
}
.sidebar-menu li .treeview-menu-show {
    position: absolute;
    z-index: 99;
    width: 220px;
    display: none;
    padding: 20px 0;
    background: #fff;
    box-shadow: 0 1px 10px #bcb9b9;
    left: -68px;
    top: 80px;
}
.sidebar-menu .treeview-menu-show li {
    line-height: 30px;
}
.sidebar-menu li .treeview-menu-show li a {
    padding: 0;
    line-height: 30px;
    text-align: center;
    color: #000;
    display: inline-block;
    width: 100%;
    height: 100%;
}
.sidebar-menu li .treeview-menu-show li a:hover,
.sidebar-menu .treeview-menu-show li.active a {
    color: #db3c17;
}
.sidebar-menu > li > a.router-link-exact-active {
    border-bottom: 2px solid #db3c17 !important;
    color: #db3c17;
}
.sidebar-menu li .treeview-menu-show > li > a.router-link-exact-active {
    color: #db3c17;
}
</style>
