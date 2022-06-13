import { useEffect } from "react";
import { Typography, Space } from "antd";
import { DesktopOutlined, DollarOutlined } from "@ant-design/icons";
import InfoCard from "../../components/InfoCard";
import { fetchOrders } from "../../services/fetch";
import { useStore } from "../../services/store";
import { currentDate } from "../../utils/dateHelper";
import "./index.scss";
const { Title } = Typography;

export const Dashboard = () => {
  const orders = useStore((state) => state.orders);
  const setOrders = useStore((state) => state.setOrders);
  const a = currentDate();
  useEffect(() => {
    fetchOrders(setOrders);
    console.log(a);
  }, []);

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
          information="Total Earnings: 22$"
        />
      </Space>
    </div>
  );
};
