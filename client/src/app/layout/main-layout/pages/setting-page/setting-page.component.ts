import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthServices} from "../../../auth-layout/services/auth.services";

@Component({
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.css']
})
export class SettingPageComponent {

  constructor(
      private authServices: AuthServices,
    private router: Router
  ) { }


  logout(event: Event) {
    event.preventDefault();
    this.authServices.logout();
    this.router.navigate(['/sign-in'])
  }

}
