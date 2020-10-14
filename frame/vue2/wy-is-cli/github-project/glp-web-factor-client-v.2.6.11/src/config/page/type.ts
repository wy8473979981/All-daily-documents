export interface PageOption {
    name: string;
    title: string;
    router?: PageOptionRouter | boolean; // 未定义时， 将依据父级是否定义来判断
    children?: PageOption[];
}

export interface Page {
    name: string;
    title: string;
    path: string;
    parent: Page | null;
    router?: PageRouter;
    menu: boolean;
    children?: Page[];
}

export interface PageOptionRouter {
    pathSuffix?: string; // 路径后缀
    customPath?: string; // 自定义路径
    nested?: boolean; // 是否嵌套路由, 默认 true
}

export interface PageRouter {
    path: string; // 路由路径
    nested: boolean;
}
