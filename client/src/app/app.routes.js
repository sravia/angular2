"use strict";
var router_1 = require('@angular/router');
var dashboard_component_ts_1 = require('./dashboard/dashboard.component.ts');
var heroes_component_ts_1 = require('./heroes/heroes.component.ts');
var hero_detail_component_ts_1 = require('./herodetail/hero-detail.component.ts');
var routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: dashboard_component_ts_1.DashboardComponent
    },
    {
        path: 'detail/:id',
        component: hero_detail_component_ts_1.HeroDetailComponent
    },
    {
        path: 'heroes',
        component: heroes_component_ts_1.HeroesComponent
    }
];
exports.appRouterProviders = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=app.routes.js.map