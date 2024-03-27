import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../../redux/slices/apiSlice";
const Protection = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.login);

  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(fetchData({ endpoint: "userinfo" }));
  }, [dispatch]);

  const is_active = data?.is_active;

  useEffect(() => {
    if (!token && !is_active) {
      navigate("/signin");
    }
  }, [token]);
  if (error)
  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex align-items-center  justify-content-center"
    >
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  if (loading)
    return (
      <div
        style={{ height: "100vh" }}
        className="d-flex align-items-center  justify-content-center"
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return token && is_active ? children : null;
};

export default Protection;
