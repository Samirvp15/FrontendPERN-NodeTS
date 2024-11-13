import { ActionFunctionArgs, Form, Link, LoaderFunctionArgs, redirect, useActionData, useLoaderData } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { getProductById, updateProduct } from "../services/ProductService";
import { Product } from "../types";


export async function loader({ params }: LoaderFunctionArgs) {

    if (params.id !== undefined) {
        const product = await getProductById(+params.id)
        if (!product) {
            //throw new Response('',{ status: 404, statusText: 'No encontrado'})
            return redirect('/')
        }
        return product
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

export default function EditProduct() {

    const error = useActionData() as string
    const product = useLoaderData() as Product

    return (
        <>

            <div className="flex justify-between ">
                <h2 className="text-4xl font-black text-sky-600">Editar Producto</h2>

                <Link
                    to={'/'}
                    className='rounded-md bg-indigo-500 text-sm p-3 font-bold text-white shadow-sm hover:bg-indigo-700'
                >
                    Volver Producto
                </Link>

            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form
                className="mt-10"
                method="POST"
                action=""
            >

                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="name"
                    >Nombre Producto:</label>
                    <input
                        id="name"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Nombre del Producto"
                        name="name"
                        defaultValue={product.name}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="price"
                    >Precio:</label>
                    <input
                        id="price"
                        type="number"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Precio Producto. ej. 200, 300"
                        name="price"
                        defaultValue={product.price}
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="availability"
                    >Disponibilidad:</label>
                    <select
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="availability"
                        defaultValue={product?.availability.toString()}
                    >
                        {availabilityOptions.map(option => (
                            <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>
                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-500 hover:bg-indigo-700 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Guardar cambios"
                />
            </Form>

        </>
    )
}
