import { useSelector } from "react-redux";
import common from "../../lib/common";
import { PageHeader } from "../PageHeader/PageHeader";
import { selectMember } from "../../lib/selectors";

// blog component
const Blog = () => {
  const member = useSelector(selectMember);

  if (!common.isLoggedIn()) {
    return null;
  }

  return (
    <div className="container my-5">
      <PageHeader>
        <h2>Blog page</h2>
        <p className="lead">
          welcome to your blogs <strong>{member?.name}</strong>
        </p>
      </PageHeader>
    </div>
  );
};

export default Blog;
