import { useEffect, useState } from "react";

function OrderSearch(props) {
    const onChange = props.onChange;
    const [inputTimeOut, setInputTimeout] = useState(null)
    useEffect(() => () => clearTimeout(inputTimeOut), [inputTimeOut])
    function onInputChange(value) {
        if(inputTimeOut) {
            clearTimeout(inputTimeOut);
        }
        setInputTimeout(
            setTimeout(() => {
            if(onChange) {
                onChange(value)
                }
            }, 1000)
        )
    }

    return (
        <input onChange={e => onInputChange(e.target.value)} 
            type="text" 
            id="orderID"
            placeholder="Filter orders"
        />
    )
}

export default OrderSearch;