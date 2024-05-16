const path = require("path");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (req, res) => {
    const {
        email,
        user_name,
        last_name,
        active_user,
        current_password
    } = req.body;

    if (typeof email !== 'string' || typeof user_name !== 'string' || typeof current_password !== 'string') {
        return res.status(400).json({ error: 'Los campos deben ser cadenas de texto' });
    }

    console.log(req.body);
    const avatar = req.file ? req.file.filename : null;
    console.log(avatar);

    try {
        const newUser = await prisma.Users.create({
            data: {
                email,
                user_name,
                last_name,
                active_user: true,
                current_password,
                avatar
            },
        });

        console.log(req.body);
        console.log(newUser);
        res.json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al crear el usuario" });
    }
};

// Function to update an user by id 
const editUser = async (req, res) => {
    const { id } = req.params;
    const {
        email,
        user_name,
        last_name,
        active_user,
        current_password
    } = req.body;
    const avatar = req.file ? req.file.filename : null;
    console.log(avatar);
    try {
        const user = await prisma.Users.update({
            where: { id: id },
            data: {
                email,
                user_name,
                last_name,
                avatar,
                active_user,
                current_password
            },
        });
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
};

// Function to delete an user by id
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.Users.delete({
            where: {
                id: id
            }
        });

        res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
};

// Function to get an user by id 
const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await prisma.Users.findUnique({
            where: {
                id: id
            }
        });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
};

// Function to list all users
const listUsers = async (req, res) => {
    try {
        const users = await prisma.Users.findMany();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
};

module.exports = {
    createUser,
    deleteUser,
    editUser,
    getUser,
    listUsers,
}