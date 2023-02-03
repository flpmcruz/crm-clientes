import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ErrorPage from './components/ErrorPage'
import Layout from './components/Layout'
import EditarCliente, { loader as editarClienteLoader, action as editarClienteAction } from './pages/EditarCliente'
import Index, { loader as clientesLoader } from './pages/Index'
import NuevoCliente, { action as nuevoClienteAction } from './pages/NuevoCliente'
import { action as eliminarClienteAction } from './components/Cliente'
import './index.css'

const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children: [
        {
          //Esto es lo que se va a mostrar en la raiz /
          index: true,
          element: <Index/>,
          loader: clientesLoader,
          //Crear una pantalla personalizada con el error
          errorElement: <ErrorPage/>
        },
        {
          //Estos hijos se iyectan en el Outlet definido en el Layout
          path: '/clientes/nuevo',
          element: <NuevoCliente/>,
          action: nuevoClienteAction,
          //Crear una pantalla personalizada con el error
          errorElement: <ErrorPage/>
        },
        {
          //Estos hijos se iyectan en el Outlet definido en el Layout
          path: '/clientes/:clienteId/editar',
          element: <EditarCliente/>,
          loader: editarClienteLoader,
          action: editarClienteAction,
          //Crear una pantalla personalizada con el error
          errorElement: <ErrorPage/>
        },
        {
          path: '/clientes/:clienteId/eliminar',
          action: eliminarClienteAction,
        },
      ]
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
