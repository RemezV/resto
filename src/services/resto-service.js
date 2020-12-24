export default class RestoService {
    _apiBase = 'http://localhost:3000'

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`)
        if (!res.ok) {
            throw new Error(`Server Error`)
        }
        return await res.json()
    }
    async getMenu() {
        return await this.getResource('/menu/')
    }
    async getItem(id) {
        const res = await this.getResource('/menu/')
        const item = res.find( (element) => {
            return element.id === +id
        })
        return item
    }
    async setOrder(order) {
        const number = await this.getOrderNumber()
        const newOrder = {
            id: number,
            order: order
        }
        const res = await fetch(`${this._apiBase}/orders`, {
            method: 'POST',
            body: JSON.stringify(newOrder),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!res.ok) {
            throw new Error(`Server Error`)
        }
    }
    async getOrderNumber() {
        const res = await this.getResource('/orders/')
        const orderNumber = res.length + 1
        return orderNumber
    }
}