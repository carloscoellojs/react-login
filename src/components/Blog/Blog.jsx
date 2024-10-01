import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// blog component
const Blog = () => {
  const [name, setName] = useState("");
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } else {
      setName(user.user.name);
    }
  }, []);

  return (
    <div className="container my-5">
      <header>
        <h2>Blog page</h2>
      </header>
      <p className="lead">
        welcome to your blog <strong>{name}</strong>
      </p>
    </div>
  );
};

export default Blog;
