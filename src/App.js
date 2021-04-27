import { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SigninAndSignUpPage from './components/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from "./redux/user/user.actions";

import './App.css';

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); //closing the auth  connection susbcription
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
           <Route exact path='/' component={ HomePage } />
           <Route path='/shop' component={ ShopPage } />
           <Route exact path='/checkout' component={ CheckoutPage } />
           <Route exact path='/signin' 
            render={()=> this.props.currentUser? 
                    (<Redirect to='/' />) 
                    : 
                    ( <SigninAndSignUpPage />) 
                  }
            />
        </Switch>
      </div>
     );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDisptachToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(
  mapStateToProps,
  mapDisptachToProps
  )(App);
