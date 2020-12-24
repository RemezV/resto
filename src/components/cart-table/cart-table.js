import React from 'react'
import { connect } from 'react-redux'
import { deleteFromCart, emptyCart } from '../../actions'
import WithRestoService from '../hoc'
import './cart-table.scss'

const CartTable = ({items, deleteFromCart, RestoService, emptyCart}) => {
    if (items.length === 0) {
        return (<div className="cart__title"> Your cart is empty :( </div>)
    }
    return (
        <>
            <div className="cart__title">Your order:</div>
            <div className="cart__list">
                {
                    items.map(item => {
                        const { title, url, id, quantity, price } = item
                        return (
                            <div key={id} className="cart__item">
                                <img src={url} className="cart__item-img" alt={title}></img>
                                <div className="cart__item-title">{title}</div>
                                <div className="cart__item-price">{price * quantity}$</div>
                                <div className="cart__item-price">{quantity}</div>
                                <div className="cart__close" onClick={() => deleteFromCart(id)}>&times;</div>
                            </div>
                        )
                    })
                }
                <button className="menu__btn cart__confirm" onClick={() => {
                    RestoService.setOrder( generateOrder( items ) )
                    emptyCart()
                }}>Confirm</button>
            </div>
            
        </>
    )
}
const generateOrder = (items) => {
    const newOrder = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            quantity: item.quantity
        }
    })
    return newOrder
}
const mapStateToProps = ({items}) => {
    return {
        items
    }
}

const mapDispatchToProps = {
    deleteFromCart,
    emptyCart
}
 
export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable))