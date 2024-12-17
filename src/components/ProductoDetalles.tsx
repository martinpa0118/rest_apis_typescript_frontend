import {Form, useNavigate, ActionFunctionArgs, redirect, useFetcher} from 'react-router-dom'
import { Producto } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from '../services/ProductService'

type ProductoDetallesProps = {
    producto: Producto
}
export async function action({params} : ActionFunctionArgs) {
    
    if(params.id !== undefined){

        await deleteProduct(+params.id)
    
        return redirect('/')
    }
}

export default function ProductoDetalles({producto} : ProductoDetallesProps) {

    const fetcher = useFetcher()
    const navigate = useNavigate()

    const isAvailable = producto.disponible

  return (
    <tr className="border-b ">
    <td className="p-3 text-lg text-gray-800">
        {producto.name}
    </td>
    <td className="p-3 text-lg text-gray-800">
        {formatCurrency(producto.price)}
    </td>
    <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method='POST'>
            <button
            type='submit'
            name='id'
            value={producto.id}
            className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:pointer`}
            >
                
                {isAvailable ? 'Disponible' : 'No Disponible'}
            </button>
        </fetcher.Form>
    </td>
    <td className="p-3 text-lg text-gray-800 ">
       <div className="flex gap-2 items-center">
        <button
            onClick={() =>navigate(`/productos/${producto.id}/editar`)}
            className='bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
        >Editar</button>
        <Form
            className='w-full'
            method='POST'
            action={`productos/${producto.id}/eliminar`}
            onSubmit={(e) => {
                if(!confirm('¿Eliminar?')){
                    e.preventDefault()
                }
            }}
        >
            <input 
                type='submit'
                value='Eliminar'
                className='bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
            />
        </Form>
       </div>
    </td>
</tr> 
  )
}
