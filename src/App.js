import React, { useEffect, useState } from "react";
import ListTypes from "./ListTypes";
import { Routes, Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import "./css/App.css";
import Login from "./Login";
import ListReqs from "./ListReqs";
import ListTests from "./ListTests";
import {Link, useParams} from "react-router-dom";
import Header from "./Header";
import ListType from "./ListType";
import ListReq from "./ListReq";
import ListTest from "./ListTest";

function App({ apiUrl, access_token, loggedIn, dispatch }) {
  return (
    <>
      <Header/>
        <body>
        </body>
      <div className="App">
        <Routes>
          <Route
            path="*"
            element={
              <main style={{ padding: "10rem", fontSize: "100px" }}>
                <p>Error 404 page not found.</p>
              </main>
            }>
          </Route>
          <Route
            path="/"
            element={
              loggedIn ? <Navigate to="/projects" /> : <Navigate to="/login" />
            }>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/projects" element={<ListTypes />} />
          <Route path="/projects/update/:id" element={<ListType />} />
          <Route path="/projects/create" element={<ListType />} />
          <Route path="/requirements/create" element={<ListReq />} />
          <Route path="/requirements/update/:id" element={<ListReq />} />
          <Route path="/test/create" element={<ListTest />} />
          <Route path="/test/update/:id" element={<ListTest />} />
          <Route path="/projects/:id/requirements" element={<ListReqs />} />
          <Route path="/projects/:id/requirements/:id2/tests" element={<ListTests />} />
        </Routes>
      </div>
    </>
  );
}

const mapStateToProps = (store) => {
  const { apiUrl, access_token, loggedIn } = store;
  return { apiUrl, access_token, loggedIn };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  // const { flight_number } = ownProps;
  return {
    dispatch,
    // favouriteAdd: () =>
    //   dispatch({
    //     type: FAVOURITE_ADD,
    //     payload: { id: flight_number, favourited: true },
    //   }),
    // favouriteRemove: () =>
    //   dispatch({
    //     type: FAVOURITE_REMOVE,
    //     payload: { id: flight_number, favourited: false },
    //   }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
