import { useEffect, useState } from "react";
import { Link } from "wouter";
import { v4 as uuidv4 } from "uuid";
import { Typography, Space, Form, Select, Button, Input, message } from "antd";
import { fetchTables, fetchWaiters, fetchFoods } from "../../services/fetch";
import { currentDate, currentTime } from "../../utils/dateHelper";
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

  const [formFood] = Form.useForm();

  useEffect(() => {
    fetchTables(setTables);
    fetchWaiters(setWaiters);
    fetchFoods(setFoods);
  }, []);

  //Submit Method for First Form. -- Datas: Table, Waiter
  const onFinish = (values) => {
    const newOrderObject = values;
    newOrderObject.id = uuidv4();
    newOrderObject.createDate = currentDate();
    newOrderObject.foodsArray = [];
    newOrderObject.totalOrderPrice = 0;
    newOrderObject.status = "pending";
    newOrderObject.doneDate = "---";
    setOrderObject(newOrderObject);
    setStage(true);
  };

  //Submit Method for Second Form. --Food (push to foodsArray)
  //Food consists of : id, name, totalPrice, orderTime, waitTime, status
  const onFinishFood = (values) => {
    if (totalPrice === 0) {
      message.error("Invalid Input ! Please select Valid Quantity");
    } else {
      const _orderObj = orderObject;
      const _foodObj = values;
      _foodObj.id = uuidv4();
      _foodObj.totalPrice = totalPrice;
      _foodObj.orderTime = currentTime();
      _foodObj.waitTime = "3m";
      _foodObj.status = "pending";
      _orderObj.foodsArray.push(_foodObj);
      _orderObj.totalOrderPrice =
        _orderObj.totalOrderPrice + _foodObj.totalPrice;
      setOrderObject(_orderObj);
      formFood.resetFields();
    }
  };

  //Gets selected food and assigns single price for calculation
  const handleFoodSelect = (value) => {
    const selectedFood = foods.find((el) => el.name === value);
    setSinglePrice(selectedFood.price);
    setTotalPrice(0);
    setQuantity(1);
  };

  //Once quantity changes, calculates Total Price.
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

  //Post Order to server
  const saveOrder = () => {
    fetch(`${import.meta.env.VITE_BASE_API}/orders`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderObject),
    })
      .then((res) => console.log(res))
      .catch((err) => message.error(err));
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
        <Form
          className="create-order-form"
          onFinish={onFinishFood}
          form={formFood}
        >
          <Form.Item
            label="Food"
            name="food"
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
          <Space>
            <Button htmlType="submit" type="primary">
              Add to order
            </Button>
            <Button type="primary" onClick={saveOrder}>
              Save Order
            </Button>
          </Space>
        </Form>
      )}

      <Link href="/orders">
        <Button>Go to Orders</Button>
      </Link>
    </Space>
  );
};
