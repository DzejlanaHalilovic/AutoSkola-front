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
    ControlComponent
  ],
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
      {path:'login',component:LoginComponent}

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
