import {combineReducers} from 'redux';
import Content from './Services/Home/reducer';

export default combineReducers({
  home: Content,
});
