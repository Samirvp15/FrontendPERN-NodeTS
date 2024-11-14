import { safeParse } from "valibot";
import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types";
import axios from "axios";
import { toBoolean } from "../utils";



type ProductData = {
    [k: string]: FormDataEntryValue;
}


export async function addProduct(data: ProductData) {

    try {

        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })

        if (!result.success) {
            throw new Error('Datos invalidos')
        } else {
            const url = `${import.meta.env.VITE_API_URL}/api/products`

            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        }

    } catch (error) {
        console.log(error)
    }
}



export async function getProducts() {

    try {

        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios.get(url)
        const result = safeParse(ProductsSchema, data.data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error ...')
        }

    } catch (error) {
        console.log(error)
    }
}



export async function getProductById(id: Product['id']) {

    try {

        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios.get(url)
        const result = safeParse(ProductSchema, data.data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error ...')
        }

    } catch (error) {
        console.log(error)
    }
}

export async function updateProduct(data: ProductData, id: Product['id']) {

    try {

        //VALIDAR DATOS
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: +data.price,
            availability: toBoolean(data.availability.toString())
        })

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output)
        }

    } catch (error) {
        console.log(error)
    }
}


export async function deleteProduct(id: Product['id']) {

    try {

        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)

    } catch (error) {
        console.log(error)
    }
}

export async function updateProductAvailability(id: ProductData['id'], availability: ProductData['availability']) {

    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url, {
            availability
        })

    } catch (error) {
        console.log(error)
    }
}


