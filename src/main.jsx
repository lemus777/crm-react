import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
// como diferentes componentes pueden tener diferentes loader, para evitar conflictos renombramos al importar
import Index, { loader as clientesLoader } from './pages/Index'
import NuevoCliente, { action as nuevoClienteAction } from './pages/NuevoCliente'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: clientesLoader
      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente />,
        action: nuevoClienteAction
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
