import { useEffect, useState } from "react";
import { Typography, Space } from "antd";
import { DesktopOutlined, DollarOutlined } from "@ant-design/icons";
import InfoCard from "../../components/InfoCard";
import { fetchOrders } from "../../services/fetch";
import { useStore } from "../../services/store";
import { currentDate } from "../../utils/dateHelper";
import "./index.scss";
const { Title } = Typography;

export const Dashboard = () => {
  //Store
  const orders = useStore((state) => state.orders);
  const setOrders = useStore((state) => state.setOrders);

  //Calculation state
  const [todayEarnings, setTodayEarnings] = useState(0);

  //Summing Todays earnings
  const reduceFoodPrice = (arr) => {
    let total = 0;
    arr.forEach((el) => (total += el.totalPrice));

    return total;
  };
  //Finding if Order is Done Today!
  const todaysTotalEarnings = () => {
    let total = 0;
    const today = currentDate();
    orders.forEach((el) => {
      if (el.status === "done") {
        if (today === el.createDate) {
          total += reduceFoodPrice(el.foodsArray);
        }
      }
    });
    setTodayEarnings(total);
  };

  useEffect(() => {
    fetchOrders(setOrders);
  }, []);
  useEffect(() => {
    todaysTotalEarnings();
  }, [orders]);
  return (
    <div>
      <Title level={3}>Welcome Back , Outlander!</Title>
      <Space className="w-100 card-wrapper">
        <InfoCard
          title="Total Orders (All Time)"
          icon={<DesktopOutlined />}
          information={`Total: ${orders.length} orders`}
        />
        <InfoCard
          title="Today's Orders"
          icon={<DollarOutlined />}
          information={`Total Earnings: ${todayEarnings}$`}
        />
      </Space>
    </div>
  );
};
