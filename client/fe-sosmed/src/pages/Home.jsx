import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../redux/action/authAction";

const Home = () => {
  const auth = useSelector((root) => root?.auth);
  const dispatch = useDispatch()

  useEffect(() => dispatch(fetchProfile(auth?.token)), []);


  return <div>Home</div>;
};

export default Home;
