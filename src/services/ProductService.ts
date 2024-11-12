import { safeParse } from "valibot";
import { DraftProductSchema } from "../types";
import axios from "axios";



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



