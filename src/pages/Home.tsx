import { useEffect } from "react";
import "./style/home.css";
import axios from "axios";
import { UseApiContext } from "../useContext/Context";

const Home = () => {
  const { state, dispatch } = UseApiContext();

  useEffect(() => {
    axios.get("https://dummyjson.com/users").then((res) => {
      dispatch({
        type: "USER_CARD",
        detial: res.data.users,
      });
    });
  }, []);

  return (
    <>
      <header>
        <div className="header-text">API Intergation</div>
        <div className="search-box">
          <input type="search" placeholder="search" />
        </div>
      </header>
      <div className="main-container">
        <div className="Add-btn">+</div>
        {state.userDetial &&
          state.userDetial.map((item: any) => (
            <div className="card-container" key={item.id}>
              <div className="card-img">
                <img src={item.image} alt={item.firstName} />
              </div>
              <div className="card-detial">
                <div>
                  {item.firstName}&nbsp;{item.lastName}
                </div>
                <div>{item.email}</div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
