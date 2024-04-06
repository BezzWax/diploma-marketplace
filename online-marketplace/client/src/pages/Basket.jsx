import React, { useState, useEffect } from 'react';
import { fetchOneDevice } from '../http/deviceAPI';
import { Button } from 'react-bootstrap';
import EmptyBasket from '../../src/components/modals/EmptyBasket';

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);
  const [showEmptyBasket, setShowEmptyBasket] = useState(false);

  const handleCloseEmptyBasket = () => setShowEmptyBasket(false);

  const DeleteBasket = () => {
    const basketData = JSON.parse(localStorage.getItem('basket')) || [];

    if(basketData.length === 0) {
      setShowEmptyBasket(true);
    } else {
      localStorage.removeItem('basket');
      setBasketItems([]);
    }
  }

  const deleteItemFromBasket = (index) => {
    const basketData = JSON.parse(localStorage.getItem('basket')) || [];
    basketData.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(basketData));
    const updatedBasketItems = JSON.parse(localStorage.getItem('basket')) || [];
    setBasketItems(updatedBasketItems);
  };
  
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
    <div className='p-4'>
      <h2 className='p-3'>Basket</h2>
      {basketItems.map((item, index) => (
        <div className='p-3' key={index}>
          <h3>{item.name}</h3>
          <p>Price: {item.price}</p>
          <p>Rating: {item.rating}</p>
          <Button 
            onClick={() => deleteItemFromBasket(index)}
            variant='danger'
          > 
            Delete 
          </Button>
          <hr />
        </div>
      ))}
      <Button onClick={DeleteBasket} > Clear basket </Button>
      {showEmptyBasket && <EmptyBasket handleClose={handleCloseEmptyBasket} />}
    </div>
  );
};

export default Basket;
