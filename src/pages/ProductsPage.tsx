import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"
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
        <section className="content">
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