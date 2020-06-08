import React, { useState, useEffect } from 'react'
import { MdShoppingCart } from 'react-icons/md'

import { useDispatch, useSelector } from 'react-redux'
import { formatPrice } from '../../util/format'
import api from '../../services/api'

import * as CartActions from '../../store/modules/cart/actions'

import { ProductList } from './styles'

export default function Home() {
  const [products, setProducts] = useState([])
  const amount = useSelector((state) =>
    state.cart.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount
      return sumAmount
    }, {})
  )

  const dispatch = useDispatch()

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('products')

      const data = response.data.map((product) => ({
        ...product,
        priceFormated: formatPrice(product.price),
      }))

      setProducts(data)
    }

    loadProducts()
  }, [])

  function handleAddproduct(id) {
    dispatch(CartActions.addToCartRequest(id))
  }

  return (
    <ProductList>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.strong}</strong>
          <span>{product.priceFormated}</span>
          <button type="button" onClick={() => handleAddproduct(product.id)}>
            <div>
              <MdShoppingCart /> {amount[product.id] || 0}
            </div>
            <span>Adicionar ao carrinho</span>
          </button>
        </li>
      ))}
    </ProductList>
  )
}
