import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User } from "../../api/user";
import { getUsers } from "../../slices/userSlice"; 
import { Table, Avatar, Space, Tooltip, Modal, Form, Input, Switch } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { confirm } = Modal;

export const ListComponent = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users); 
  const userApi = new User();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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

  const handleEdit = (id) => {
    const user = users.find(user => user.id === id);
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    confirm({
      title: 'Seguro quieres eliminar este usuario?',
      content: 'Esta opcion no se puede revertir',
      onOk() {
        console.log("Delete user with id:", id);
      },
      onCancel() {
        console.log('Cancel delete');
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const handleOk = () => {
    console.log("Updated user:", selectedUser);
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const handleChange = (e) => {
    setSelectedUser({
      ...selectedUser,
      [e.target.name]: e.target.value
    });
  };

  const handleSwitchChange = (checked) => {
    setSelectedUser({
      ...selectedUser,
      active_user: checked
    });
  };

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
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <EditOutlined 
              style={{ color: 'blue', cursor: 'pointer' }} 
              onClick={() => handleEdit(record.id)} 
            />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteOutlined 
              style={{ color: 'red', cursor: 'pointer' }} 
              onClick={() => handleDelete(record.id)} 
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h2>Users List</h2>
      <Table dataSource={users} columns={columns} rowKey="id" />
      {selectedUser && (
        <Modal
          title="Edit User"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form>
            <Form.Item label="Email">
              <Input 
                name="email"
                value={selectedUser.email}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="User Name">
              <Input 
                name="user_name"
                value={selectedUser.user_name}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Last Name">
              <Input 
                name="last_name"
                value={selectedUser.last_name}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Active">
              <Switch 
                checked={selectedUser.active_user}
                onChange={handleSwitchChange}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};
