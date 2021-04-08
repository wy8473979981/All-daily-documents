import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import commonApi from '@/api/common'


NProgress.configure({ showSpinner: false })
const whiteList = ['/login', '/system/404', '/system/403', '/system/500', '/testicon/index', '/customize/questionnaire']

// 系统appId
const appId = process.env.APP_ID;
const pathReg = /\/\?ticket=.+$/i;
// 筛选菜单
const filterRouterFunc = (data, path) => {
    let isExist = false;
    let fn = (data, path) => {
        let index = data.findIndex(item => {
            return (item.pageUrl && item.pageUrl == path)
        });
        if (index != -1) {
            isExist = true;
        } else {
            for (let i = 0, len = data.length; i < len; i++) {
                if (isExist == true) { break; }
                let item = data[i];
                if (item.children) {
                    fn(item.children, path)
                }
            }
        }
    }
    if (data) {
        fn(data, path);
    }
    return isExist;
};

// 筛选可用路由
const filterMenuData = (data) => {
    let url = '';
    let fn = (data) => {
        for (let i = 0, len = data.length; i < len; i++) {
            if (i == 0) {
                if (!data[i].level || data[i].level == 1) {
                    // 1级菜单
                    if (data[i].children && data[i].children.length > 0) {
                        fn(data[i].children);
                        break;
                    } else {
                        if (data[i].pageUrl) {
                            url = data[i].pageUrl;
                            break;
                        }
                    }
                } else {
                    if (data[i].pageUrl) {
                        url = data[i].pageUrl;
                        break;
                    }
                }
            }
        }
    }
    if (data) {
        fn(data);
    }
    return url;
};


// 筛选可用路由-默认路由没有时，从权限菜单中获取第一个可用路径
const filterMenuData2 = (data) => {
    let url = '';
    let fn = (data) => {
        for (let i = 0, len = data.length; i < len; i++) {
            if (data[i].code != "CRM_DATA_PERM") {
                if (data[i].code != "MORE") {
                    url = data[i].pageUrl;
                    break;
                } else {
                    fn(data[i].children);
                }
            }
        }
    };
    if (data) {
        fn(data);
    }
    return url;
}

// 获取用户菜单
const getMenuList = (to, from, next) => {
    // 获取用户菜单
    commonApi.getPermList().then(
        res => {
            if (res.code == 401) {
                let backUrl = location.protocol + '//' + location.host;
                store.commit('signOut', {});
                window.location.href = res.data + '?appId=' + appId + '&backUrl=' + backUrl
            } else if (res.code == 200) {
                let ndata = res.data || {};
                let { roles, perms } = ndata;
                let btnAry = getBtn(perms);
                localStorage.setItem('btnAuthority', JSON.stringify(btnAry))
                if ((to.redirectedFrom == '/' || pathReg.test(to.redirectedFrom)) && to.path == '/market/index') {
                    if (filterRouterFunc(perms, to.path)) {
                        // 当权限菜单中存在默认路由
                        store.commit('setUserRole', roles ? roles : []);
                        store.commit('setMenuData', perms);
                        // console.log(to.path, '5')
                        next();
                    } else {
                        // 当权限菜单中不存在默认路由，从权限菜单中获取第一个可以使用的路由，当做默认页面
                        let pageUrl = filterMenuData2(perms);
                        if (pageUrl) {
                            store.commit('setUserRole', roles ? roles : []);
                            store.commit('setMenuData', perms);
                            next(pageUrl);
                            // console.log(pageUrl, '6')
                        } else {
                            next('/system/404')
                        }
                    }
                } else {
                    if (filterRouterFunc(perms, to.path)) {
                        // 刷新当前页，走这里，判断当前页的路由在权限菜单路由中是否有
                        store.commit('setUserRole', roles ? roles : []);
                        store.commit('setMenuData', perms);
                        // console.log(to.path, '7')
                        next();
                    } else {
                        next('/system/404')
                    }
                }
            }

        },
        err => {
            next('/system/500')
        }
    )
}

const getBtn = (data) => {
    let btnAry = [];
    let moreBtnAry = [];
    data && data.map((item, index) => {
        if (item.code == "MORE") {
            moreBtnAry = getBtn(item.children);
        } else {
            item.children && item.children.map((childrenItem) => {
                let obj = {};
                obj["code"] = childrenItem.code;
                obj["description"] = childrenItem.description;
                btnAry.push(obj);
            })
        }
    })
    return btnAry.concat(moreBtnAry);
}

router.beforeEach((to, from, next) => {
    NProgress.start();

    if (whiteList.indexOf(to.path) !== -1) {
        next()
    } else {
        if (store.state.user.isLogin == true) {
            commonApi.getAllDict().then(res => {
                if (res.code == 200) {
                    let { data } = res;
                    let dict_assemble = {};
                    Object.entries(data).forEach((k, v) => {
                        let obj = {};
                        obj[k[0]] = k[1].values;
                        Object.assign(dict_assemble, obj);
                    });
                    localStorage.setItem('dict_assemble', JSON.stringify(dict_assemble))
                }
            })
            commonApi.getTodoNum().then(res => {
                if (res.code == 200) {
                    let { data } = res;
                    store.commit('setTodoApproval', data);
                }
            })
            
            if (store.state.user.hasGetMenu == true) {
                // 鼠标点击菜单
                if (filterRouterFunc(store.state.user.menuData, to.path)) {
                    // console.log(to.path, '3')
                    next();
                } else {
                    next('/system/404')
                }
            } else {
                getMenuList(to, from, next);
            }
        } else {
            // 获取用户信息
            localStorage.removeItem('userNo');
            commonApi.getUserInfoBusiness().then(
                res => {
                    if (res.code == 401) {
                        let backUrl = location.protocol + '//' + location.host;
                        store.commit('signOut', {});
                        window.location.href = res.data + '?appId=' + appId + '&backUrl=' + backUrl
                    } else if (res.code == 200) {
                        if (res.data.email == "glp_admin@glprop.com" || res.data.type == "01") {
                            sessionStorage.setItem("isShowEditPwd", 1)
                        } else {
                            sessionStorage.setItem("isShowEditPwd", 2)
                        }
                        commonApi.getAllDict().then(res => {
                            if (res.code == 200) {
                                let { data } = res;
                                let dict_assemble = {};
                                Object.entries(data).forEach((k, v) => {
                                    let obj = {};
                                    obj[k[0]] = k[1].values;
                                    Object.assign(dict_assemble, obj);
                                });
                                localStorage.setItem('dict_assemble', JSON.stringify(dict_assemble))
                            }
                        })
                        commonApi.getTodoNum().then(res => {
                            if (res.code == 200) {
                                let { data } = res;
                                store.commit('setTodoApproval', data);
                            }
                        })
                        // 存储用户信息
                        let ndata = res.data || {};
                        ndata.isLogin = true;
                        store.commit('setUserInfo', ndata);
                        getMenuList(to, from, next);
                    }
                },
                err => {
                    next('/system/500')
                }
            )
        }
    }
    NProgress.done()
})
