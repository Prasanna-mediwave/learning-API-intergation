import { useEffect, useReducer, useState } from "react";
import "./style/home.css";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const initialstate = {
  userDetial: [],
  singleDetial: [],
  showDetial: false,
};

const Home = () => {
  // userReducer
  const reducerFunction = (state: any, action: any) => {
    switch (action.type) {
      case "USER_CARD":
        return { ...state, [action.field]: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducerFunction, initialstate);
  const [text, setText] = useState("");
  const [limit, setLimit] = useState({ skip: 0, page: 0 });
  useEffect(() => {
    axios.get(`https://dummyjson.com/users`).then((res) => {
      dispatch({
        type: "USER_CARD",
        field: "userDetial",
        payload: res.data.users,
      });
    });
  }, [limit]);
  const nextHandler = () => {
    if (limit.skip < 25) {
      setLimit({
        ...limit,
        page: limit.page + 1,
        skip: limit.skip + 5,
      });
    }
  };

  const prevHandler = () => {
    if (limit.skip > 0) {
      setLimit({
        ...limit,
        page: limit.page - 1,
        skip: limit.skip - 5,
      });
    }
  };
  const searchHandle = (e: any) => {
    setText(e.target.value);
  };
  const closeHandler = () => {
    setText("");
  };

  return (
    <>
      <header>
        <div className="header-text">API Intergation</div>
        <div className="search-box">
          <input
            type="text"
            placeholder="search"
            onChange={searchHandle}
            value={text}
          />
          <div
            className={`${text ? "cursor-pointer" : "hidden"}`}
            onClick={closeHandler}
          >
            X
          </div>
        </div>
      </header>
      {state.userDetial.length > 0 ? (
        <div className="main-container">
          <div className="inner-container">
            <motion.div
              className="Add-btn"
              initial={{ scale: 0 }}
              animate={{
                scale: state.showDetial ? 2 : 1,
                opacity: state.showDetial ? 0 : 1,
              }}
            >
              +
            </motion.div>
            {state.userDetial &&
              state.userDetial
                .filter((item: any) => {
                  return text.toLowerCase() === ""
                    ? item
                    : item.firstName.toLowerCase().includes(text) ||
                        item.lastName.toLowerCase().includes(text);
                })
                .slice(limit.skip, limit.skip + 5)
                .map((item: any) => (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{
                      scale: state.showDetial ? 2 : 1,
                      opacity: state.showDetial ? 0 : 1,
                    }}
                    className="card-container"
                    key={item.id}
                    onClick={() => {
                      dispatch({
                        type: "USER_CARD",
                        field: "singleDetial",
                        payload: item,
                      });
                      dispatch({
                        type: "USER_CARD",
                        field: "showDetial",
                        payload: !state.showDetial,
                      });
                    }}
                  >
                    <div className="card-img">
                      <img src={item.image} alt={item.firstName} />
                    </div>
                    <div className="card-detial">
                      <div>
                        {item.firstName}&nbsp;{item.lastName}
                      </div>
                      <div>{item.email}</div>
                    </div>
                  </motion.div>
                ))}
          </div>
          <div className="flex justify-between my-5 items-center">
            <motion.button
              whileHover={{ scale: limit.skip > 0 ? 1.2 : 1 }}
              whileTap={{ scale: limit.skip > 0 ? 0.8 : 1 }}
              type="button"
              className={`next-prev-btn ${
                limit.skip > 0 ? "opacity-100" : "opacity-50"
              }`}
              onClick={prevHandler}
            >
              Prev
            </motion.button>
            <p className="flex justify-center items-center p-4 text-xs bg-[#F9D949] text-[#3C486B] font-bold rounded-lg">
              Page - {limit.page}
            </p>
            <motion.button
              whileHover={{ scale: limit.skip < 25 ? 1.2 : 1 }}
              whileTap={{ scale: limit.skip < 25 ? 0.8 : 1 }}
              type="button"
              className={`next-prev-btn ${
                limit.skip < 25 ? " opacity-100" : "opacity-50"
              }`}
              onClick={nextHandler}
            >
              Next
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="main-container">
          <div className="text-[#F9D949] text-center text-2xl">Loading...</div>
        </div>
      )}
      <AnimatePresence>
        {state.showDetial && (
          <motion.div
            className="modal-overlay"
            onClick={() =>
              dispatch({
                type: "USER_CARD",
                field: "showDetial",
                payload: !state.showDetial,
              })
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
            }}
          >
            <motion.div
              className="modal"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{
                type: "spring",
                stiffness: 30,
              }}
            >
              <div className="card-header">
                <div className=" text-4xl font-bold">Personal Detial</div>
                <button
                  className="btn"
                  onClick={() =>
                    dispatch({
                      type: "USER_CARD",
                      field: "showDetial",
                      payload: !state.showDetial,
                    })
                  }
                >
                  <p className="close-btn">+</p>
                </button>
              </div>
              <div>
                <div className="card-main">
                  <div className="profile-container">
                    <div className="head-text">Profile Detials</div>
                    <div className="flex justify-between border border-[#000] items-center">
                      <div className="grid grid-cols-2 w-[91%]">
                        <div className="text-profile">
                          <p>
                            Name:&nbsp;{state.singleDetial.firstName}
                            &nbsp;{state.singleDetial.maidenName}&nbsp;
                            {state.singleDetial.lastName}
                          </p>
                          <p>Age:&nbsp;{state.singleDetial.age}</p>
                          <p>Email:&nbsp;{state.singleDetial.email}</p>
                          <p>Height:&nbsp;{state.singleDetial.height}</p>
                          <p>Eye Color:&nbsp;{state.singleDetial.eyeColor}</p>
                        </div>
                        <div className="text-profile">
                          <p>Gender:&nbsp;{state.singleDetial.gender}</p>
                          <p>DOB:&nbsp;{state.singleDetial.birthDate}</p>
                          <p>
                            Blood Groupe:&nbsp;{state.singleDetial.bloodGroup}
                          </p>
                          <p>Weight:&nbsp;{state.singleDetial.weight}</p>
                          <p>
                            Hair(Color/Type):&nbsp;
                            {state.singleDetial.hair &&
                              state.singleDetial.hair.color}
                            /
                            {state.singleDetial.hair &&
                              state.singleDetial.hair.type}
                          </p>
                        </div>
                      </div>
                      <div className="img-container">
                        <img
                          src={state.singleDetial.image}
                          alt={state.singleDetial.firstName}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="contant-container">
                    <div className="head-text">Contact Detials</div>
                    <div className="outer-container">
                      <p>Email:&nbsp;{state.singleDetial.email}</p>
                      <p>Phone:&nbsp;{state.singleDetial.phone}</p>
                      <p>University:&nbsp;{state.singleDetial.university}</p>
                    </div>
                    <div className="outer-container">
                      <p>Domain:&nbsp;{state.singleDetial.domain}</p>
                      <p>UserName:&nbsp;{state.singleDetial.username}</p>
                      <p>Password:&nbsp;{state.singleDetial.password}</p>
                    </div>
                    <div className="outer2-container">
                      <p>IP Address:&nbsp;{state.singleDetial.ip}</p>
                      <p>Mac Address:&nbsp;{state.singleDetial.macAddress}</p>
                    </div>
                    <div>
                      <div className="outer-container">
                        <p>
                          Address:&nbsp;
                          {state.singleDetial.address &&
                            state.singleDetial.address.address}
                        </p>
                        <p>
                          State:&nbsp;
                          {state.singleDetial.address &&
                            state.singleDetial.address.state}
                        </p>
                        <p>
                          City:&nbsp;
                          {state.singleDetial.address &&
                            state.singleDetial.address.city}
                        </p>
                      </div>
                      <div className="outer2-container">
                        <p>
                          Postal Code:&nbsp;
                          {state.singleDetial.address &&
                            state.singleDetial.address.postalCode}
                        </p>
                        <p>
                          Coordinates(Lat/Lng):&nbsp;
                          {state.singleDetial.address &&
                            state.singleDetial.address.coordinates &&
                            state.singleDetial.address.coordinates.lat}
                          /
                          {state.singleDetial.address &&
                            state.singleDetial.address.coordinates &&
                            state.singleDetial.address.coordinates.lng}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bank-container">
                    <div className="head-text">Bank Detials</div>
                    <div className="outer2-container">
                      <p>
                        Card Number:&nbsp;
                        {state.singleDetial.bank &&
                          state.singleDetial.bank.cardNumber}
                      </p>
                      <p>
                        Card Type:&nbsp;
                        {state.singleDetial.bank &&
                          state.singleDetial.bank.cardType}
                      </p>
                    </div>
                    <div className="outer-container">
                      <p>
                        Currency:&nbsp;
                        {state.singleDetial.bank &&
                          state.singleDetial.bank.currency}
                      </p>
                      <p>
                        Card EXpire:&nbsp;
                        {state.singleDetial.bank &&
                          state.singleDetial.bank.cardExpire}
                      </p>
                      <p>
                        IBan:&nbsp;
                        {state.singleDetial.bank &&
                          state.singleDetial.bank.iban}
                      </p>
                    </div>
                  </div>
                  <div className="company-container">
                    <div className="head-text">Company Detials</div>
                    <div>
                      <div>
                        <div className="outer-container">
                          <p>
                            Address:&nbsp;
                            {state.singleDetial.company &&
                              state.singleDetial.company.address &&
                              state.singleDetial.company.address.address}
                          </p>
                          <p>
                            State:&nbsp;
                            {state.singleDetial.company &&
                              state.singleDetial.company.address &&
                              state.singleDetial.company.address.state}
                          </p>
                          <p>
                            City:&nbsp;
                            {state.singleDetial.company &&
                              state.singleDetial.company.address &&
                              state.singleDetial.company.address.city}
                          </p>
                        </div>
                        <div className="outer2-container">
                          <p>
                            Postal Code:&nbsp;
                            {state.singleDetial.company &&
                              state.singleDetial.company.address &&
                              state.singleDetial.company.address.postalCode}
                          </p>
                          <p>
                            Coordinates(Lat/Lng):&nbsp;
                            {state.singleDetial.company &&
                              state.singleDetial.company.address &&
                              state.singleDetial.company.address.coordinates &&
                              state.singleDetial.company.address.coordinates
                                .lat}
                            /
                            {state.singleDetial.company &&
                              state.singleDetial.company.address &&
                              state.singleDetial.company.address.coordinates &&
                              state.singleDetial.company.address.coordinates
                                .lng}
                          </p>
                        </div>
                      </div>
                      <div className="outer-container">
                        <p>
                          Department:&nbsp;
                          {state.singleDetial.company &&
                            state.singleDetial.company.department}
                        </p>
                        <p>
                          Name:&nbsp;
                          {state.singleDetial.company &&
                            state.singleDetial.company.name}
                        </p>
                        <p>
                          Title:&nbsp;
                          {state.singleDetial.company &&
                            state.singleDetial.company.title}
                        </p>
                      </div>
                      <div className="outer2-container">
                        <p>
                          EIN:&nbsp;
                          {state.singleDetial.ein}
                        </p>
                        <p>
                          SSN:&nbsp;
                          {state.singleDetial.ssn}
                        </p>
                      </div>
                      <div className="text-xl p-1 border border-[#000]">
                        User Agent:&nbsp;
                        {state.singleDetial.userAgent}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Home;
