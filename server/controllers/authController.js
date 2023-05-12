import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";

dotenv.config();

class AuthController {

    //Generate access token
    static generateAccessToken(user) {
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
    }

    //Get a new access token with a refresh token
    static async apiRefreshAuth(req, res) {
        //req.body: {*token}
        const refreshToken = req.body.token;
        if (!refreshToken) return res.status(401).send();

        try {
            if (!await pool.query('SELECT refreshtoken FROM tokens WHERE refreshtoken = $1', [refreshToken]))
                return res.status(403).send();

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(403).send();
                const accessToken = AuthController.generateAccessToken({email: user.email});
                res.status(200).json({
                    accessToken: accessToken
                })
            });
        } catch (e) {
            return res.status(500).send({error: e})
        }
    }

    //Logout the user
    static async apiLogoutUser(req, res) {
        //req.body: {*token}
        const refreshToken = req.body.token;
        try {
            //Delete refresh token from database
            const result = await pool.query(`DELETE FROM tokens WHERE refreshtoken = $1`, [refreshToken]);
            if (!result) return res.status(500).send();
            return res.status(204).send();
        } catch (e) {
            return res.status(500).send({error: e})
        }
    }

    //Login the user
    static async apiLoginUser(req, res) {
        //req.body: {*name, *password}
        const { email, password } = req.body;

        try {
            const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

            const jwtUser = {
                email: user.rows[0].email
            }

            //Check if the user exists
            if (!user.rows.length) res.json({
                statusType: "ERR",
                statusDetail: "User doesn't exist"
            });

            //Compare user password with given password
            if (await bcrypt.compare(password, user.rows[0].hashed_password)) {
                console.log(jwtUser);
                const accessToken = AuthController.generateAccessToken(jwtUser);
                const refreshToken = jwt.sign(jwtUser, process.env.REFRESH_TOKEN_SECRET);

                //Store refresh token in database
                try {
                    const result = await pool.query(`INSERT INTO tokens (refreshtoken) VALUES ($1)`, [refreshToken]);
                    if (!result) return res.status(500).send();

                    return res.status(200).json({
                        email: user.rows[0].email,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    });
                } catch (e) {
                    return res.status(500).send({error: e})
                }

            }
            else return res.status(401).json({
                statusType: "ERR",
                statusDetail: "Incorrect password"
            })
        } catch (e) {
            return res.status(500).send({error: e});
        }
    }

    //Signup the user
    static async apiSignupUser(req, res) {
        //req.body: {*name, *password}
        const { email, password } = req.body;
        const hashed_password = await bcrypt.hash(password, 10);

        try {
            // const result = await db.insertUser(name, hashedPassword);
            const result = await pool.query(`INSERT INTO users (email, hashed_password) VALUES ($1, $2)`, [email, hashed_password]);
            if (!result) return res.status(500).send();
            return res.status(200).json({
                statusType: "SUCC",
                statusDetails: ""
            });
        } catch (e) {
            return res.status(500).send({error: e});
        }
    }
}

export default AuthController;