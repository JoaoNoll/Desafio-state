import React, { useState, useEffect } from 'react';
import api from '../../api';
export default () => {

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [product, setProduct] = useState([]);
    const [brand_uid, setBrand_uid] = useState('');

    async function handledeledeProduct(uid) {
        await api.delete(`/products/${uid}`).then(response => {

            setProduct(product.filter(product => product.uid !== uid));
        }).catch(error => console.log(error));
    }

    async function handleStoreProduct() {
        await api.post('/products', {
            name,
            quantity,
            brand_uid
        }).then((response) => setProduct([...product, response.data.product])).catch((error) => console.log(error))
        setName('');
        setQuantity('');
        setBrand_uid('');
    }
    useEffect(() => {
        api.get('/products').then((response) => setProduct(response.data.product)).catch((error) => console.log(error))
    }, []);
    return (
        <>
            <div>
                <h3> Cadastro de Produtos</h3>
                <label>
                    Nome:
                </label>
                <input value={name} onChange={e => setName(e.target.value)}></input>
                <br></br>
                <br></br>
                <label>
                    Quantidade:
                </label>

                <input value={quantity} onChange={e => setQuantity(e.target.value)}></input>
                <br>
                </br>
                <br></br>
                <label>
                    Marca:
                </label>
                <input value={brand_uid} onChange={e => setBrand_uid(e.target.value)}></input>
                <br></br>

                <button onClick={handleStoreProduct}>Cadastrar Produto</button>
                <div>
                    <ul>
                        {product.map((products) => <li key={product.uid}>{product.name} - <button onClick={e => handledeledeProduct(product.uid)}> Delete</button></li>)}
                    </ul>
                </div>


            </div>

        </>
    );
}