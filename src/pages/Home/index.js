import React, { Component } from 'react'
import { MdShoppingCart } from 'react-icons/md'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { formatPrice } from '../../util/format'
import api from '../../services/api'

import * as CartActions from '../../store/modules/cart/actions'

import { ProductList } from './styles'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
    }
  }

  async componentDidMount() {
    const response = await api.get('products')

    const data = response.data.map((product) => ({
      ...product,
      priceFormated: formatPrice(product.price),
    }))

    this.setState({
      products: data,
    })
  }

  handleAddproduct = (id) => {
    const { addToCartRequest } = this.props

    addToCartRequest(id)
  }

  render() {
    const { products } = this.state
    const { amount } = this.props

    return (
      <ProductList>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.strong}</strong>
            <span>{product.priceFormated}</span>
            <button
              type="button"
              onClick={() => this.handleAddproduct(product.id)}
            >
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
