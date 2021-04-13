import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionsPage from '../collections/collections.component';

import { updateCollections } from "../../redux/shop/shop.actions";

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionsPage);

class ShopPage extends Component { 
  state = {
    loading: true
  };

  unsubscribeFromSnapShot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');

    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionSnapshotToMap(snapshot);
      console.log(collectionsMap);
      updateCollections(collectionsMap);
      this.setState({ loading:false });
    });

  }
  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} render={(props)=><CollectionsOverviewWithSpinner isLoading={loading} {...props} /> } />
        <Route path={`${match.path}/:collectionId`} render={(props)=><CollectionPageWithSpinner isLoading={loading} {...props}/>} />
      </div>
    )
  }

};

const mapDisptachToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})
export default connect(null,mapDisptachToProps)(ShopPage);