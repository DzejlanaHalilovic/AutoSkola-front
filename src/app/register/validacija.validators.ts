import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidator
{
  static neMozeRazmake(control:AbstractControl): ValidationErrors | null
  {
    if((control.value as string).indexOf(' ') > -1)
    {
      return {neMozeRazmak: true}
    }




    return null;
  }

  static umcnLengthValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;

    if (value && value.length !== 13) {
      return { umcnLength: true };
    }

    return null;}

    static passwordMatchValidator(control: AbstractControl): ValidationErrors | null  {
      const passwordControl = control.root.get('password');
      const confirmPasswordControl = control.root.get('confirmPassword');

      if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
        return { passwordMismatch: true };
      }

      return null;
    };


}

export function phoneLengthValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const phoneNumber = control.value;
    const validLengths = [9, 10];
    if (phoneNumber && phoneNumber.length !== 0 && !validLengths.includes(phoneNumber.length)) {
      return { phoneLength: true };
    }
    return null;
  };
}

export function ageValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const selectedDate: Date = control.value;
    const currentDate: Date = new Date();

    // Izračunajte razliku između trenutnog datuma i datuma rođenja
    const ageDifferenceInMilliseconds: number = currentDate.getTime() - selectedDate.getTime();

    // Pretvorite razliku u godine
    const ageDifferenceInYears: number = ageDifferenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

    // Proverite da li je korisnik stariji od minimalne starosti
    if (ageDifferenceInYears < minAge) {
      return { ageInvalid: true };
    }

    return null;
  };
}

