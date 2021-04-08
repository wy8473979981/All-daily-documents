import Cookies from 'js-cookie'

// 读取本地数据
let userInfo = {};
const localDataStr = localStorage.getItem('global_user_info');
userInfo = localDataStr ? JSON.parse(localDataStr) : {};
// console.log(JSON.stringify(userInfo), 'userInfo')

const user = {
    state: {
        userInfo,
        todoApproval:0,
        token: Cookies.get('token'),
        roles: {},
        isLogin: userInfo.isLogin || false,              //是否已经登录
        hasGetMenu: false,           //是否已经请求菜单
        menuData: []                 //菜单数据
    },

    mutations: {
        setMenuData: (state, data) => {                //设置菜单
            state.hasGetMenu = true;

            state.menuData = data || [];
        },
        setUserInfo: (state, data) => {                //设置用户信息
            state.isLogin = data.isLogin;
            state.userInfo = data || {};
            // 存储用户信息
            localStorage.setItem('global_user_info', JSON.stringify(state.userInfo))
            // sessionStorage.setItem('global_user_info',JSON.stringify(state.userInfo))
            localStorage.setItem('userNo', data.userNo) //userNo
        },
        setTodoApproval: (state, data) => { // 设置代办条数
            state.todoApproval = data
        },
        setUserRole: (state, data) => {                //设置用户角色
            state.roles = data || {};
        },
        signOut: (state, data) => {                    //退出登录
            state.isLogin = false;
            state.userInfo = {};
            state.hasGetMenu = false;
            state.menuData = [];
            // 存储用户信息
            localStorage.removeItem('global_user_info');
            localStorage.removeItem('userNo');
        }
    },

    actions: {

    }
}

export default user
