import { useState } from "react";
import OrderAPI from "../apis/OrderAPI";
import './OrderModal.css';
function OrderModal(props) {
    const [items, setItems] = useState(0);

    function getDisplayDate() {
        const today = new Date();
        return `${today.getMonth() + 1} ${today.getDate()}, ${today.getFullYear()}`
    }

    function handleChangeItems(e) {
        if(validateInteger(Number(e.target.value))) {
            setItems(Number(e.target.value))
        }
    }

    function validateInteger(number) {
        if(Number.isInteger(number) && number > 0){
            return true;
        }
        return false;
    }

    function makeOrder() {
        const orderAPI = new OrderAPI();
        orderAPI.makeOrder(items)
            .then(orderAPI.getAllOrders()
                .then(res => {
                    props.setParentItems(res.data);
                })
                .catch(err => {
                    console.log('Error retrieving orders', err);
                }))
            .catch(err => {
                console.log('Error making order', err);
            })
        props.setMaking(false);
    }

    if(props.making) {
        return (
            <div className="order-modal-form">
                <div className="order-modal-content">
                    <div className="order-modal-title"><h2>New Order</h2></div>

                    <div className="item-num">
                        <label htmlFor="itemNum">Total Items</label>
                        <input 
                            type="number" 
                            id="itemNum" 
                            value={items} 
                            onChange={handleChangeItems} 
                            placeholder="Between 1-10"
                        />
                    </div>
                    <div className="total-price">
                        <output>Subtotal: {(items * 2.78).toLocaleString()}</output>
                    </div>
                    <div className="date">
                        <output>Date: {getDisplayDate()}</output>
                    </div>
                    <div>
                        <button type="button" onClick={() => makeOrder()}>Place Order</button>
                    </div>
                </div>
            </div>
        )
    }

    return <button type="button" onClick={()=> props.setMaking(true)}>{props.title}</button>;
}
export default OrderModal;