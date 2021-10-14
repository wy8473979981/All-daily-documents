import Page1 from '../components/Page1'
import Page2 from '../components/Page2'
import Page3 from '../components/Page3'
import Page3Details from "../components/Page3Details"
 
let AppRouter = [
    {
        path:'/',// 首页默认加载的页面
        component:Page1,// 所使用的组件
        exact: true //是否为严格模式
    },
    {
        path:'/page2',
        component:Page2
    },
    {
        path:'/page3',
        component:Page3,
        routes:[/* * 嵌套路由并传参*/
            {
                path:'/page3/:id',
                component:Page3Details
            }
        ]
    }
]
export default AppRouter;