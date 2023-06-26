import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { ControlComponent } from './control/control.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/reducers/user.reducer';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { KategorijaComponent } from './kategorija/kategorija.component';
import { RasporedComponent } from './raspored/raspored.component';
import { OdsustvoComponent } from './odsustvo/odsustvo.component';
import { KreirajrasporedComponent } from './kreirajraspored/kreirajraspored.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    UserlistComponent,
    UpdateuserComponent,
    ControlComponent,
    AdminpageComponent,
    KategorijaComponent,
    RasporedComponent,
    OdsustvoComponent,
    KreirajrasporedComponent
,  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({user: userReducer}),
    RouterModule.forRoot([

      {path:'',component:HomeComponent},
      {path:'about',component:AboutComponent},
      {path:'register',component:RegisterComponent},
      {path:'login',component:LoginComponent},
      {path:'profile',component:ProfileComponent},
      {path:'user-list',component:UserlistComponent},
      {path:'control',component:ControlComponent},
      {path:'dodela',component:AdminpageComponent},
      {path:'kategorija',component:KategorijaComponent},
      {path:'raspored',component:RasporedComponent},
      {path:'odsustvo',component:OdsustvoComponent},
      {path:'kreirajraspored/:instruktorId/:polaznikId',component:KreirajrasporedComponent}

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
