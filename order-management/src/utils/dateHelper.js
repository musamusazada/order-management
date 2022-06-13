import moment from "moment";

export const currentDate = () => {
  return moment().format("DD-MM-YYYY");
};

export const currentTime = () => {
  return moment().format("HH:mm");
};

export const currentDateTime = () => {
  return moment().format("DD-MM-YYYY HH:mm");
};
