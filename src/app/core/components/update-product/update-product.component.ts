import { Component, inject } from '@angular/core';
import { material } from '../../../shared/providers/angular-material';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-update-product',
  imports: [material, ReactiveFormsModule, CommonModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss',
})
export class UpdateProductComponent {
  productForm: any;
  productId: any;

  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
      inStock: [true, [Validators.required]],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.productId = params['id'];
        this.loadProductData(this.productId);
      }
    });
  }

  loadProductData(id: any) {
    const product = this.productService.getProductById(id);
    this.productForm.patchValue(product);
  }

  get f() {
    return this.productForm.controls;
  }

  gotoHome() {
    this.router.navigate(['home']);
  }

  updateProduct() {
    if (this.productForm.valid) {
      this.productService.updateProduct(this.productForm.value);
      this.router.navigate(['home']);
    }
  }
}
