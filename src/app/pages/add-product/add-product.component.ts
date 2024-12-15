import { Component, inject } from '@angular/core';
import { material } from '../../shared/providers/angular-material';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  imports: [material, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  productForm: any;

  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);

  constructor() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
      inStock: [true, [Validators.required]],
    });
  }

  ngOnInit() { }

  get f() {
    return this.productForm.controls;
  }

  gotoHome() {
    this.router.navigate(['home'])
  }

  submit() {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value);
      this.productForm.reset();
      this.router.navigate(['home']);
    }
  }

}
