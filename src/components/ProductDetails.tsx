import { ActionFunctionArgs, Form, Link, redirect } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"


type ProductDetailsProps = {

    product: Product
}

export async function action({ params }: ActionFunctionArgs) {

    if (params.id !== undefined) {
        await deleteProduct(+params.id)
    }
    return redirect('/')
}

export default function ProductDetails({ product }: ProductDetailsProps) {

    const isAvailable = product.availability

    return (

        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {isAvailable ? 'Disponible' : 'No Disponible'}
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <Link
                        to={`/productos/${product.id}/editar`}
                        className="bg-orange-500 text-white rounded-lg w-full font-bold text-xs p-2 text-center"

                    >Editar</Link>
                    <Form
                        className="w-full"
                        method="POST"
                        action={`/productos/${product.id}/eliminar`}
                        onSubmit={(e) => {
                            if (!confirm('¿Desea eliminar el producto?')) {
                                e.preventDefault()
                            }
                        }}
                    >
                        <input
                            type="submit"
                            value='Eliminar'
                            className="bg-red-500 text-white rounded-lg w-full font-bold text-xs p-2 text-center"
                        />
                    </Form>
                </div>
            </td>
        </tr>
    )
}
