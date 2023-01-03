import axios from 'axios';
class OrderAPI{
    constructor(){
        this.destination = 'http://localhost:3100/';
    }
    
    getAllOrders() {
        return axios.get(this.destination + `userorders`, {withCredentials: true});
    }

    getFilteredOrders(id) {
        return axios.get(this.destination + `getorders?filter=${id}`, {withCredentials: true});
    }

    makeOrder(quantity) {
        return axios.post(this.destination + `addorder`, {quantity}, {withCredentials: true})
    }
}
export default OrderAPI;