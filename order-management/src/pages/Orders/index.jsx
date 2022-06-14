import { useState } from "react";
import { Table, Space, Typography, Button } from "antd";
import { useEffect } from "react";
import { fetchOrders } from "../../services/fetch";
import { useStore } from "../../services/store";
import OrderModal from "./OrderModal";
const { Title } = Typography;

export const Orders = () => {
  const columns = [
    {
      title: "#",
      key: "order",
      render: (_, field, index) => <p key={index}>{index + 1}</p>,
    },
    {
      title: "Table",
      dataIndex: "table",
      key: "table",
    },
    {
      title: "Waiter",
      dataIndex: "waiter",
      key: "waiter",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Total Price",
      dataIndex: "totalOrderPrice",
      key: "totalPrice",
      render: (el) => <p>{el} AZN</p>,
    },
    {
      title: "Done Date",
      dataIndex: "doneDate",
      key: "doneDate",
    },
    {
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Button type="primary" onClick={() => handleModal(id)}>
          See
        </Button>
      ),
    },
  ];

  //Modal State
  const [isModalVisible, setIsModalVisible] = useState(false);
  //Order State
  const [orderItem, setOrderItem] = useState({ id: 0 });
  //Order Store
  const orders = useStore((state) => state.orders);
  const setOrders = useStore((state) => state.setOrders);

  function handleModal(id) {
    const order = orders.find((el) => el.id === id);
    setOrderItem(order);
    setIsModalVisible(true);
  }
  useEffect(() => {
    fetchOrders(setOrders);
  }, []);

  return (
    <>
      <Space className="w-100" direction="vertical">
        <Title>Orders</Title>
        <Table columns={columns} dataSource={orders} />
      </Space>
      <OrderModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        orderItem={orderItem}
      />
    </>
  );
};
