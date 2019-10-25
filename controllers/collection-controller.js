const {Collection} = require('../models');

const getAll = (req, res) => {
    Collection.findAll({where: {userId: req.userId}})
    .then(collections => {
        res.render('collections/index', {collections});
    })
    .catch(err => {
        console.log(err);
    });
};

const getForm = (req, res) => {
    res.render('collections/create');
}

const post = (req, res) => {
    const {title} = req.body;
    const collection = Collection.build({title, userId:req.userId});
    collection.validate()
    .then(() => {
        return collection.save();
    })
    .then(() => {
        res.redirect('/collections');
    })
    .catch(err => {
        res.render('collections/create', {err});
    })
};

const remove = (req, res) => {
    Collection.findByPk(req.params.id)
    .then(collection => collection.destroy())
    .then(() => res.redirect('/collections'))
    .catch((err) => console.log(err));
};

exports.collectionController = { getAll, getForm, post, remove };