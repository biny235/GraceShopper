import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  editOrder,
  createOrUpdateProduct,
  createOrUpdateUser,
  showUsers
} from './store';
import ProductForm from './ProductForm';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
      productId: null,
      users: []
    };
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.hide = this.hide.bind(this);
    this.makeAdmin = this.makeAdmin.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { history, user } = nextProps;
    if (!user.admin) history.push('/');
  }
  componentWillMount() {
    this.props.showUsers();
  }

  onChange(order) {
    order.shipped = !order.shipped;
    this.props.editOrder(order);
  }
  makeAdmin(user) {
    user.admin = !user.admin;
    this.props.createOrUpdateUser(user);
  }
  onClick(productId) {
    this.setState({ showForm: true, productId: productId });
  }
  hide() {
    this.setState({ showForm: false });
  }

  render() {
    const {
      orders,
      categories,
      products,
      user,
      users,
      createOrUpdateProduct,
      createOrUpdateUser,
      showUsers
    } = this.props;
    const { onChange, onClick, hide, makeAdmin } = this;
    const { showForm, productId } = this.state;

    return !user.admin ? null : (
      <div>
        <h1>Users</h1>
        {users &&
          users.map(user => {
            return (
              <div key={user.id}>
                <strong>{user.name}</strong>
                {'  '} <Link to="#">{user.email}</Link>
                <div>
                  <label className="switch">
                    <input
                      checked={user.admin}
                      type="checkbox"
                      datatype="toggle"
                      onChange={() => makeAdmin(user)}
                    />
                    <span className="slider" />
                  </label>
                </div>
              </div>
            );
          })}

        <h1>All Orders</h1>
        <div>
          <h3>Order ID</h3>
        </div>
        {orders.length &&
          orders.map(order => (
            <div key={order.id}>
              <Link to={`/orders/${order.id}`}> {order.id}</Link>
              <div>
                <label className="switch">
                  <input
                    checked={order.shipped}
                    type="checkbox"
                    datatype="toggle"
                    onChange={() => onChange(order)}
                  />
                  <span className="slider" />
                </label>
              </div>
            </div>
          ))}
        <h1>Products By Category</h1>
        {categories.map(category => {
          return (
            <div key={category.id}>
              <h2>{category.name}</h2>
              {products.map(product => {
                if (product.categoryId === category.id) {
                  return (
                    <button
                      key={product.id}
                      onClick={() => onClick(product.id)}
                    >
                      {product.name}
                    </button>
                  );
                }
              })}
            </div>
          );
        })}
        <br />
        {showForm && <strong onClick={hide}>hide</strong>}
        {showForm && <ProductForm productId={productId} />}
        <br />
        <div>
          <button onClick={() => onClick(null)}>Add New Product</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, orders, products, categories, users }) => {
  return {
    user,
    orders,
    categories,
    products,
    users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editOrder: order => {
      dispatch(editOrder(order));
    },
    showUsers: () => {
      dispatch(showUsers());
    },
    createOrUpdateUser: user => {
      dispatch(createOrUpdateUser(user));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);