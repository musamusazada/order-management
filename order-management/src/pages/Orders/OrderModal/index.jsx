import { Modal, Table, Button } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import "./index.scss";
const OrderModal = ({ isModalVisible, setIsModalVisible, orderItem }) => {
  const [canFinish, setCanFinish] = useState(false);

  useEffect(() => {
    if (
      orderItem.foodsArray !== "undefined" ||
      orderItem.foodsArray.length > 0
    ) {
      setCanFinish(true);
    }
  }, [orderItem]);

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
      render: (id) => <Button type="primary">Done</Button>,
    },
    {
      title: "Cancel",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Button type="primary" danger>
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
          <Button type="primary" danger>
            Finish Order
          </Button>
        ) : (
          <Button type="primary" danger>
            Cancel Order
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default OrderModal;
