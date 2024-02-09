import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware  from 'redux-thunk';
import rootReducer from '../reducers';
import { loadUpvote, saveUpvote, loadHide, saveHide } from './localStorage'

export default function configureStore() {
    let upvote = loadUpvote();
    let hide = loadHide();
    const persistedState = {
        ...upvote,
        ...hide
    }
    
    const store = createStore(
        rootReducer,
        persistedState,
        compose(
            applyMiddleware(thunkMiddleware)
        )
    );
    store.subscribe(() => {
        let  upvote = store.getState().upvote;
        saveUpvote({
            upvote: upvote
        });
    });
    store.subscribe(() => {
        let  hide = store.getState().hide;
        saveHide({
            hide: hide
        });
    });
    return store;
}