import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orderData, setOrderData] = useState(null);

  const fetchMyOrder = async () => {
    try {
      const email = localStorage.getItem('userEmail');
      const response = await fetch('http://localhost:5000/api/auth/myOrderData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      setOrderData(result);
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  if (!orderData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          {orderData.orderData && orderData.orderData.order_data ? (
            orderData.orderData.order_data
              .slice(0)
              .reverse()
              .map((order, index) => (
                <div key={index} className="col-12">
                  <h4 className="mt-5">{new Date(order[0].Order_date).toLocaleDateString()}</h4>
                  <hr />
                  {order.map((item, itemIndex) => (
                    <div key={itemIndex} className="col-12 col-md-6 col-lg-3 mb-3">
                      <div className="card" style={{ width: '16rem', maxHeight: '360px' }}>
                        <img
                          src={item.img}
                          className="card-img-top"
                          alt={item.name}
                          style={{ height: '120px', objectFit: 'cover' }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <div className="container w-100 p-0">
                            <span className="m-1">{item.qty}</span>
                            <span className="m-1">{item.size}</span>
                            <div className="d-inline ms-2 h-100 w-20 fs-5">₹{item.price}/-</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
          ) : (
            <div className="text-center w-100 mt-5">No Orders Found</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
