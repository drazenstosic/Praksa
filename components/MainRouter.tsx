import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../screens/Home";
import Products from "../screens/Products";
import AddItem from "../screens/AddItem";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route path="/products/add">
          <AddItem />
        </Route>
        <Route path="/products/:id">
          <AddItem />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
