import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {ModalModule} from "ngx-bootstrap/modal";
import {MainLayoutComponent} from "./main-layout.component";
import {RouterModule} from "@angular/router";
import {AuthGuard} from "../../shared/classes/auth.guard";
import {LocalStorageServices} from "../../shared/services/localStorage.services";
import {UserPageComponent} from "./pages/user-page/user-page.component";
import {SettingPageComponent} from "./pages/setting-page/setting-page.component";



@NgModule({
  declarations: [
      UserPageComponent,
    MainLayoutComponent,
      SettingPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ModalModule.forRoot(),
    RouterModule.forChild([
      {
        path: '', component: MainLayoutComponent, canActivate: [AuthGuard], children: [
          {path: 'user/:id', component: UserPageComponent},
          {path: 'settings', component: SettingPageComponent},
        ]
      }
    ]),
  ],
  providers: [
    AuthGuard,
    LocalStorageServices,
  ]
})
export class MainLayoutModule { }
