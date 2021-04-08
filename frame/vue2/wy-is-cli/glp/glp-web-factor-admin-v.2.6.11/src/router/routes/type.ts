import { RouteConfig } from 'vue-router/types/router'

export interface AppRouteConfigMeta {
    pid?: string; // 权限key
    breadcrumb?: Array<AppRouteConfigMetaBreadcrumb>;
    nested?: boolean;
}

export interface AppRouteConfigMetaBreadcrumb {
    title: string;
    path?: string;
    active: boolean;
}

export interface AppRouteConfig extends RouteConfig {
    meta?: AppRouteConfigMeta;
}
