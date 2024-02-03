import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { server } from "../redux/reducer/store";
import { CartreducerinitialState } from "../types/reducer-type";
import { saveShippingInfo } from "../redux/reducer/cartReducer";

const shipping = () => {
  const { cartItems, total } = useSelector(
    (state: { cartReducer: CartreducerinitialState }) => state.cartReducer
  );

  useEffect(() => {
    if (cartItems.length <= 0) return navigate("/cart");
  }, [cartItems]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(saveShippingInfo(ShipingInfo))

    try {
      const { data } = await axios.post(
        `${server}/api/v1/payment/create`,
        {
          amount: total,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/pay", {
        state: data.clientSecret,
      });
    } catch (error) {
      console.log(error);
      toast.error("something Went Wrong");
    }
  };
  return (
    <div className="shipping">
      <button className="back-btn" onClick={() => navigate("/cart")}>
        <BiArrowBack />
      </button>
      <form onSubmit={submitHandler}>
        <h1 style={{ fontWeight: "500" }}>Shipping Adress</h1>

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
