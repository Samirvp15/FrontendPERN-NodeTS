import { Link, useLoaderData } from "react-router-dom";
import { getProducts } from "../services/ProductService";
import ProductDetails from "../components/ProductDetails";
import { Product } from "../types";


export async function loader() {

  const products = await getProducts()
  return products
}


export default function Products() {

  const products = useLoaderData() as Product[]


  return (
    <>

      <div className="flex justify-between ">
        <h2 className="text-4xl font-black text-sky-600">Productos</h2>

        <Link
          to={'/productos/nuevo'}
          className='rounded-md bg-indigo-500 text-sm p-3 font-bold text-white shadow-sm hover:bg-indigo-700'
        >
          Agregar Producto
        </Link>

      </div>


      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-sky-600 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <ProductDetails

                key={product.id}
                product={product}

              />
            ))}
          </tbody>
        </table>
      </div>


    </>
  )
}
