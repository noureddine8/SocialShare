import firebase from "firebase";
import { USER_STATE_CHANGED, USER_POSTS_STATE_CHANGED } from "../ActionTypes";

export const fetchUser = () => (dispatch) => {
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        dispatch({ type: USER_STATE_CHANGED, currentUser: snapshot.data() });
      } else {
        console.log("User not available, Please sign in");
      }
    });
};

export const fetchUserPosts = () => (dispatch) => {
  firebase
    .firestore()
    .collection("posts")
    .doc(firebase.auth().currentUser.uid)
    .collection("userPosts")
    .orderBy("creation", "asc")
    .get()
    .then((snapshot) => {
      let posts = snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data };
      });
      dispatch({ type: USER_POSTS_STATE_CHANGED, posts });
    });
};
