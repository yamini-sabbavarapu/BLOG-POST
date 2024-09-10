import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../model/token.js';
import User from '../model/user.js';

dotenv.config();

export const signupUser = async (request, response) => {
    try {
        const { username, name, password } = request.body;
        if (!username || !name || !password) {
            return response.status(400).json({ msg: 'All fields are required' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return response.status(400).json({ msg: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, name, password: hashedPassword });

        await newUser.save();
        return response.status(201).json({ msg: 'Signup successful' });
    } catch (error) {
        console.error('Error while signing up user:', error);
        return response.status(500).json({ msg: 'Error while signing up user', error: error.message });
    }
};

export const loginUser = async (request, response) => {
    try {
        const { username, password } = request.body;
        if (!username || !password) {
            return response.status(400).json({ msg: 'Username and password are required' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return response.status(400).json({ msg: 'Username does not match' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return response.status(400).json({ msg: 'Password does not match' });
        }

        const accessToken = jwt.sign({ id: user._id, username: user.username }, process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user._id, username: user.username }, process.env.REFRESH_SECRET_KEY);

        const newToken = new Token({ token: refreshToken });
        await newToken.save();

        response.status(200).json({ accessToken, refreshToken, name: user.name, username: user.username });
    } catch (error) {
        console.error('Error while logging in user:', error);
        response.status(500).json({ msg: 'Error while logging in user', error: error.message });
    }
};

export const logoutUser = async (request, response) => {
    try {
        const { token } = request.body;
        if (!token) {
            return response.status(400).json({ msg: 'Token is required' });
        }

        await Token.deleteOne({ token });
        response.status(204).json({ msg: 'Logout successful' });
    } catch (error) {
        console.error('Error while logging out user:', error);
        response.status(500).json({ msg: 'Error while logging out user', error: error.message });
    }
};
