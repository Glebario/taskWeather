import {Injectable, TemplateRef} from "@angular/core";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {LocalStorageServices} from "./localStorage.services";

@Injectable()

export class SharedServices {
  constructor(
    private modalServices: BsModalService,
    private localStorageServices: LocalStorageServices
  ) {}

  //==================================ЛЕЙБЛ ЗАГРУЗКИ===================================
  public loading: boolean = false;

  public loadingProgress(key: boolean) {
    this.loading = key;
    return key
  }
}
