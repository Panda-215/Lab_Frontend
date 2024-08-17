import React, { useState } from 'react';

import {useEffect} from 'react';
import Product from './Product';
import AddForm from './Product/AddForm';
import axios from 'axios';

let currentProductId = 9;

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function getProducts() {
            const products = await axios.get(
                'https://apimocha.com/pandalnwza/products'
            );
            setProducts(products.data);
        }

        getProducts();
    }, []); // Put the empty array to make sure that the hook is executed only once

    function addProduct(product) {
        const newProduct = { id: ++currentProductId, ...product };
        setProducts([...products, newProduct]);
    }

 
    return (
        <>
            <h1>New Products</h1>
            {
                products.length > 0 ? (
                    <ul className="Home__products">
                        {products.map((product) => (
                            <Product key={product.id} item={product} />
                        ))}
                    </ul>
                ) : (
                    <div>Loading products....</div>
                )
            }
            <AddForm addProduct={addProduct} />
        </>
    );
}