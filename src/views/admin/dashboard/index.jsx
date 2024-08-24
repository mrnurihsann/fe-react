// Import SidebarMenu
import SidebarMenu from "../../../components/SidebarMenu";

// Import useState and useEffect
import { useState, useEffect } from "react";

// Import js-cookie
import Cookies from "js-cookie";

export default function Dashboard() {
  // Init state user
  const [user, setUser] = useState([]);

  // useEffect
  useEffect(() => {
    // Get user data from cookies
    const userData = Cookies.get("user");

    if (userData) {
      // Assign user data to state "user"
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-3">
          <SidebarMenu />
        </div>
        <div className="col-md-9">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Dashboard</h5>
              <button className="btn btn-primary">Add New</button>
            </div>
            <div className="card-body">
              <div className="text-center mb-4">
                <h3>
                  Welcome, <strong>{user?.name}</strong>
                </h3>
                <p className="text-muted">
                  This is your dashboard where you can manage everything.
                </p>
              </div>
              <div className="row">
                <div className="col-12 col-sm-6 col-md-4 mb-4">
                  <div className="card border-0 rounded shadow-sm">
                    <div className="card-body text-center">
                      <h6 className="card-title">Total Users</h6>
                      <h3 className="card-text">150</h3>
                      <p className="text-muted">Users registered</p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4 mb-4">
                  <div className="card border-0 rounded shadow-sm">
                    <div className="card-body text-center">
                      <h6 className="card-title">Total Posts</h6>
                      <h3 className="card-text">75</h3>
                      <p className="text-muted">Posts published</p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4 mb-4">
                  <div className="card border-0 rounded shadow-sm">
                    <div className="card-body text-center">
                      <h6 className="card-title">Total Comments</h6>
                      <h3 className="card-text">320</h3>
                      <p className="text-muted">Comments made</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
