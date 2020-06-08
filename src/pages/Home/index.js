import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { MdShoppingCart } from 'react-icons/md'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { formatPrice } from '../../util/format'
import api from '../../services/api'

import * as CartActions from '../../store/modules/cart/actions'

import { ProductList } from './styles'

function Home({ amount, addToCartRequest }) {
  const [products, setProducts] = useState([])

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
    addToCartRequest(id)
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

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch)

const mapStateToProps = (state) => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount
    return amount
  }, {}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
