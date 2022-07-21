// user.js
import { db } from "../../shared/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Actions
const LOAD = "user/LOAD";

const initalState = {
  users: [],
};

// Action Creators
export function loadUser(user) {
  return { type: LOAD, user };
}

// Middlewares
export const loadUserFB = () => {
  return async function (dispatch) {
    const user_data = await getDocs(collection(db, "users"));

    let user = [];
    user_data.forEach((item) => user.push({ ...item.data(), id: item.id }));
    dispatch(loadUser(user));
  };
};

// Reducer
export default function reducer(state = initalState, action = {}) {
  switch (action.type) {
    case "user/LOAD": {
      return { users: action.user };
    }
    default:
      return state;
  }
}
