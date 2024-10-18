// connect helps react communicate with redux and viceversa
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserAction } from "../../actions/userActions";
import common from "../../lib/common";
import { Loader } from "../Loader/Loader";
import { PageHeader } from "../PageHeader/PageHeader";
import { selectMember } from "../../lib/selectors";

// component for representing our dashboard
const Dashboard = () => {
  const member = useSelector(selectMember);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserAction(localStorage.getItem("id")));
  }, []);

  if (!common.isLoggedIn()) {
    return null;
  }

  return (
      <div className="container my-5">
        {member.name ? (
          <>
        <PageHeader>
            <h2>Dashboard Page</h2>
          <p className="lead">
            welcome to your dashboard <strong>{member?.name}</strong>
          </p>
        </PageHeader>
        <ul className="list-group my-5">
          <li className="list-group-item">
            <strong>name: </strong>
            {member?.name}
          </li>
          <li className="list-group-item">
            <strong>email: </strong>
            {member?.email}
          </li>
        </ul>
        </>
        ): <Loader />}
      </div>
  );
};

export default Dashboard;
