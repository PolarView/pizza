import "../../scss/app.scss";
import Header from "../Header";
import RunningLine from "../runningLine/RunningLine";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="wrapper">
      <Header />
      <RunningLine />
      <div className="content">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
