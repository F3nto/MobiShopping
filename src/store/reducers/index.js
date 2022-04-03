import Data from './data'
import Cart from './cart'
import TotalQty from './qty'
import WishList from './wishList'
import Login from './login'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({ Data, Cart, TotalQty, WishList, Login})


export default rootReducer;