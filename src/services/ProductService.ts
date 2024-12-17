import { safeParse , number, parse, string, transform, pipe} from "valibot";
import axios from 'axios'
import { DraftProductSchema, ProductsSchema, Producto, ProductSchema} from "../types"
import { toBoolean } from "../utils";

type ProductData ={

    [k: string]: FormDataEntryValue;
}

export async function addProduct(data: ProductData){
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/productos`
            await axios.post(url,{
                name: result.output.name,
                price: result.output.price
            })
        }else{
            throw new Error('Datos no válidos')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProducts(){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/productos`
        const {data} = await axios(url)
        const result = safeParse(ProductsSchema,data.data)
        if(result.success){
            return result.output
        }else{
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }

}
export async function getProductById(id: Producto['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`
        const {data} = await axios(url)
        const result = safeParse(ProductSchema,data.data)
        if(result.success){
            return result.output
        }else{
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }

}

export async function updateProduct(data: ProductData, id: Producto['id']) {
 
    try {
        //Este es el schema ya listo
        const NumberSchema = pipe(string(), transform(Number), number());
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            disponible: toBoolean(data.disponible.toString())
        })
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`
            await axios.put(url, result.output)
        }
    } catch (error) {
        console.log(error);
    }
}

export async function deleteProduct(id: Producto['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}

export async function updateProductAvailability(id: Producto['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
}