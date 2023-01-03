import {useEffect, useState} from 'react';
import OrderAPI from '../apis/OrderAPI';
import OrderModal from './OrderModal';
import {Row} from 'react-bootstrap';
import './Orders.css';
import Order from './Order';
import OrderSearch from './OrderSeach';
function Orders(props) {
    const [orderList, setOrderList] = useState([])
    const [loading, setLoading] = useState(false)
    const [ordering, setOrdering] = useState(false)
    const [searchID, setSearchID] = useState('')
    const [totalOrders, setTotalOrders] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [totalPrices, setTotalPrices] = useState(0)

    function handleSearchIDChange(e){
        setSearchID(e)
        console.log(`searched for`, e);
        const orderAPI = new OrderAPI();
        orderAPI.getFilteredOrders(e)
        .then(res => {
            setOrderList(res.data)
        })
        .catch(err => {
            console.log('Error filtering orders', err)
        })
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
        setTotalOrders(fakeJSON.data.length);
        const sumItems = fakeJSON.data.reduce((accumulator, order) => {
            return accumulator + Number(order.quantity);
        }, 0);
        setTotalItems(sumItems);
        const sumPrices = fakeJSON.data.reduce((accumulator, order) => {
            return accumulator + Number(order.price);
        }, 0);
        setTotalPrices(sumPrices);
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
            <Row className='mb-5 justify-content-between'>
                <div className='order-search col-sm-6'>
                    {/* <input type="text" id="orderID" value={searchID} onChange={handleSearchIDChange} placeholder="Search by ID" /> */}
                    <OrderSearch onChange={handleSearchIDChange} />
                </div>
                <div className='col-sm-6'>
                    <OrderModal making={ordering} setParentItems={setOrderList} setMaking={setOrdering} title="New Order +" />
                </div>
            </Row>
            <Row className='mb-5 justify-content-between'>
                <div className='col-sm-6'>
                    {orderList.map(order => (
                        <Order 
                            key={order.id} 
                            id={order.id} 
                            date={order.date}
                            quantity={order.quantity}
                            price={order.price}
                        />
                    ))}
                    {/* <table className='orders-table'>
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
                    </table> */}
                </div>
                <div className='col-sm-6 border border-dark'>
                    <p>{totalItems} : Total Items</p>
                    <p>{totalOrders} : Total Orders</p>
                    <p className='mb-0'>{totalPrices.toLocaleString()} : Total Price</p>
                </div>
            </Row>
            
        </div>
        
    )
}
export default Orders;