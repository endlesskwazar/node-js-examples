const {Book, Collection} = require('../models');

const getAll = (req, res) => {
    Collection.findAll({
        where: {
            userId: req.userId
        },
        include: [{all:true}]
    })
    .then(collections => {
        const books = [];
        collections.forEach(collection => {
           if(collection.Books) {
               books.push({
                   collection: collection.title,
                   data: [...collection.Books]
               });
           }
        });
        res.render('books/index', {books});
    })
    .catch(err => {
        console.log(err);
    });
}

const getForm = (req, res) => {
    Collection.findAll({where: {userId:req.userId}})
    .then(collections => {
        res.render('books/create', {collections, csrfToken: req.csrfToken()});
    })
    .catch(err => {
        console.log(err);
    });
}

const post = (req, res) => {
    const {title, collection, authors, review} = req.body;
    const book = Book.build({
        title, collectionId:collection, authors, review
    })
    book.validate()
    .then(() => {
        return book.save()
    })
    .then(() => {
        res.redirect('/books');
    })
    .catch(err => {
        console.log(err);
    });
}

const getUpdate = async (req, res) => {
    try {
        const book = await Book.findOne({where: {id: req.params.id}, include: [{all: true}]});
        const collections = await Collection.findAll({where:{userId: req.userId}});
        res.render('books/update', {book, collections});
    }
    catch(e) {
        console.log(e);
    }
}

const put = (req, res) => {

}

const remove = (req, res) => {
    Book.findByPk(req.params.id)
    .then(book => book.destroy())
    .then(() => res.redirect('/books'))
    .catch((err) => console.log(err));
}

exports.bookController = { getAll, getForm, post, getUpdate, put, remove };