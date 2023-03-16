import fs from 'fs';

export default class ProductManager {
    constructor(path) {
        this.path = path
    }

    //consultar todos los productos
    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const productsInfo = await fs.promises.readFile(this.path, 'utf-8')
            const products = JSON.parse(productsInfo)
            return products
        } else {
            return []
        }
    }

    //consultar producto por la id
    getProductById = async (id) => {
        const products = await this.getProducts()
        const product = products.find((p) => p.id === id)
        if (product) {
            return product
        } else {
            return 'Product not found'
        }
    }

    //agregar un producto
    addProducts = async (product) => {
        const products = await this.getProducts()
        const id = this.#generateId(products)
        const newProduct = { id, ...product }
        products.push(newProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(products))
        return newProduct
    }

    //Not Needed
    deleteProducts = async () => {
        if (fs.existsSync(this.path)) {
            await fs.promises.unlink(this.path)
            return 'all products deleted'
        } else {
            return 'File not found'
        }
    }

    //Eliminar producto por ID
    deleteProductsById = async (id) => {
        const products = await this.getProducts()
       //console.log()
        const productIndex = products.findIndex(p => p.id === id)
        if(productIndex === -1){
            console.log('product not found')
        } else {
            products.splice(productIndex, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(products))
        }
    }

    updateProduct = async (id, obj) => {
        const products = await this.getProducts()
        const productIndex = products.findIndex(p => p.id === id)
        if (productIndex === -1) {
            return 'Product not Found'
        } else {
            const updatedProduct = { ...products[productIndex], ...obj }
            products.splice(productIndex, 1, updatedProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(products))
        }
    }

    //generar id en fx oculta
    #generateId = (products) => {
        let id
        if (products.length === 0) {
            id = 1
        } else {
            id = products[products.length - 1].id + 1
        }
        return id
    }

}
