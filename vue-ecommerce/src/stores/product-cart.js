import { defineStore } from "pinia";

const STORAGE_KEY = "product-cart";

export const useProductCartStore = defineStore("productCart", {
  state() {
    // Récupérer le panier depuis localStorage, sinon tableau vide
    const savedCart = localStorage.getItem(STORAGE_KEY);
    return {
      cart: savedCart ? JSON.parse(savedCart) : [],
    };
  },

  getters: {
    items() {
      return this.cart;
    },
    total() {
      return this.cart
        .reduce((sum, item) => {
          const price = item.unitPrice !== undefined ? item.unitPrice : item.price;
          return sum + price * (item.quantity || 1);
        }, 0)
        .toFixed(2);
    },
    count() {
      return this.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    },
  },

  actions: {
    saveToLocalStorage() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cart));
      } catch (e) {
        if (
          e instanceof DOMException &&
          (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED")
        ) {
          console.warn("localStorage plein, on vide le panier...");
          localStorage.removeItem(STORAGE_KEY);
          this.cart = [];
        } else {
          throw e;
        }
      }
    },

    addToCart(product) {
      const item = this.cart.find((p) => p.id === product.id);
      if (item) {
        item.quantity = (item.quantity || 1) + 1;
      } else {
        this.cart.push({
          ...product,
          quantity: 1,
          unitPrice: product.price,
        });
      }
      this.saveToLocalStorage();
    },

    removeFromCart(productId) {
      this.cart = this.cart.filter((p) => p.id !== productId);
      this.saveToLocalStorage();
    },

    increaseQuantity(productId) {
      const item = this.cart.find((p) => p.id === productId);
      if (item) {
        item.quantity = (item.quantity || 1) + 1;
        this.saveToLocalStorage();
      }
    },

    decreaseQuantity(productId) {
      const item = this.cart.find((p) => p.id === productId);
      if (item) {
        item.quantity = (item.quantity || 1) - 1;
        if (item.quantity <= 0) {
          this.removeFromCart(productId);
        } else {
          this.saveToLocalStorage();
        }
      }
    },
  },
});
