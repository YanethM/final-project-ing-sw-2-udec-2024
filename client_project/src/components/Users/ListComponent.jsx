import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User } from "../../api/user";
import { getUsers } from "../../slices/userSlice";

export const ListComponent = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users); 
  const userApi = new User();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await userApi.getUsers();
        dispatch(getUsers(usersData)); // Despacha una acción para actualizar el estado de los usuarios
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, [dispatch]); // Añade dispatch al array de dependencias

  return (
    <>
      <h2>Users List</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <span>{user.email}</span> - <span>{user.user_name} {user.last_name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </>
  );
};
