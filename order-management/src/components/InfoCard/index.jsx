import { Card } from "antd";
const InfoCard = ({ title, icon, information }) => {
  return (
    <Card title={title}>
      <span>{icon}</span> <span>{information}</span>
    </Card>
  );
};

export default InfoCard;
