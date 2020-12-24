const initialState = {
    menu: [],
    loading: true,
    error: false,
    items: [],
    total: 0
}

const reducer = (state = initialState,action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {  ...state, menu: action.payload, loading: false}
        case 'MENU_REQUESTED':
            return { ...state, loading: true, error: false }
        case 'MENU_NOT_RECEIVED':
            return { ...state, loading: false, error: true }
        case 'ITEM_ADD_TO_CART':
            const id = action.payload
            // For those goods, which was already chosen
            const itemIndex = state.items.findIndex(item => item.id === id)
            if (itemIndex >= 0) {
                const itemInState = state.items.find(item => item.id === id)
                const newItem = {
                    ...itemInState,
                    quantity: ++itemInState.quantity
                }
                return {
                    ...state,
                    items: [
                        ...state.items.slice(0, itemIndex),
                        newItem,
                        ...state.items.slice(itemIndex + 1)
                    ],
                    total: state.total + newItem.price
                }
            }

            // For those goods, which was chosen for the first time
            const item = state.menu.find(item => item.id === id)
            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id,
                quantity: 1,
            }
            return {
                ...state,items: [...state.items, newItem], total: state.total + newItem.price
            }
        case 'ITEM_DELETE_FROM_CART':
            const index = action.payload
            const itemIndx = state.items.findIndex(item => item.id === index)
            const minusTotal = state.items[itemIndx].price * state.items[itemIndx].quantity
            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndx),
                    ...state.items.slice(itemIndx + 1)
                ],
                total: state.total - minusTotal
            }
        case 'EMPTY_CART':
            return {
                ...state, items: [], total: 0
            }
        default:
            return state
    }
} 

export default reducer