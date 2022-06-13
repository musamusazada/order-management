import { Switch, Route } from "wouter";
import { Dashboard } from "../pages/Dashboard";
import { CreateOrder } from "../pages/Create-Order";
import { Orders } from "../pages/Orders";
const Routes = () => {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/orders" component={Orders} />
      <Route path="/create-order" component={CreateOrder} />
      <Route path="/:rest*" component={Dashboard} />
    </Switch>
  );
};

export default Routes;
