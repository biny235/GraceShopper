import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts, fetchCategories, authenticateUser } from './store';

import Nav from './Nav';
import Products from './Products';
import Product from './Product';
import Categories from './Categories';
import Category from './Category';
import User from './User';
import Order from './Order';
import Home from './Home';
import Cart from './Cart';
import LoginForm from './LoginForm';
import { Container } from 'reactstrap';

class Main extends Component {
  componentDidMount() {
    window.localStorage.getItem('token') && this.props.authenticateUser();
    this.props.fetchProducts();
    this.props.fetchCategories();
  }

  render() {
    return (
      <Router>
        <div>
          <Nav history={history} />
          <Container>
            <LoginForm />
            <Route path="/" exact render={() => <Home />} />
            <Switch>
              <Route path="/products" exact render={() => <Products />} />
              <Route
                path="/products/:id"
                exact
                render={({ match, history }) => <Product id={match.params.id * 1} history={history} />}
              />
              <Route path="/categories" exact render={() => <Categories />} />
              <Route
                path="/categories/:id"
                exact
                render={({ match }) => <Category id={match.params.id * 1} />}
              />
              <Route path="/cart" exact render={() => <Cart />} />
              <Route path="/orders" exact render={() => <Orders />} />
              <Route
                path="/orders/:id"
                exact
                render={({ match }) => <Orders id={match.params.id * 1} />}
              />
              <Route path="/user" exact render={() => <User />} />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchCategories: () => dispatch(fetchCategories()),
    authenticateUser: () => dispatch(authenticateUser)
  };
};

export default connect(null, mapDispatchToProps)(Main);
