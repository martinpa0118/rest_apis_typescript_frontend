import { ActionFunctionArgs, Link, useLoaderData } from 'react-router-dom'
import { getProducts, updateProductAvailability } from '../services/ProductService'
import ProductoDetalles from '../components/ProductoDetalles';
import { Producto } from '../types';

export async function loader() {
  const productos = await getProducts()

  return productos
}

export async function action({request} : ActionFunctionArgs){
  const data = Object.fromEntries(await request.formData())
  await updateProductAvailability(+data.id)
  return{}
}

export default function Productos() {

  const productos = useLoaderData() as Producto[];

  return (
    <div>
      <>
        <div className="flex justify-between">
          <h2 className='text-4xl font-black text-slate-500'>Productos</h2>
          <Link
            to="productos/nuevo"
            className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
          >
            Agregar Producto
          </Link>
        </div>
        <div className="p-2">
          <table className="w-full mt-5 table-auto">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="p-2">Producto</th>
                <th className="p-2">Precio</th>
                <th className="p-2">Disponibilidad</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(producto => (
                <ProductoDetalles 
                  key={producto.id}
                  producto={producto}
                
                />
              ))}
            </tbody>
          </table>
        </div>
      </>
    </div>
  )
}
