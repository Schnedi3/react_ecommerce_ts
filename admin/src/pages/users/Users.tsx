import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { IUser } from "../../types/types";
import {
  deleteUserRequest,
  getUsersRequest,
  iconDelete,
  Title,
} from "../../Routes";
import styles from "./users.module.css";

export const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const getUsers = async () => {
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

  const deleteUser = async (id: number) => {
    try {
      const response = await deleteUserRequest(id);

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
    getUsers();
  }, []);

  return (
    <section className={styles.users}>
      <Title title="Users" />
      <ul className={styles.usersList}>
        {users.map((user) => (
          <li className={styles.user} key={user.id}>
            <h3>{user.id}</h3>
            <h3>{user.username}</h3>
            <h4>{user.email}</h4>
            <p>{user.role}</p>
            <img
              className={styles.userDelete}
              src={iconDelete}
              alt="remove product"
              onClick={() => deleteUser(user.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
