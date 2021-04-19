import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import collectionOverviewContainer from '../../components/collections-overview/collections-overview.component';
import CollectionPageContainer from '../collections/collection.container';

import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";

class ShopPage extends Component { 

  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }
  render() {
    const { match } = this.props;
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
  }

};

const mapDisptachToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})
export default connect(null,mapDisptachToProps)(ShopPage);