import { message } from "antd";

const error = (msg) => {
  message.error(msg);
};
const success = (msg) => {
  message.success(msg);
};
export const fetchOrders = (setMethod) => {
  fetch(`${import.meta.env.VITE_BASE_API}/orders`)
    .then((res) => res.json())
    .then((data) => {
      setMethod(data);
    })
    .catch((err) => error("Something went wrong"));
};

export const fetchTables = (setMethod) => {
  fetch(`${import.meta.env.VITE_BASE_API}/tables`)
    .then((res) => res.json())
    .then((data) => {
      setMethod(data);
    })
    .catch((err) => error("Something went wrong"));
};

export const fetchWaiters = (setMethod) => {
  fetch(`${import.meta.env.VITE_BASE_API}/waiters`)
    .then((res) => res.json())
    .then((data) => {
      setMethod(data);
    })
    .catch((err) => error("Something went wrong"));
};

export const fetchFoods = (setMethod) => {
  fetch(`${import.meta.env.VITE_BASE_API}/foods`)
    .then((res) => res.json())
    .then((data) => {
      setMethod(data);
    })
    .catch((err) => error("Something went wrong"));
};
