// Import useState dan useEffect
import { useState, useEffect } from "react";

// Import SidebarMenu
import SidebarMenu from "../../../components/SidebarMenu";

// Import Link
import { Link } from "react-router-dom";

// Import js cookie
import Cookies from "js-cookie";

// Import api
import api from "../../../services/api";

// Import Font Awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function UsersIndex() {
  // State "users"
  const [users, setUsers] = useState([]);

  // Define method "fetchDataUsers"
  const fetchDataUsers = async () => {
    const token = Cookies.get("token");

    if (token) {
      api.defaults.headers.common["Authorization"] = token;

      try {
        const response = await api.get("/api/admin/users");
        setUsers(response.data.data);
      } catch (error) {
        console.error("There was an error fetching the users!", error);
      }
    } else {
      console.error("Token is not available!");
    }
  };

  // Run hook useEffect
  useEffect(() => {
    fetchDataUsers();
  }, []);

  // Define method "deleteUser"
  const deleteUser = async (id) => {
    const token = Cookies.get("token");

    if (token) {
      api.defaults.headers.common["Authorization"] = token;

      try {
        await api.delete(`/api/admin/users/${id}`);
        fetchDataUsers();
      } catch (error) {
        console.error("There was an error deleting the user!", error);
      }
    } else {
      console.error("Token is not available!");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-3">
          <SidebarMenu />
        </div>
        <div className="col-md-9">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span>USERS</span>
              <Link
                to="/admin/users/create"
                className="btn btn-sm btn-success rounded shadow-sm border-0"
              >
                ADD USER
              </Link>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="bg-dark text-white">
                    <tr>
                      <th scope="col">Full Name</th>
                      <th scope="col">Email Address</th>
                      <th scope="col" style={{ width: "17%" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user, index) => (
                        <tr key={index}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td className="text-center">
                            <div className="d-flex justify-content-center">
                              <Link
                                to={`/admin/users/edit/${user.id}`}
                                className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2"
                                aria-label="Edit User"
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </Link>
                              <button
                                onClick={() => deleteUser(user.id)}
                                className="btn btn-sm btn-danger rounded-sm shadow border-0"
                                aria-label="Delete User"
                              >
                                <FontAwesomeIcon icon={faTrashAlt} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center">
                          <div className="alert alert-danger mb-0">
                            Data Belum Tersedia!
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
