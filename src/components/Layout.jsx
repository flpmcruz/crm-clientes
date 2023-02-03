import {Outlet, Link, useLocation} from 'react-router-dom'

const Layout = () => {
    /* Para obtener info de la url que estamos */
    const location = useLocation()

    return (
        <div>
            <div className='md:flex md:min-h-screen'>
                    {/* La parte comun del Layout */}
                <aside className='md:w-1/4 bg-blue-900 px-5 py-10'>
                    <h2 className='text-4xl font-black text-center text-white'>CRM - Clientes</h2>

                    <nav className='mt-10 '>
                        {/* Link se usa para que no refresque la pagina en vez de <a></a>*/}
                        <Link 
                            className={`${location.pathname === '/' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300`} 
                            to='/'>
                            Clientes
                        </Link>
                        <Link 
                            className={`${location.pathname === '/clientes/nuevo' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300`} 
                            to='/clientes/nuevo'>
                            Nuevo Cliente
                        </Link>
                    </nav>
                </aside>

                <div className='md:w-3/4 py-10 md:h-screen overflow-scroll px-10'>
                    {/* Aqui se inyecta el contenido de los childrens */}
                    <Outlet/>
                </div>

            </div>
        </div>
    )
}

export default Layout