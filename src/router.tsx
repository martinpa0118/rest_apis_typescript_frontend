import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import Productos, {loader as productosLoader, action as updateDisponibleAction} from './views/Productos'
import NuevoProducto, {action as nuevoProductoAction} from './views/NuevoProducto'
import EditarProducto, {loader as editarProductoLoader, action as editarProductoAction} from './views/EditarProducto'
import { action as eliminarProductoAction } from './components/ProductoDetalles'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Productos/>,
                loader: productosLoader,
                action: updateDisponibleAction
            },
            {
                path: 'productos/nuevo',
                element: <NuevoProducto />,
                action: nuevoProductoAction
            },
            {
                path: 'productos/:id/editar', //ROA Pattern - Resource-oriented design
                element: <EditarProducto/>,
                loader: editarProductoLoader,
                action: editarProductoAction
            },
            {
                path: 'productos/:id/eliminar',
                action: eliminarProductoAction
            }
        ]
    }
])