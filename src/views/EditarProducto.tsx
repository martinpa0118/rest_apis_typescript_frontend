import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import { getProductById, updateProduct } from '../services/ProductService'
import { Producto } from '../types'
import ProductoFormulario from '../components/ProductoFormulario'


export async function loader({ params }: LoaderFunctionArgs) {
    if (params.id !== undefined) {
        const producto = await getProductById(+params.id)
        if (!producto) {
            // throw new Response('', {status:404, statusText: 'No Encontrado'})
            return redirect('/')
        }
        return producto
    }

}

export async function action({ request, params }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    let error = ''
    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }
    if (error.length) {
        return error
    }
    if (params.id !== undefined) {

        await updateProduct(data, +params.id)

        return redirect('/')
    }
}
const availabilityOptions = [
    { name: 'Disponible', value: true },
    { name: 'No Disponible', value: false }
]


export default function EditarProducto() {

    const producto = useLoaderData() as Producto
    const error = useActionData() as string

    return (
        <>
            <div className="flex justify-between">
                <h2 className='text-4xl font-black text-slate-500'>Editar Producto</h2>
                <Link
                    to="/"
                    className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
                >
                    Volver a Productos
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form
                className="mt-10"
                method='POST'

            >

                
                <ProductoFormulario
                    producto={producto}
                />


                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="disponible"
                    >Disponibilidad:</label>
                    <select
                        id="disponible"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="disponible"
                        defaultValue={producto?.disponible.toString()}
                    >
                        {availabilityOptions.map(option => (
                            <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>

                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Guardar Cambios"
                />
            </Form>

        </>
    )
}
