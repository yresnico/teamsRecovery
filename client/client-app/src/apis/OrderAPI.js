import axios from 'axios';
class OrderAPI{
    constructor(){
        this.destination = 'http://localhost:3100/api/v1/private/orders';
    }
    
    getAllOrders() {
        return axios.get(this.destination + `userorders`, {withCredentials: true});
    }

    getFilteredOrders(id) {
        return axios.get(this.destination + `searchorders/${id}`, {withCredentials: true});
    }

    makeOrder(quantity) {
        return axios.post(this.destination + `userorders`, {quantity}, {withCredentials: true})
    }
}
export default OrderAPI;