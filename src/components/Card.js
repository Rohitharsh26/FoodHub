import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
    const data = useCart();
    const dispatch = useDispatchCart();
    const navigate = useNavigate();
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const priceRef = useRef(null);
    const options = props.options;
    const foodItem = props.item;

    // Handle click event if user is not logged in
    const handleClick = () => {
        if (!localStorage.getItem("token")) {
            navigate("/Login");
        }
    }

    // Handle quantity change
    const handleQty = (e) => {
        setQty(parseInt(e.target.value, 10));
    }

    // Handle size option change
    const handleOptions = (e) => {
        setSize(e.target.value);
    }

    // Handle adding item to cart
    const handleAddToCart = async () => {
        // Ensure foodItem is defined before accessing its properties
        if (foodItem && options && options[size] !== undefined) {
            let existingFood = data.find(item => item.id === foodItem._id);

            if (existingFood && existingFood.size === size) {
                await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty });
            } else {
                await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc });
            }
        }
    }

    // Calculate final price based on quantity and selected size
    let finalPrice = qty * parseInt(options && options[size] || 0);

    // Set initial size on component mount
    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    // Check if options is defined and is an object before using Object.keys()
    const priceOptions = options && typeof options === 'object' ? Object.keys(options) : [];

    return (
        <div>
            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                <img src={props.ImgSrc} className="card-img-top" alt="Food" style={{ height: "120px", objectFit: "cover" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodName}</h5>
                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                        <select className="m-2 h-100 w-20 bg-success text-black rounded" onClick={handleClick} onChange={handleQty}>
                            {Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                        <select className="m-2 h-100 w-20 bg-success text-black rounded" ref={priceRef} onClick={handleClick} onChange={handleOptions}>
                            {priceOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        <div className='d-inline ms-2 h-100 w-20 fs-5'>
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}
