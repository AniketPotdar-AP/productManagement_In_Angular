import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private storageKey = 'products';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId) && !sessionStorage.getItem(this.storageKey)) {
      sessionStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  // Fetch all products from sessionStorage
  fetchProducts() {
    const products = sessionStorage.getItem(this.storageKey);
    return products ? JSON.parse(products) : [];
  }

  // Fetch  product from sessionStorage by ID
  getProductById(productId: number) {
    const products = this.fetchProducts();
    return products.find((product: any) =>
      product.id == productId ? product : null
    );
  }

  // Add a new product
  addProduct(product: {
    name: string;
    price: number;
    category: string;
    inStock: string;
  }) {
    const products = this.fetchProducts();
    const nextId =
      products.length > 0 ? Math.max(...products.map((p: any) => p.id)) + 1 : 1;
    const newProduct = { ...product, id: nextId };
    products.push(newProduct);
    sessionStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  // Update an existing product
  updateProduct(updatedProduct: {
    id: number;
    name: string;
    price: number;
    category: string;
    inStock: string;
  }) {
    const products = this.fetchProducts();
    const updatedProducts = products.map((product: any) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    sessionStorage.setItem(this.storageKey, JSON.stringify(updatedProducts));
  }

  // Delete a product by ID
  deleteProduct(productId: number) {
    const products = this.fetchProducts();
    const filteredProducts = products.filter(
      (product: any) => product.id !== productId
    );
    sessionStorage.setItem(this.storageKey, JSON.stringify(filteredProducts));
  }
}
