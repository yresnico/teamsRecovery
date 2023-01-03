import { useState } from "react";
import OrderAPI from "../apis/OrderAPI";
import './OrderModal.css';
function OrderModal(props) {
    const [items, setItems] = useState(0);

    function getDisplayDate() {
        const monthMap = new Map([
            [0, 'January'],[1, 'February'], [2, 'March'], [3, 'April'], [4, 'May'], [5, 'June'], [6, 'July'], [7, 'August'],
            [8, 'September'], [9, 'October'], [10, 'November'], [12, 'December']
        ])
        const today = new Date();
        return `${monthMap.get(today.getMonth())} ${today.getDate()}, ${today.getFullYear()}`
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
    function handleClose() {
        props.setMaking(false);
    }
    if(props.making) {
        return (
            <div className="order-modal-form" style={{zIndex: '3'}} onClick={handleClose}>
                <div className="order-modal-content" onClick={e => {e.stopPropagation()}}>
                    <div className="order-modal-title"><h2>New Order</h2></div>

                    <div className="item-num mt-5">
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
                    <div className="date mb-5">
                        <output>Date: {getDisplayDate()}</output>
                    </div>
                    <div className="mb-2">
                        <button type="button" onClick={() => makeOrder()}>Place Order</button>
                    </div>
                </div>
            </div>
        )
    }

    return <button type="button" onClick={()=> props.setMaking(true)}>{props.title}</button>;
}
export default OrderModal;