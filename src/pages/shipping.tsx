import { ChangeEvent, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const shipping = () => {
  const navigate = useNavigate();
  const [ShipingInfo, setShipingInfo] = useState({
    adress: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });
  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShipingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="shipping">
      <button className="back-btn" onClick={() => navigate("/cart")}>
        <BiArrowBack />
      </button>
      <form>
        <h1 style={{fontWeight:"500"}}>Shipping Adress</h1>

        <input
          required
          type="text"
          name="adress"
          placeholder="Enter your adress"
          value={ShipingInfo.adress}
          onChange={changeHandler}
        />
        <input
          required
          type="text"
          name="city"
          placeholder="Enter  city"
          value={ShipingInfo.city}
          onChange={changeHandler}
        />
        <input
          required
          type="text"
          name="state"
          placeholder="Enter state "
          value={ShipingInfo.state}
          onChange={changeHandler}
        />
        <select
          required
          name="country"
          value={ShipingInfo.country}
          onChange={changeHandler}
        >
          <option value={""}>Chose Country </option>/
          <option value={"Pakistan"}>Pakistan</option>/
          <option value={"india"}>india</option>/
        </select>

        <input
          required
          type="number"
          name="pinCode"
          placeholder="Enter pinCode"
          value={ShipingInfo.pinCode}
          onChange={changeHandler}
        />
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default shipping;

//

//
