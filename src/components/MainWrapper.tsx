import { Link } from "react-router-dom";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const MainWrapper = (props: Props) => {
  return (
    <div className="layout">
      <div className="layout__aside">
        <div className="nav">
          <Link className="nav__link" to="/">
            Home
          </Link>
          <Link className="nav__link" to="/products">
            Products
          </Link>
        </div>
      </div>
      <div className="layout__main">{props.children}</div>
    </div>
  );
};

export default MainWrapper;
