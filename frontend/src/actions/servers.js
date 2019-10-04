import axios from "axios";
import { GET_SERVERS, DELETE_SERVER, ADD_SERVER, GET_ERRORS } from "./types";
import { createMessage, returnErrors } from "./messages";

// GET SERVERS
export const getServers = () => dispatch => {
  axios
    .get("/api/servers")
    .then(response => {
      dispatch({
        type: GET_SERVERS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};

// DELETE SERVER
export const deleteServer = id => dispatch => {
  axios
    .delete(`/api/servers/${id}/`)
    .then(() => {
      dispatch(createMessage({ deleteServer: "Server Deleted" }));
      dispatch({
        type: DELETE_SERVER,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

// ADD SERVER
export const addServer = server => dispatch => {
  axios
    .post("/api/servers/", server)
    .then(response => {
      dispatch(createMessage({ addServer: "Server Added" }));
      dispatch({
        type: ADD_SERVER,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};
