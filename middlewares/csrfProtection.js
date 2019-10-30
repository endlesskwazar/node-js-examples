const csrf = require('csurf');

const csrfProtection =  () => {
    if (process.env.NODE_ENV === 'test') {
        return csrf({ ignoreMethods: ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'] });
    }
    return csrf({ cookie: true });
}

exports.csrfProtection = csrfProtection;