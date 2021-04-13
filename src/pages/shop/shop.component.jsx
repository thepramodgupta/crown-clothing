import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionsPage from '../collections/collections.component';

import { updateCollections } from "../../redux/shop/shop.actions";

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';


class ShopPage extends Component { 

  unsubscribeFromSnapShot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');
    collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionSnapshotToMap(snapshot);
      console.log(collectionsMap);
      updateCollections(collectionsMap);
    })

  }
  render() {
    const { match } = this.props;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionsPage} />
      </div>
    )
  }

};

const mapDisptachToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})
export default connect(null,mapDisptachToProps)(ShopPage);