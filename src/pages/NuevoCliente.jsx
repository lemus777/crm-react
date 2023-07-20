import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import Formulario from "../components/Formulario"
import Error from "../components/Error"
import { agregarCliente } from "../data/clientes"

export async function action({request}) {
  // esta funcion action siempre tiene un request
  // obtenemos los datos del formulario:
  const formData = await request.formData()
  // hacemos un objeto con los datos obtenidos:
  const datos = Object.fromEntries(formData)

  // podemos obtener un campo específico del formulario para su validación
  const email = formData.get('email')

  // Validación
  const errores = []
  if (Object.values(datos).includes('')) {
    errores.push('Todos los campos son obligatorios')
  }

  // usamos una expresión regular para el email
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

  // si el test de esta expresión regular al email no se cumple agrega el error correspondiente
  if(!regex.test(email)) {
    errores.push('El email no es válido')
  }

  // Retornar datos si hay errores
  if (Object.keys(errores).length) {
    return errores
  }

  await agregarCliente(datos)

  return redirect('/')
}

function NuevoCliente() {

  const errores = useActionData()
  const navigate = useNavigate()

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo cliente</h1>
      <p className="mt-3">Llena todos los campos para registrar un nuevo cliente</p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">

        {errores?.length && errores.map( ( error, i ) => <Error key={i}>{error}</Error> )}

        <Form
          method="post"
          noValidate
        >
          <Formulario />

          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value='Registrar cliente'
          />
        </Form>
      </div>
    </>
  )
}

export default NuevoCliente