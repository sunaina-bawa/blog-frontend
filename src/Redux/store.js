import { reducer as authReducer } from './reducer';
import { legacy_createStore ,combineReducers} from 'redux';
const rootReducer=combineReducers({
     authReducer
})
export const store=legacy_createStore(rootReducer)
