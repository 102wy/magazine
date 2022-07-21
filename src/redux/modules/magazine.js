// magazine.js
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
const LOAD = "magazine/LOAD";
const UPDATE = "magazine/UPDATE";
const DELETE = "magazine/DELETE";

const initialState = {
  post: [],
};
// Action Creators

export function loadMagazine(magazine) {
  return { type: LOAD, magazine };
}
export function addMagazine(magazine_list) {
  return { type: addDoc, magazine_list };
}
export function deleteMagazine(magazine_id) {
  return { type: DELETE, magazine_id };
}
export function updateMagazine(magazine_id, magazine_list) {
  return { type: UPDATE, magazine_id, magazine_list };
}

// Middlewares

export const loadMagazineFB = () => {
  return async function (dispatch) {
    const magazine_data = await getDocs(collection(db, "post"));

    let magazine = [];
    magazine_data.forEach((item) => {
      magazine.push({ ...item.data(), id: item.id });
    });
    dispatch(loadMagazine(magazine));
  };
};
export const addMagazineFB = (magazine_list) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "post"), magazine_list);
    const _magazine = await getDoc(docRef);
    const magazine = { ..._magazine.data(), id: _magazine.id };

    dispatch(addMagazine(magazine_list));
  };
};
export const deleteMagazineFB = (magazine_id) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "post", magazine_id);
    await deleteDoc(docRef);
  };
};
export const updateMagazineFB = (magazine_id, magazine_list) => {
  return async function (dispatch, getState) {
    console.log(magazine_id, magazine_list);
    const docRef = doc(db, "post", magazine_id);
    await updateDoc(docRef, {
      img_url: magazine_list[0].img_url,
      text: magazine_list[0].text,
      layout: magazine_list[0].layout,
      time: magazine_list[0].time,
      user: magazine_list[0].user[0],
    });
    const _magazine = getState().magazine.post;
    const magazine_index = _magazine.findIndex(
      (item) => item.id == magazine_id.id
    );
    dispatch(updateMagazine(magazine_index, magazine_list));
  };
};
// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "magazine/LOAD": {
      return { post: action.magazine };
    }
    case "magazine/ADD": {
      const new_magazine = [...state.post, action.magazine];
      return { post: new_magazine };
    }
    case "magazine/DELETE": {
      const new_magazine = state.post.filter(
        (item, idx) => action.magazine_id != idx
      );
      return { post: new_magazine };
    }
    case "magazine/UPDATE": {
      const new_magazine = state.post.map((item, index) => {
        const magazine_list = action.magazine_list;
        console.log(magazine_list);
        if (action.magazine_id == index) {
          return { ...magazine_list };
        } else {
          return item;
        }
      });
      return { post: new_magazine };
    }
    default:
      return state;
  }
}
