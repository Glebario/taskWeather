import {Injectable} from "@angular/core";
import {user} from "../../layout/auth-layout/interface/auth-interface";

@Injectable()

export class LocalStorageServices {

  public userData: user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  //======================================МОЙ АККАУНТ=====================================
  public localStorageUser(dataUserWithServer: user) {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user')
    }

    localStorage.setItem('user', JSON.stringify(dataUserWithServer));
    this.userData = dataUserWithServer;
  }
}
