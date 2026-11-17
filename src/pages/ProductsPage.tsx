import { useEffect, useState } from "react"
import { Link } from "react-router"
import { fetchProducts, type ApiProduct } from "../api/products.api"


function ProductsPage() {
    const [products, setProducts] = useState<ApiProduct[]>([])

    const loadProducts = async () => {
        const result = await fetchProducts()
        setProducts(result)
    }

    useEffect(() => {
        loadProducts()
    }, [])

    return (
        <section className="flex flex-col justify-center">
            {products.map(product => (
                <Link key={product.id} to={`/product/${product.id}`}>
                    <li>
                        {product.title}
                    </li>
                </Link>
            ))}
        </section>
    )
}

export default ProductsPage
