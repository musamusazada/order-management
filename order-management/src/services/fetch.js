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
      success("Orders Data Fetched!");
      setMethod(data);
    })
    .catch((err) => error("Something went wrong"));
};
