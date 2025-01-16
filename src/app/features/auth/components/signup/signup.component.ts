import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: false,
  
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
    signupForm: FormGroup;
    isSubmitting = false;
    errorMessage = '';
  
    constructor(
      private fb: FormBuilder,
      private router: Router,
      private authService: AuthService
    ) {
      this.signupForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }
  
    async onSubmit(): Promise<void> {
      if (this.signupForm.valid && !this.isSubmitting) {
        this.isSubmitting = true;
        this.errorMessage = '';
        
        const { email, password } = this.signupForm.value;
  
        try {
          // Call the AuthService signup method
          await this.authService.signup(email, password);
          
          // Navigate to the login page after successful signup
          this.router.navigate(['/auth/login']);
        } catch (error) {
          // Handle errors (e.g., email already in use)
          this.errorMessage = 'Failed to create account. Please try again.';
          console.error('Signup error:', error);
        } finally {
          this.isSubmitting = false;
        }
      } else {
        this.signupForm.markAllAsTouched();
      }
    }
  
    getErrorMessage(field: string): string {
      const control = this.signupForm.get(field);
      if (control?.errors && control.touched) {
        if (control.errors['required']) return `${field} is required`;
        if (control.errors['email']) return 'Invalid email format';
        if (control.errors['minlength']) return 'Password must be at least 6 characters long';
      }
      return '';
    }
  }

