const express = require('express');
const router = express.Router();
const { userRegister, userLogin, changePass, showUser, updateUser } = require('../controllers/user');

// Kullanıcıları Listeleme
router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('user')
        .select('*');

    if (error) {
        return res.status(400).send(error.message);
    }
    res.status(200).send(data);
});

// Kullanıcı Ekleme
router.post('/', userRegister);

// Kullanıcı Güncelleme
router.put('/:id', updateUser);

// Kullanıcı Silme
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('user')
        .delete()
        .eq('id', id);

    if (error) {
        return res.status(400).send(error.message);
    }
    res.status(200).send(data);
});

module.exports = router;
