import React, { useState, useEffect } from 'react';
import { fetchOneDevice } from '../http/deviceAPI';
import { Button } from 'react-bootstrap';
import EmptyBasket from '../../src/components/modals/EmptyBasket';
import BuyingModal from '../components/modals/BuyingModal';

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);
  const [showEmptyBasket, setShowEmptyBasket] = useState(false);
  const [showBuyingModal, setBuyingModal] = useState(false);

  const handleCloseEmptyBasket = () => setShowEmptyBasket(false);

  const handleShowBuyingModal = () => setBuyingModal(true);
  

  const DeleteBasket = () => {
    const basketData = JSON.parse(localStorage.getItem('basket')) || [];
    CountTotalPrice()
    if(basketData.length === 0) {
      setShowEmptyBasket(true);
    } else {
      // localStorage.removeItem('basket');
      // setBasketItems([]);
    }
  }

  const BuyAll = () => {
    const basketData = JSON.parse(localStorage.getItem('basket'));

    if(basketData.length > 0) {
      setBuyingModal(true);
      localStorage.removeItem('basket');
      setBasketItems([]);
    }
  }

  const CountTotalPrice = () => {
    let sum = 0;
    basketItems.map((itemPrice) => {
      sum += itemPrice.price;
    })
    return sum;
  }

  const buyOneItem = (index) => {
    const basketData = JSON.parse(localStorage.getItem('basket')) || [];
    basketData.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(basketData));
    const updatedBasketItems = JSON.parse(localStorage.getItem('basket')) || [];
    setBasketItems(updatedBasketItems);
    handleShowBuyingModal();
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
            className='m-2 p-2'
            onClick={() => deleteItemFromBasket(index)}
            variant='danger'
          > 
            Delete 
          </Button>
          <Button
            className='m-2 p-2' 
            variant='success'
            onClick={buyOneItem}
          >
            Buy
          </Button>
          <hr />
        </div>
      ))}
      <Button className='ml-5' onClick={DeleteBasket} > Clear basket </Button> <br />
      <label className='mr-5'>Total price: {CountTotalPrice()} ₴</label>
      <Button onClick={BuyAll}> Buy all </Button>
      {showEmptyBasket && <EmptyBasket handleClose={handleCloseEmptyBasket} />}
      {showBuyingModal && <BuyingModal handleClose={() => setBuyingModal(false)} />}
    </div>
  );
};

export default Basket;
