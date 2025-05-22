import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { authReducer } from "./reducer/authReducer";

const perstConfig = {
  key: "root",
  version: 1,
  storage,
};

const root = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(perstConfig, root);
export default persistedReducer;
