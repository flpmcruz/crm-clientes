//este hook solo existe en react-router-dom
import { useLoaderData } from 'react-router-dom'
import { obtenerClientes } from '../data/Clientes';
import Cliente from '../components/CLiente';

//A partir de router-DOM 6.4 en vez de useEffect se debe usar loader
//Esta funcion se va a ejecutar cuando el componente cargue
export function loader() {
    const clientes = obtenerClientes()
    return clientes
}

const Index = () => {

    //Para recibir lo que retorna loader()
    //es como si fuera el state
    const clientes = useLoaderData()
    
    return (
        <>
            <h1 className="font-bold text-4xl text-blue-900">Clientes</h1>
            <p className="mt-3">Administra tus clientes</p>

            {clientes.length ? (
                <table className='w-full bg-white shadow table-auto mt-5'>
                    <thead className='bg-blue-800 text-white'>
                        <tr>
                            <th className='p-2'>Clientes</th>
                            <th className='p-2'>Contacto</th>
                            <th className='p-2'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map( cliente => (
                            <Cliente 
                                key={cliente.id} 
                                cliente={cliente}/>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center mt-10">No hay clientes</p>
            )}
        </>
    )
}

export default Index