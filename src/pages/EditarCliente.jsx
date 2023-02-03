import { Form, useActionData, useNavigate, useLoaderData, redirect } from "react-router-dom"
import Error from "../components/Error"
import Formulario from "../components/Formulario"
import { actualizarCliente, obtenerCliente } from "../data/Clientes"

//El loader recibe automaticamente los parametros de la url en la variable {params}
export async function loader({request, params}) {
    const cliente = await obtenerCliente(params.clienteId)
    if(Object.values(cliente).length === 0){
        throw new Response('', {
            status: 404,
            statusText: 'No hay resultados'
        })
    }
    return cliente
}

export async function action({request, params}) {
    const formData = await request.formData()
  
    //La forma de obtener los datos del form
    const datos = Object.fromEntries(formData)
  
    const email = formData.get('email')
  
    //validacion
    const errores = []
    if(Object.values(datos).includes('')){
      errores.push('Todos los campos son obligatorios')
    }
  
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])")
  
    if(!regex.test(email)){
      errores.push('El email es incorrecto')
    }
  
    //retornar datos si hay errores
    if(Object.keys(errores).length){
      return errores
    }
  
    //actualizar el cliente
    await actualizarCliente(params.clienteId, datos)
  
    //redirect se utiliza para navegar en loaders y actions
    return redirect('/')
  }

const EditarCliente = () => {

    const errores = useActionData()
    const navigate = useNavigate()
    const cliente = useLoaderData()

    return (
        <>
            <h1 className="font-bold text-4xl text-blue-900">Editar Cliente</h1>
            <p className="mt-3">Modifique los datos del cliente</p>

            <div className="flex justify-end">
                <button
                className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
                onClick={() => navigate(-1)} // lleva a la pagina anterior
                >
                Volver
                </button>
            </div>

            <div className="bg-white shadow-md rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">

                {errores?.length && errores.map((error, i) => 
                    <Error
                    key={i}
                    >
                    {error}
                    </Error>)
                }
            
                {/* La nueva forma de usar un form en react-router-dom */}
                <Form
                method='post'
                noValidate
                >
                    <Formulario
                        cliente={cliente}
                    />
                    
                    <input
                    type="submit"
                    className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg cursor-pointer"
                    value="Guardar Cliente"
                    />
                </Form>
            </div>
        </>
    )
}

export default EditarCliente