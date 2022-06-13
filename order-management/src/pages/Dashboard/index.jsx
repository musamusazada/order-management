import { Typography, Space } from "antd";
import { DesktopOutlined, DollarOutlined } from "@ant-design/icons";
import InfoCard from "../../components/InfoCard";

const { Title } = Typography;
export const Dashboard = () => {
  return (
    <div>
      <Title level={3}>Welcome Back , Jerome!</Title>
      <Space>
        <InfoCard
          title="Total Orders"
          icon={<DesktopOutlined />}
          information="Total: 22 orders"
        />
        <InfoCard
          title="Today's Orders"
          icon={<DollarOutlined />}
          information="Total Earnings: 22$ "
        />
      </Space>
    </div>
  );
};
