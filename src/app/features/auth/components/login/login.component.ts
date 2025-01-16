import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  returnUrl: string = '/patient-dashboard';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Get return URL from route parameters or default to '/patient-dashboard'
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/patient-dashboard';

    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
      this.router.navigate(['/patient-dashboard']);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.errorMessage = '';
      
      const { email, password } = this.loginForm.value;
  
      try {
        // Call the AuthService login method
        const result = await this.authService.login(email, password);
        
        // Store user data in localStorage
        if (result && result.user) {
          localStorage.setItem('user', JSON.stringify({
            uid: result.user.uid,
            email: result.user.email
          }));
        }
        
        // Navigate to the return URL or dashboard
        this.router.navigateByUrl(this.returnUrl);
      } catch (error: any) {
        // Handle specific Firebase auth errors
        if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
          this.errorMessage = 'Invalid email or password';
        } else if (error.code === 'auth/too-many-requests') {
          this.errorMessage = 'Too many failed attempts. Please try again later.';
        } else {
          this.errorMessage = 'An error occurred during login';
        }
        console.error('Login error:', error);
      } finally {
        this.isSubmitting = false;
      }
    } else {
      // Mark all fields as touched to display validation errors
      this.loginForm.markAllAsTouched();
    }
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (control?.errors && control.touched) {
      if (control.errors['required']) return `${field} is required`;
      if (control.errors['email']) return 'Invalid email format';
    }
    return '';
  }
}