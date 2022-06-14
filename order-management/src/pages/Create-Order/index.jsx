import { Typography, Space, Form, Select, Button, Input, message } from "antd";
import { useEffect, useState } from "react";
import { fetchTables, fetchWaiters, fetchFoods } from "../../services/fetch";
import "./index.scss";
const { Title } = Typography;
export const CreateOrder = () => {
  const [tables, setTables] = useState([]);
  const [waiters, setWaiters] = useState([]);
  const [foods, setFoods] = useState([]);
  const [orderObject, setOrderObject] = useState();
  const [singlePrice, setSinglePrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [stage, setStage] = useState(false);
  useEffect(() => {
    fetchTables(setTables);
    fetchWaiters(setWaiters);
    fetchFoods(setFoods);
  }, []);

  const onFinish = (values) => {
    const newOrderObject = values;
    setOrderObject(newOrderObject);
    setStage(true);
  };
  const onFinishFood = (values) => {
    console.log(values);
  };
  const handleFoodSelect = (value) => {
    const selectedFood = foods.find((el) => el.name === value);
    setSinglePrice(selectedFood.price);
    setTotalPrice(0);
    setQuantity(1);
  };
  const handleQuantity = (e) => {
    let { value } = e.target;
    try {
      if (value.trim() === "") {
        setQuantity(0);
        setTotalPrice(0);
      } else {
        value = parseInt(value);
        const total = value * singlePrice;
        setQuantity(value);
        setTotalPrice(total);
      }
    } catch {
      message.warning("Please Enter Number!");
      setQuantity(1);
      setTotalPrice(0);
    }
  };
  return (
    <Space className="w-100" direction="vertical">
      <Title>Create Order</Title>
      {!stage ? (
        <Form className="create-order-form" onFinish={onFinish}>
          <Form.Item
            label="Table"
            name="table"
            rules={[
              {
                required: true,
                message: "Please select table",
              },
            ]}
          >
            <Select placeholder="Select Table">
              {tables.map((el, index) => (
                <Option value={el.name} key={index}>
                  {el.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Waiter"
            name="waiter"
            rules={[
              {
                required: true,
                message: "Please select Waiter",
              },
            ]}
          >
            <Select placeholder="Select Waiter">
              {waiters.map((el, index) => (
                <Option value={el.name} key={index}>
                  {el.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Button htmlType="submit" type="primary">
            Create Order
          </Button>
        </Form>
      ) : (
        <Form className="create-order-form" onFinish={onFinishFood}>
          <Form.Item
            label="Food"
            name="name"
            rules={[
              {
                required: true,
                message: "Please select food",
              },
            ]}
          >
            <Select placeholder="Select food" onChange={handleFoodSelect}>
              {foods.map((el, index) => (
                <Option value={el.name} key={index}>
                  {el.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="count"
            rules={[
              {
                required: true,
                message: "Please input valid number!",
              },
            ]}
          >
            <Input
              min={1}
              type="number"
              value={quantity}
              placeholder="Quantity"
              onChange={handleQuantity}
            />
          </Form.Item>
          <Form.Item label="Total Price" name="totalPrice">
            <p className="food-price">{totalPrice} AZN</p>
          </Form.Item>
          <Button htmlType="submit" type="primary">
            Add to order
          </Button>
        </Form>
      )}
    </Space>
  );
};
