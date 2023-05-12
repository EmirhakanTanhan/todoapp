import pool from '../db.js';

class TagController {

    //Get all tags
    static async apiGetTags(req, res) {
        try {
            const result = await pool.query('SELECT * FROM tags');
            if (!result) return res.status(204).send();
            return res.status(200).json(result.rows);
        } catch (e) {
            return res.status(500).send({error: e});
        }
    }
}

export default TagController;