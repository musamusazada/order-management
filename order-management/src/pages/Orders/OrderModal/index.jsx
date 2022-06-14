import React, { useEffect, useState } from "react";
import { Modal, Table, Button } from "antd";
import { currentDate } from "../../../utils/dateHelper";
import "./index.scss";
const OrderModal = ({
  isModalVisible,
  setIsModalVisible,
  orderItem,
  refetchOrders,
}) => {
  //Logic State
  const [canFinish, setCanFinish] = useState(false);

  useEffect(() => {
    if (orderItem.foodsArray.length > 0) {
      setCanFinish(true);
    } else {
      setCanFinish(false);
    }
  }, [orderItem]);

  //Change Food Status and Update
  function orderFoodStatus(id, index, status) {
    orderItem.foodsArray[index].status = status;
    if (orderItem.id != 0) {
      fetch(`${import.meta.env.VITE_BASE_API}/orders/${orderItem.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderItem),
      })
        .then((res) => refetchOrders())
        .catch((err) => message.error(err));
    }
  }

  //Change Order Status and Update
  function orderStatusChange(status) {
    orderItem.status = status;
    if (status === "done") {
      orderItem.doneDate = currentDate();
    } else {
      orderItem.cancelDate = currentDate();
    }
    if (orderItem.id != 0) {
      fetch(`${import.meta.env.VITE_BASE_API}/orders/${orderItem.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderItem),
      })
        .then((res) => refetchOrders())
        .catch((err) => message.error(err));
    }
  }

  //Table Columns
  const columns = [
    {
      title: "#",
      key: "order",
      render: (_, field, index) => <p key={index}>{index + 1}</p>,
    },
    {
      title: "Food",
      dataIndex: "food",
      key: "food",
    },
    {
      title: "Quantity",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (el) => <p>{el} AZN</p>,
    },
    {
      title: "Order Time",
      dataIndex: "orderTime",
      key: "orderTime",
    },
    {
      title: "Wait Time",
      dataIndex: "waitTime",
      key: "waitTime",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (el) => (
        <p
          className={
            el === "done"
              ? "status-indicator bg-green"
              : "status-indicator bg-black"
          }
        >
          {el}
        </p>
      ),
    },
    {
      title: "Done",
      dataIndex: "id",
      key: "id",
      render: (id, _, index) => (
        <Button
          type="primary"
          onClick={() => orderFoodStatus(id, index, "done")}
        >
          Done
        </Button>
      ),
    },
    {
      title: "Cancel",
      dataIndex: "id",
      key: "id",
      render: (id, _, index) => (
        <Button
          type="primary"
          danger
          onClick={() => orderFoodStatus(id, index, "cancelled")}
        >
          Cancel
        </Button>
      ),
    },
  ];

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      className="order-modal"
      onCancel={handleCancel}
      visible={isModalVisible}
      centered
      destroyOnClose
    >
      <Table
        pagination={false}
        columns={columns}
        dataSource={orderItem.foodsArray}
      />
      <div className="w-100 d-flex justify-end mt-50">
        {canFinish ? (
          <Button
            type="primary"
            danger
            onClick={() => orderStatusChange("done")}
          >
            Finish Order
          </Button>
        ) : (
          <Button
            type="primary"
            danger
            onClick={() => orderStatusChange("cancel")}
          >
            Cancel Order
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default React.memo(OrderModal);
