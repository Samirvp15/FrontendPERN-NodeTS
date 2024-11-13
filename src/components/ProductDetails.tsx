import { Link } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"


type ProductDetailsProps = {

    product: Product
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
                        className="bg-orange-400 text-white rounded-lg w-full font-bold text-xs p-2 text-center"
                       
                    >Editar</Link>
                </div>
            </td>
        </tr>
    )
}
