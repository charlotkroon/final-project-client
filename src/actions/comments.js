import request from "superagent";

export const ALL_COMMENTS = "ALL_COMMENTS";
export const NEW_COMMENT = "NEW_COMMENT";

const baseUrl = "http://localhost:4000";

function allComments(payload) {
  return {
    type: ALL_COMMENTS,
    payload
  };
}

function newComment(payload) {
  return {
    type: NEW_COMMENT,
    payload
  };
}

// //GET ALL COMMENTS
// export const getComments = ticketId => dispatch => {
//   request(`${baseUrl}/comments/${ticketId}`)
//     .then(res => {
//       const action = allComments(res.body);

//       dispatch(action);
//     })
//     .catch(console.error);
// };

export const getComments = () => (dispatch, getState) => {
  const state = getState();
  const { events } = state;
  if (!events.length) {
    request(`${baseUrl}/comments`)
      .then(response => {
        const action = allComments(response.body);

        dispatch(action);
      })
      .catch(console.error);
  }
};

// //CREATE NEW COMMENT
// export const createComment = (data, ticketId) => (dispatch, getState) => {
//   const state = getState();
//   request
//     .post(`${baseUrl}/comments/${ticketId}`)
//     .set("Authorization", `Bearer ${state.loggedInUser.jwt}`)
//     .send(data, ticketId)
//     .then(res => {
//       const comment = res.body;
//       const action = newComment(comment);
//       dispatch(action);
//     })
//     .catch(console.error);
// };

export const createComment = data => (dispatch, getState) => {
  const state = getState();
  console.log("Is the state here?", state.loggedInUser.jwt);
  request
    .post(`${baseUrl}/comment`)
    .set("Authorization", `Bearer ${state.loggedInUser.jwt}`)
    .send(data)
    .then(response => {
      const event = response.body;
      const action = createComment(event);
      dispatch(action);
    })
    .catch(console.error);
};
