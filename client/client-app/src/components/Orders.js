import {useEffect, useState} from 'react';
import OrderAPI from '../apis/OrderAPI';
import OrderModal from './OrderModal';
import './Orders.css';
function Orders(props) {
    const [orderList, setOrderList] = useState([])
    const [loading, setLoading] = useState(false)
    const [ordering, setOrdering] = useState(false)
    const [searchID, setSearchID] = useState('')

    function handleSearchIDChange(e){
        setSearchID(e.target.value)
    }
    
    // useEffect(() => {
    //     setLoading(true);
    //     const orderAPI = new OrderAPI();
    //     orderAPI.getAllOrders()
    //         .then(res => {
    //             setOrderList(res.data)
    //         })
    // }, [])

    useEffect(() => {
        setLoading(true);
        const fakeJSON = {data: [{"id": "1", "date": "January 3, 2022", "quantity" : "3", "price" : "8.34"}, {"id": "2", "date": "January 3, 2022", "quantity" : "3", "price" : "8.34"}]};
        setOrderList(fakeJSON.data)
        setLoading(false)
    }, [])

    if(loading){
        return (
            <h1>Loading</h1>
        )
    } 
    if(orderList.length < 1) {
        return (
            <div className='orders-container'>
                <h1>Orders</h1>
                <p>No orders found</p>
                <OrderModal making={ordering} setParentItems={setOrderList} setMaking={setOrdering} title="New Order +" />
            </div>
        )
    }
    return (
        <div className='orders-container'>
            <h1>Orders</h1>
            <div className='order-search'>
                <input type="text" id="orderID" value={searchID} onChange={handleSearchIDChange} placeholder="Search by ID" />
            </div>
            <table className='orders-table'>
                <thead>
                    <tr>
                        <th colSpan={4}>Orders</th>
                    </tr>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.date}</td>
                            <td>{order.quantity}</td>
                            <td>{order.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <OrderModal making={ordering} setParentItems={setOrderList} setMaking={setOrdering} title="New Order +" />
        </div>
        
    )
}
export default Orders;