// CartAmountToggle.js

import React from 'react'
import { FaMinus, FaPlus } from "react-icons/fa";
const CartAmountToggle = ({ amount, setDecrease, setIncrease }) => {
    return (
        // <div>CartAmountToggle</div>
        <div className="cart-button">
            <div className="amount-toggle">
                <button onClick={() => setDecrease()}>
                    <FaMinus />
                </button>
                <div className="amount-style">{amount}</div>
                <button onClick={() => setIncrease()}>
                    <FaPlus />
                </button>
            </div>
        </div>
    )
}

export default CartAmountToggle