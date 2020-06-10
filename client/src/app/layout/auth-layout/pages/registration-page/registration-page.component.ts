import {Component, OnDestroy, OnInit} from '@angular/core';
import {delay} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthServices} from "../../services/auth.services";
import {errorResponse, userRegister} from "../../interface/auth-interface";
import {Router} from "@angular/router";
import {SharedServices} from "../../../../shared/services/shared-services";
import {RegisterValidators} from "./validators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css'],
  providers: [AuthServices]
})
export class RegistrationPageComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  errorRender: errorResponse;
  aSub: Subscription;
  city: string[] = [
    'Alexandria (Kirovograd region)',
    'Alchevsk (Lugansk region)',
    'Bakhmut (Donetsk region)',
    'White Church (Kiev region)',
    'Berdichev (Zhytomyr region)',
    'Berdyansk (Zaporizhzhya region)',
    'Borispol (Kiev region)',
    'Brovary (Kiev region)',
    'Vinnitsa (Vinnytsia region)',
    'Horishnye Smavni (Poltava region)',
    'Dnepr (Dnipropetrovsk region)',
    'Horlivka (Donetsk region)',
    'Dovzhansk (Lugansk region)',
    'Donetsk (Donetsk region)',
    'Dubno (Rivne region)',
    'Enakievo (Donetsk region)',
    'Zhytomyr (Zhytomyr region)',
    'Zhmerynka (Vinnytsia region)',
    'Zhovkva (Lviv region)',
    'Zaporozhye (Zaporizhzhya region)',
    'Ivano-Frankivsk (Ivano-Frankivsk region)',
    'Izmail (Odessa region)',
    'Irpin (Kiev region)',
    'Kadievka (Lugansk region)',
    'Kamyanets-Podilsky (Khmelnitsky region)',
    'Kamenskoe (Dnipropetrovsk region)',
    'Kakhovka (Kherson region)',
    'Kiev (Kiev region)',
    'Konotop (Sumy region)',
    'Konstantinovka (Donetsk region)',
    'Kramatorsk (Donetsk region)',
    'Kremenchug (Poltava region)',
    'Krivoy Rog (Dnipropetrovsk region)',
    'Kropyvnytskyi (Kirovograd region)',
    'Lisichansk (Lugansk region)',
    'Lozova (Kharkov region)',
    'Lugansk (Lugansk region)',
    'Lutsk (Volyn region)',
    'Lviv (Lviv region)',
    'Makeevka (Donetsk region)',
    'Mariupol (Donetsk region)',
    'Melitopol (Zaporizhzhya region)',
    'Mukachevo (Transcarpathian region)',
    'Nizhyn (Chernihiv region)',
    'Nikolaev (Nikolaev region)',
    'Nikopol (Dnipropetrovsk region)',
    'Odessa (Odessa region)',
    'Pavlograd (Dnipropetrovsk region)',
    'Poltava (Poltava region)',
    'Rivne (Rivne region)',
    'Severodonetsk (Lugansk region)',
    'Slavyansk (Donetsk region)',
    'Smela (Cherkasy region)',
    'Sumy (Sumy region)',
    'Ternopol (Ternopil region)',
    'Toretsk (Donetsk region)',
    'Uzhhorod (Transcarpathian region)',
    'Uman (Cherkasy region)',
    'Khartsyzsk (Donetsk region)',
    'Kharkov (Kharkov region)',
    'Kherson (Kherson region)',
    'Khmelnitsky (Khmelnitsky region)',
    'Crystal (Lugansk region)',
    'Cherkasy (Cherkasy region)',
    'Chernihiv (Chernihiv region)',
    'Chernivtsi (Chernihiv region)',
    'Chernomorsk (Odessa region)',
    'Chistyakovo (Donetsk region)',
    'Shostka (Sumy region)'
  ]

  constructor(
    private formBuilder: FormBuilder,
    public authServices: AuthServices,
    public sharedServices: SharedServices,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        name: [null, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(25),
        ]],
        city: [null, [
          Validators.required,
        ]],
        email: [null, [
          Validators.required,
          Validators.email,
        ]],
        password: [null, [
          Validators.required,
          RegisterValidators.passwordValidator
        ]],
        confirmPassword: [null, [
          Validators.required,
        ]],
      },
      { validator: RegisterValidators.matchingPasswords}
    );
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  doRegistration(user: userRegister) {
    this.sharedServices.loadingProgress(true);
    if(user) {
      this.aSub = this.authServices.register(user)
        .pipe(
          delay(1500)
        )
        .subscribe(
          (response) => {
            if(response) {
              this.registerForm.get('password').reset();
              this.sharedServices.loadingProgress(false);
              this.router.navigate([`/sign-in`]);
            }
          },
          error => {
            this.errorRender = error;
            this.registerForm.get('password').reset();
            setTimeout(() => {
              this.sharedServices.loadingProgress(false);
            }, 1500);
          }
        )
    }
  }

  submitAddUser() {
    if (this.registerForm.valid) {
      const user: userRegister = {
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value,
        profile: {
          city: this.registerForm.get('city').value ? this.registerForm.get('city').value : '',
          userName: this.registerForm.get('name').value,
        }
      };
      this.registerForm.reset();
      this.doRegistration(user);
    }
    return;
  }
}

