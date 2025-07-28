import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LifeCycleDemoComponent } from './components/life-cycle-demo/life-cycle-demo.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonService } from './services/common.service';
import { Product, ProductResponse } from './models/product.model';
import { NgFor } from '@angular/common';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

// user.model.ts
export interface User {
  username: string;
  email: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LifeCycleDemoComponent,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-bootstrap';
  email: string = '';
  name: string = '';

  // products
  products: Product[] = [];

  // create form group then builder
  userFormGroup!: FormGroup;
  private fb = inject(FormBuilder);

  private commonService = inject(CommonService);

  // Add this property to fix the error

  searchForm = this.fb.group({
    searchTerm: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor() {
    // Initialize the form group with form controls
    this.userFormGroup = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    // You can perform initialization logic here
    this.commonService.log('AppComponent initialized');
    // Load products using the CommonService
    // this.loadProducts('phone');
    this.searchForm
      .get('searchTerm')
      ?.valueChanges.pipe(
        filter((term): term is string => term !== null), // filter out nulls
        debounceTime(300), // wait 300ms after the last keystroke
        distinctUntilChanged(), // only emit if value is different from before
        filter((term: string) => term.length === 0 || term.length > 2) // optional: ignore very short terms
      )
      .subscribe((term: string) => {
        this.loadProducts(term); // call your method
      });
    // this.loadProducts(''); // Uncomment to load all products initially
  }

  loadProducts(params: string) {
    // Example method to load products using the CommonService
    this.commonService.products(params).subscribe(
      (data: ProductResponse) => {
        console.log('Products loaded:', data);
        this.products = data.products;
      },
      (error) => {
        this.commonService.handleError(error);
      }
    );
  }

  handleSubmit() {
    // Here you can handle the form submission, e.g., send data to a server
    if (this.userFormGroup.valid) {
      const user: User = this.userFormGroup.value as User;
      console.log('Form submitted:', user);
      // Reset the form after submission
      this.userFormGroup.reset();
    } else {
      console.log('Form is invalid');
      // Optionally, you can mark all controls as touched to show validation errors
      this.userFormGroup.markAllAsTouched();
    }
  }
}
