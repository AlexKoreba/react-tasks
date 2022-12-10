import Product from "./Product";
import { products } from "../helpers/productsList";

const Products = () => {
    return ( 
        <div className="container">
            {/* <h1>{shopName}</h1> */}

            <table border={1}>
                <tr>
                    <th>Image</th>
                    <th>Product title</th>
                    <th>Price</th>
                    <th>Amount</th>
                </tr>

                    {products.map( product => {
                        return <Product key={product.id} img={product.img} title={product.title} price={product.price} amount={product.amount} />
                    })}

            </table>
        </div>
     );
}
 
export default Products;