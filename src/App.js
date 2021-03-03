import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { auth } from './firebase/firebase.utils';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SigninAndSignUpPage from './components/sign-in-and-sign-up/sign-in-and-sign-up.component';
import './App.css';

class App extends Component {
  constructor() {
    super();
    
    this.state =  {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user =>{
      this.setState({currentUser: user});

      console.log(user);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); //closing the auth  connection susbcription
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
           <Route exact path='/' component={ HomePage } />
           <Route path='/shop' component={ ShopPage } />
           <Route path='/signin' component={ SigninAndSignUpPage } />
        </Switch>
      </div>
     );
  }
}

export default App;
