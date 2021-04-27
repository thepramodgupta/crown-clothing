import { takeLatest, call, put, all } from "redux-saga/effects";

import { firestore, convertCollectionSnapshotToMap } from "../../firebase/firebase.utils";

import { 
    fetchCollectionSuccess,
    fetchCollectionsFailure
 } from "./shop.actions";

import ShopActionTypes from './shop.types';

export function* fetchCollectionAsync() {
    yield console.log('I am fired');

    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionSnapshotToMap,snapshot);
        yield put(fetchCollectionSuccess(collectionsMap));
    }catch(error) {
        yield put(fetchCollectionsFailure(error.message))
    }
}

export function* fetchCollectionStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionAsync
    );
}

export function* shopSagas() {
    yield all([call(fetchCollectionStart)])
}