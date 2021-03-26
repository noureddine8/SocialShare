import * as ActionTypes from "../ActionTypes";
const initialState = { currentUser: null, posts: [], following: [] };

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
    case ActionTypes.USER_FOLLOWING_STATE_CHANGED:
      return { ...state, following: action.following };

    default:
      return state;
  }
};
export default user;
