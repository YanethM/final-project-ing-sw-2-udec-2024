import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User } from "../../api/user";
import { getUsers } from "../../slices/userSlice"; 
import { Table, Avatar } from "antd";

export const ListComponent = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users); 
  const userApi = new User();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await userApi.getUsers();
        dispatch(getUsers(usersData)); 
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, [dispatch]); 

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text, record) => (
        <Avatar src={record.avatar} />
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'User Name',
      dataIndex: 'user_name',
      key: 'user_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Active',
      dataIndex: 'active_user',
      key: 'active_user',
      render: (text, record) => (
        <span>{record.active_user ? 'Yes' : 'No'}</span>
      ),
    },
  ];

  return (
    <>
      <h2>Users List</h2>
      <Table dataSource={users} columns={columns} rowKey="id" />
    </>
  );
};
