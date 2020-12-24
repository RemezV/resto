const menuLoaded = (newMenu) => {
    return {
        type: 'MENU_LOADED',
        payload: newMenu
    }
}
const menuRequested = () => {
    return {
        type: 'MENU_REQUESTED'
    }
}
const menuNotReceived = () => {
    return {
        type: 'MENU_NOT_RECEIVED'
    }
}
const addedToCart = (id) => {
    return {
        type: 'ITEM_ADD_TO_CART',
        payload: id
    }
}
const deleteFromCart = (id) => {
    return {
        type: 'ITEM_DELETE_FROM_CART',
        payload: id
    }
}
const emptyCart = () => {
    return {
        type: 'EMPTY_CART'
    }
}

export {
    menuLoaded,
    menuRequested,
    menuNotReceived,
    addedToCart,
    deleteFromCart,
    emptyCart
}