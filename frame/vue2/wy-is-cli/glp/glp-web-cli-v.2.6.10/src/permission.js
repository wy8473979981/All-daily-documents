import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import commonApi from '@/api/common'


NProgress.configure({ showSpinner: false })
const whiteList = ['/login', '/system/404','/system/403','/system/500','/testicon/index']

// 系统appId
const appId=process.env.APP_ID;
const pathReg=/\/\?ticket=.+$/i;
// 筛选菜单
const filterRouterFunc=(data,path) => {
    let isExist=false;

    let fn=(data,path) => {
        let index=data.findIndex(item => {
            return (item.pageUrl && item.pageUrl==path)
        });
        if(index!=-1){
            isExist=true;
        }else {
            data.forEach(item => {
                if(item.children){
                    fn(item.children,path)
                }
            })
        }
    }

    if(data){
        fn(data,path);
    }
    return isExist;
};

// 筛选可用路由-----------------通过level来定位路由级别，除1级路由，必须加level字段
const filterMenuData=(data) => {
    let url='';
    let fn=(data) => {
        for(let i=0,len=data.length;i<len;i++){
            if(i==0){
                if(!data[i].level || data[i].level==1){
                    // 1级菜单
                    if(data[i].children && data[i].children.length>0){
                        fn(data[i].children);
                        break;
                    }else {
                        if(data[i].pageUrl){
                            url=data[i].pageUrl;
                            break;
                        }
                    }
                }else{
                    if(data[i].pageUrl){
                        url=data[i].pageUrl;
                        break;
                    }
                }
            }
        }
    }
    if(data){
        fn(data);
    }

    return url;
};


// 获取用户菜单
const getMenuList=(to,from,next) => {
    // 获取用户菜单
    commonApi.getPermList().then(
        res => {
            if(res.code==401){
                let backUrl = location.protocol+'//'+location.host;
                store.commit('signOut',{});
                window.location.href = res.data+'?appId=' +appId +'&backUrl=' +backUrl
            }else if(res.code==200){
                let ndata = res.data || {};
                let {roles,perms}=ndata;
                // 首页重定向到默认待办地址
                // if((to.redirectedFrom=='/' || pathReg.test(to.redirectedFrom)) && to.path=='/permission/toList'){
                
                if(filterRouterFunc(perms,to.path)){
                    store.commit('setUserRole', roles?roles[0]:{});
                    store.commit('setMenuData',perms);
                    next();
                }else{
                    if((to.redirectedFrom=='/' || pathReg.test(to.redirectedFrom))){
                        let pageUrl=filterMenuData(perms);
                        if(pageUrl){
                            store.commit('setUserRole', roles?roles[0]:{});
                            store.commit('setMenuData',perms);
                            next(pageUrl);
                        }else {
                            next('/system/404')
                        }
                    }else{
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
let x=1;
router.beforeEach((to, from, next) => {
    NProgress.start();
    
    if(x===1){
        // 全部白名单
        next();
        // 获取用户信息
        commonApi.getUserInfoBusiness().then(
            res => {
                if (res.code == 401) {
                    let backUrl = location.protocol + '//' + location.host;
                    // debugger;
                    store.commit('signOut', {});
                    // console.log(backUrl)
                    // debugger;
                    window.location.href = res.data + '?appId=' + appId + '&backUrl=' + backUrl

                } else if (res.code == 200) {
                    // 存储用户信息
                    let ndata = res.data || {};
                    ndata.isLogin = true;
                    store.commit('setUserInfo', ndata);

                }
            },
            err => {
                next('/system/500')
            }
        )
    }else{
        if(whiteList.indexOf(to.path) !== -1) {
            next()
        }else{
            let user=store.state.user || {};
            if(user.isLogin==true){
                if(user.hasGetMenu==true){

                    if(filterRouterFunc(user.menuData,to.path)){
                        next();
                    }else{
                        let pageUrl=filterMenuData(user.menuData) || '/system/404';
                        next(pageUrl);
                    }

                }else{
                    
                    getMenuList(to,from,next);
                }
            }else {
                // 获取用户信息
                commonApi.getUserInfoBusiness().then(
                    res => {
                        if(res.code==401){
                            let backUrl = location.protocol+'//'+location.host;
                            // debugger;
                            store.commit('signOut',{});
                            window.location.href = res.data+'?appId=' +appId +'&backUrl=' +backUrl
                            
                        }else if(res.code==200){
                            // 存储用户信息
                            let ndata = res.data || {};
                            ndata.isLogin=true;
                            store.commit('setUserInfo',ndata);

                            getMenuList(to,from,next);
                        }
                    },
                    err => {
                        next('/system/500')
                    }
                )


                
            }
        }
    } 

    NProgress.done()
})

router.afterEach(() => {
  NProgress.done()
})
