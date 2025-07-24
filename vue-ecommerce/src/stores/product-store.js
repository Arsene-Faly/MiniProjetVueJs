import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
    state () {
        return {
            products: []
        }
    },
    getters: {
        all() {
            return this.products
        }
    },
    actions: {
        setProducts(data) {
            this.products = data
        }
    }
})