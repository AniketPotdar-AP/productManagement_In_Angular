import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { material } from '../../shared/providers/angular-material';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, FormsModule, material, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  productsSignal: any;
  filteredProductSignal: any;
  displayedColumns: string[] = [
    'name',
    'price',
    'category',
    'inStock',
    'actions',
  ];

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.productsSignal = this.productService.fetchProducts();
      this.filteredProductSignal = this.productsSignal;
    });
  }

  filterData(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm) {
      const filtered = this.productsSignal.filter((product: any) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.id.toString().toLowerCase().includes(searchTerm) ||
        product.price.toString().toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
      this.filteredProductSignal = filtered;
    } else {
      this.filteredProductSignal = this.productsSignal;
    }
  }

  createProduct() {
    this.router.navigate(['add-product']);
  }

  updateProduct(id: any) {
    this.router.navigate(['updateProduct', id]);
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId);
    this.productsSignal = this.productService.fetchProducts();
    this.filteredProductSignal = this.productsSignal;

    // this.snackBar.open('Product deleted successfully', 'Close', {
    //   duration: 1000,
    // });
  }
}
