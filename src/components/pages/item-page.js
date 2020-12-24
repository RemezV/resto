import React, {Component} from 'react';
import { connect } from 'react-redux';
import WithRestoService from '../hoc/';
import Spinner from '../spinner';
import {menuLoaded, menuRequested, menuNotReceived, addedToCart} from '../../actions';

import './itemPage.scss';

class ItemPage extends Component {

    componentDidMount() {
        if( this.props.menuItems.length === 0){
            this.props.menuRequested();

            const {RestoService} = this.props;
            RestoService.getMenu()
                .then(res => this.props.menuLoaded(res))
                .catch(() => this.props.menuNotReceived());
        }
    }

    render() {
        if(this.props.loading) {
            return (
                <div className = "item_page">
                    <Spinner/>
                </div>
            )
        }
        const item = this.props.menuItems.find(el => +el.id === +this.props.match.params.id)
        const{title, url, category, price, id} = item;

        return (
            <div className = "item_page">
                <div className="menu__item item_block">
                     <div className="menu__title">{title}</div>
                    <img className="menu__img" src={url} alt={title}></img>
                    <div className="menu__category">Category: <span>{category}</span></div>
                    <div className="menu__price">Price: <span>{price}$</span></div>
                    <button onClick={() => this.props.addedToCart(id)} className="menu__btn">Add to cart</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps =  (state) =>{
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

export default WithRestoService()( connect(mapStateToProps, mapDispatchToProps)(ItemPage) );