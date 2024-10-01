import { useNavigate } from "react-router-dom";
// connect helps react communicate with redux and viceversa
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

// component for representing our dashboard
const Dashboard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (user.success) {
      setName(user.user.name);
      setEmail(user.user.email);
    }
  }, [user]);

  return (
    <div className="container my-5">
      <header>
        <h2>Dashboard Page</h2>
      </header>
      <p className="lead">
        welcome to your dashboard <strong>{name}</strong>
      </p>
      <ul className="list-group my-5">
        <li className="list-group-item">
          <strong>name: </strong>
          {name}
        </li>
        <li className="list-group-item">
          <strong>email: </strong>
          {email}
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
