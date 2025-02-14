import {
  CLEAR_ERRORS,
} from "../constants/UserConstant";
import axios from "axios";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
} from "../redux/userSlice/userSlice";
import {
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
} from "../redux/userSlice/userProfileSlice";
import {
  ALL_USERS_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
} from "../redux/userSlice/allUsersSlice";

export const login = (userData) => async (dispatch) => {
  try {
    dispatch(LOGIN_REQUEST());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      "http://localhost:4000/api/user/login",
      userData,
      config
    );

    console.log("data", data);

    dispatch(LOGIN_SUCCESS(data.user));
  } catch (error) {
    let errorMessage = "Something went wrong!";

    if (error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    } else if (error.request) {
      errorMessage = "No response received from the server.";
    } else {
      errorMessage = error.message || errorMessage;
    }

    console.log("Login error:", errorMessage);
    dispatch(LOGIN_FAIL({ message: errorMessage }));
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `http://localhost:4000/api/user/register`,
      userData,
      config
    );
  } catch (error) {
    dispatch({
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : "Registration failed",
    });
    console.log("This is error data", error.response.data.message);
  }
};


export const logout = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    await axios.post("http://localhost:4000/api/user/logout", config);

    console.log("Dispatching LOGOUT_SUCCESS...");
    dispatch(LOGOUT_SUCCESS());
  } catch (error) {
    console.error("Error dispatching logout action:", error);

    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response?.data?.message || "Logout failed",
    });
  }
};


export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.get(
      `http://localhost:4000/api/user/users`,
      config
    );

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};


export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `http://localhost:4000/api/user/user/${id}/update`,
      userData,
      config
    );
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
      message: "Error while getting update",
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

    const { data } = await axios.delete(`http://localhost:4000/api/user/user/${id}`, config);
    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
