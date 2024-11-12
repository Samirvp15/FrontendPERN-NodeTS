import { Link } from "react-router-dom";


export default function NewProduct() {
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


    </>
  )
}
