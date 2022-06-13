import { Route } from "wouter";
import { Dashboard } from "../pages/Dashboard";
import { CreateOrder } from "../pages/Create-Order";
import { Orders } from "../pages/Orders";
const Routes = () => {
  return (
    <>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/orders" component={Orders} />
      <Route path="/create-order" component={CreateOrder} />
    </>
  );
};

export default Routes;
