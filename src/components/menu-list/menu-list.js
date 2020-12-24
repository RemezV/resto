import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import {connect} from 'react-redux'
import WithRestoService from '../hoc'
import { menuLoaded, menuRequested, menuNotReceived, addedToCart, deleteFromCart } from '../../actions'
import './menu-list.scss';
import Spinner from '../spinner'
import Error from '../error'

class MenuList extends Component {
    componentDidMount() {

        const { RestoService, menuRequested, menuNotReceived } = this.props
        menuRequested()
        
        RestoService.getMenu()
            .then(res => this.props.menuLoaded(res))
            .catch(() => menuNotReceived())
    }
    render() {
        const {menuItems, loading, error, addedToCart} = this.props
        if (loading) return <Spinner/>
        if (error) return <Error/>
        return (
            <ul className="menu__list">
                {
                    menuItems.map(menuItem => {
                        return <MenuListItem 
                                    key={menuItem.id} 
                                    menuItem={menuItem}
                                    onAddToCart={() => addedToCart(menuItem.id)}
                                />
                    })
                }
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = {
    menuLoaded,
    menuRequested,
    menuNotReceived,
    addedToCart
}


export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList))