import { Link } from "react-router-dom";
import { PageHeader } from "../PageHeader/PageHeader";

export const PageNotFound = () => (<div className="container my-5"><PageHeader><h2>Page does not exist</h2><Link to='/'>go back</Link></PageHeader></div>)