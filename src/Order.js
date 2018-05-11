import React from 'react';
import { connect } from 'react-redux';
import LineItem from './LineItem';

const Order = ({ order, lineItems, total }) => {
  return (
    <div>
      <h3>{ order.status !== 'cart' ? `Order ID: ${order && order.id}` : null}</h3>
      
      <div className="order">
        <div>Item</div>
        <div>Price</div>
        <div>Qty</div>
        <div>Total</div>
        {lineItems &&
          lineItems.map(lineItem => (
            <LineItem key={lineItem.id} line={lineItem} />
          ))}
        <div className="order-total">Order Total</div>
        <div>$ {total}</div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user, orders, products }, { id, order }) => {
  order = order ||  orders && id && orders.find(order => order.id === id);
  const lineItems = order && order.lineItems;
  const total =
    lineItems &&
    lineItems.reduce((amounts, line) => {
      const product = products.find(_product => _product.id === line.productId);
      amounts += product.price * line.quantity;
      return amounts;
    }, 0);
  return { user, order, products, lineItems, total };
};

export default connect(mapStateToProps)(Order);
