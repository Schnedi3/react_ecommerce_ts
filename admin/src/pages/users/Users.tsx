import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getUsersRequest, removeUserRequest } from "../../api/users";
import { IUser } from "../../types/types";
import iconRemove from "../../assets/icons/remove.svg";
import "./users.css";

export const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await getUsersRequest();

      if (response.data.success) {
        setUsers(response.data.result);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  const removeUser = async (id: number) => {
    try {
      const response = await removeUserRequest(id);

      if (response.data.success) {
        setUsers(users.filter((user) => user.id !== id));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <section className="list container">
      <h2>All users</h2>
      <ul className="users">
        {users.map((user) => (
          <li className="info" key={user.id}>
            <h3>{user.id}</h3>
            <h3>{user.username}</h3>
            <h4>{user.email}</h4>
            <p>{user.role}</p>
            <img
              src={iconRemove}
              alt="remove product"
              onClick={() => removeUser(user.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
