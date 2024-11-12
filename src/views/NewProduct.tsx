import { ActionFunctionArgs, Form, Link, useActionData } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";


export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())

  let error = ''
  if (Object.values(data).includes('')) {
    error = 'Todos los campos son obligatorios'
  }

  if (error.length) {
    return error
  }

  return {}
}

export default function NewProduct() {

  const error = useActionData() as string

  console.log(error)
  return (
    <>

      <div className="flex justify-between ">
        <h2 className="text-4xl font-black text-sky-600">Registrar Producto</h2>

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
          />
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-500 hover:bg-indigo-700 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>

    </>
  )
}
