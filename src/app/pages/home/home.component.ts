import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { material } from '../../shared/providers/angular-material';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, FormsModule, material, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  productsSignal: any[] = [];
  filteredProductSignal!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'id',
    'name',
    'price',
    'category',
    'inStock',
    'actions',
  ];

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.filteredProductSignal.sort = this.sort;
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.productsSignal = this.productService.fetchProducts();
      this.filteredProductSignal = new MatTableDataSource(this.productsSignal);
    });
  }

  getFilteredProductsLength(): number {
    return this.filteredProductSignal ? this.filteredProductSignal.data.length : 0;
  }

  filterData(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm) {
      const filtered = this.productsSignal.filter(
        (product: any) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.id.toString().toLowerCase().includes(searchTerm) ||
          product.price.toString().toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm)
      );
      this.filteredProductSignal.data = filtered;
    } else {
      this.filteredProductSignal.data = this.productsSignal;
    }
  }

  createProduct() {
    this.router.navigate(['add-product']);
  }

  updateProduct(id: any) {
    this.router.navigate(['updateProduct', id]);
  }

  deleteProduct(productId: number): void {
    this.dialog
      .open(DeleteConfirmationDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.productService.deleteProduct(productId);
          this.productsSignal = this.productService.fetchProducts();
          this.filteredProductSignal.data = this.productsSignal;
        }
      });
  }
}

@Component({
  selector: 'app-delete-confirmation-dialog',
  standalone: true,
  imports: [material],
  template: `
    <div style="padding: 10px;">
      <p mat-dialog-title>Are you sure you want to delete this product?</p>
      <mat-dialog-actions>
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-button color="warn" (click)="onConfirm()">Delete</button>
      </mat-dialog-actions>
    </div>
  `,
})
export class DeleteConfirmationDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>
  ) { }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
