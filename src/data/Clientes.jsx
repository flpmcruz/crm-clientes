
const obtenerClientes = async() => {
    const respuesta = await fetch(import.meta.env.VITE_API_URL)
    const resultado = await respuesta.json()
    return resultado
}
const obtenerCliente = async(id) => {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`)
    const resultado = await respuesta.json()
    return resultado
}
const agregarClientes = async(datos) => {
    try {
        const respuesta = await fetch(import.meta.env.VITE_API_URL, {
            method: "POST",
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        await respuesta.json()
    } catch (error) {
        console.log(error)   
    }
}
const actualizarCliente = async(id, datos) => {
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: "PUT",
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        await respuesta.json()
    } catch (error) {
        console.log(error)   
    }
}
const eliminarCliente = async(id) => {
    try {
        await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: "DELETE",
        })
    } catch (error) {
        console.log(error)   
    }
}

export {
    obtenerClientes,
    obtenerCliente,
    agregarClientes,
    actualizarCliente,
    eliminarCliente
}