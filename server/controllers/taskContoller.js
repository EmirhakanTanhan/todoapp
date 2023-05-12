import pool from '../db.js';

class TaskController {
    //Get all todos of a user
    static async apiGetTodos(req, res) {
        try {
            const { user_email } = req.params;
            const { tags } = req.query;//



            let query = 'SELECT * FROM todos WHERE user_email = $1';

            const values = [user_email];

            if (tags && tags !== 'all') {
                query += ' AND tagid = $2';
                values.push(`${tags}`);
            }

            const result = await pool.query(query, values);


            // const result = await pool.query('SELECT * FROM todos WHERE user_email = $1', [user_email]);
            if (!result) return res.status(204).send();
            return res.status(200).json(result.rows);
        } catch (e) {
            return res.status(500).send({error: e});
        }
    }

    //Create a todo
    static async apiCreateTodo(req, res) {
        const { user_email, title, status, date } = req.body;

        try {
            const result = await pool.query(`INSERT INTO todos (user_email, title, status, date) VALUES ($1, $2, $3, $4)`,
                [user_email, title, status, date]);
            if (!result) return res.status(204).send();
            return res.status(200).json({
                statusType: "SUCC",
                statusDetails: ""
            })
        } catch (e) {
            return res.status(500).send({error: e})
        }
    }

    //Update a todo
    static async apiUpdateTodo(req, res) {
        const { id } = req.params;
        const { user_email, title, status, date } = req.body;

        try {
            const result = await pool.query(`UPDATE todos SET user_email = $1, title = $2, status = $3, date = $4 WHERE id = $5`,
                [user_email, title, status, date, id]);
            if (!result) return res.status(500).send();
            return res.status(200).json({
                statusType: "SUCC",
                statusDetails: ""
            })
        } catch (e) {
            return res.status(500).send({error: e});
        }
    }

    //Delete a todo
    static async apiDeleteTodo(req, res) {
        const { id } = req.params;

        try {
            const result = await pool.query(`DELETE FROM todos WHERE id = $1`, [id]);
            if (!result) return res.status(500).send();
            return res.status(204).send();
        } catch (e) {
            return res.status(500).send({error: e});
        }
    }
}

export default TaskController;