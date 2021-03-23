import * as ActionTypes from "../ActionTypes";
const initialState = { currentUser: null, posts: [] };

const user = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.USER_STATE_CHANGED:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case ActionTypes.USER_POSTS_STATE_CHANGED:
      return {
        ...state,
        posts: action.posts,
      };
    default:
      return state;
  }
};
export default user;
