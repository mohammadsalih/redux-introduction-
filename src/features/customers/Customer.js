import { useSelector } from "react-redux";

function Customer() {
  const name = useSelector((store) => store.customers.fullName);

  return <h2>👋 Welcome, {name ? name : "create a customer"}</h2>;
}

export default Customer;
