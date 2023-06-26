import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KategorijeService } from '../kategorije.service';
import { CustomValidator } from './validacija.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService:UserService, private kategorijaService:KategorijeService) { }
    roles: any = {}
    id:number = 14;
    kategorije: any = {}
    idkategorije:number = 2;
    response : any = {}
    error:boolean = false;
    registered:boolean = false;
    passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  ngOnInit(): void {

    this.userService.getAllRoles()
    .subscribe((res:any) => {
      this.roles = res;
      console.log(this.roles);
    },
    error => {
      console.log(error);
    })

    this.userService.getAllKategories()
    .subscribe((res:any) => {
      this.kategorije= res.data,
      console.log(this.kategorije)
    },
    error  => {
      console.log(error);
    })

    this.userService.getInstructorList()
    .subscribe((res:any) => {
      this.instuktori = res;
      console.log(this.instuktori[0].idd, "to je id")
    },
    error => {
      console.log(error
        )
    })

  }
  idd : number = -1;

  registerForm = new FormGroup({
    name:new FormControl('',[Validators.required, Validators.minLength(3),CustomValidator.neMozeRazmake]),
    surname:new FormControl('',[Validators.required, Validators.minLength(3)]),
    email:new FormControl('',[Validators.required, Validators.email]),
    password:new FormControl('',[Validators.required,
      Validators.pattern(this.passwordPattern)]),
    confirmPassword:new FormControl('',[Validators.required, CustomValidator.passwordMatchValidator]),
    dateofbirth: new FormControl('',[Validators.required]),
    gender:new FormControl('',[Validators.required]),
    phonenumber:new FormControl('',[Validators.required])
  })
  get name(){
    return this.registerForm.get('name')
    }
    get surname(){
      return this.registerForm.get('surname')
    }
    get email(){
      return this.registerForm.get('email')
    }
    get confirmPassword()
    {
      return this.registerForm.get('confirmPassword')
    }
    get password(){
      return this.registerForm.get('password')
    }
    get dateofbirth(){
      return this.registerForm.get('dateofbirth')
    }
    get gender(){
      return this.registerForm.get('gender')
    }
    get phonenumber(){
      return this.registerForm.get('phonenumber')
    }


    register(){
      let user = {
        ime:this.registerForm.get('name')?.value,
        prezime:this.registerForm.get('surname')?.value,
        email:this.registerForm.get('email')?.value,
        userName:this.registerForm.get('email')?.value,
        password:this.registerForm.get('password')?.value,
        datumRodjenja:this.registerForm.get('dateofbirth')?.value,
        pol:this.registerForm.get('gender')?.value,
        brojTelefona:this.registerForm.get('phonenumber')?.value,
        role:this.id,
        kategorijaId:this.idkategorije
      }


      this.userService.createUser(user)
      .subscribe(res => {
        console.log(res);
        this.response = res;
      },
      error => {
        this.response = error.error;
        this.error = true;
      })
    }
    showInstructorField: boolean = false;
    idinstuktora:number = 2
    instuktori:any = {};



    izaberirolu(){
      console.log("promenjeno");
      this.id = +(document.getElementById('selectRole') as HTMLInputElement).value;
      console.log(this.id);
    }
    izaberiKategoriju(){
      console.log("kategorija");
      this.idkategorije = +(document.getElementById('selectKategorija') as HTMLInputElement).value;
      console.log(this.idkategorije);
    }
    izaberiinstuktora(){
      console.log("instuktori");
      this.idinstuktora = +(document.getElementById('selectinstuktor')as HTMLInputElement).value;
      console.log(this.idinstuktora);
      let proba = {
        instruktorId :this.idinstuktora,
        polaznikId:this.id

      }
      this.userService.createinstuktorraspored(proba)
      .subscribe(res =>
        console.log(res),error => console.log(error));

    }
}
