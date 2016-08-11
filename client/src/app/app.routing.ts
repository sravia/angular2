import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './account/login/login.component';
import { IntroComponent } from './intro/intro.component';

const appRoutes: Routes = [
    {
    path: 'intro',
    component: IntroComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
    path: '',
    redirectTo: '/intro',
    pathMatch: 'full'
    }
];

export const routing = RouterModule.forRoot(appRoutes);
