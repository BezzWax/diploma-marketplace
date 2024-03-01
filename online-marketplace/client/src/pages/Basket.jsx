import React, { useState, useEffect } from 'react';
import { fetchOneDevice } from '../http/deviceAPI';

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const basketData = JSON.parse(localStorage.getItem('basket')) || [];
        const deviceDataArray = await Promise.all(basketData.map(id => fetchOneDevice(id)));
        setBasketItems(deviceDataArray);
      } catch (error) {
        console.error('Error fetching basket data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Basket</h2>
      {basketItems.map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3>
          <p>Price: {item.price}</p>
          <p>Rating: {item.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default Basket;
