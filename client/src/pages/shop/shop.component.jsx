import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import collectionOverviewContainer from '../../components/collections-overview/collections-overview.component';
import CollectionPageContainer from '../collections/collection.container';

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

const ShopPage = ({ fetchCollectionsStart, match }) => { 
  useEffect(()=>{
    fetchCollectionsStart();
  },[fetchCollectionsStart]);
  return (
    <div className='shop-page'>
      <Route 
        exact path={`${match.path}`} 
        component={collectionOverviewContainer}/>
      <Route 
        path={`${match.path}/:collectionId`} 
        component={CollectionPageContainer} />
    </div>
  )
};

const mapDisptachToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})
export default connect(null,mapDisptachToProps)(ShopPage);