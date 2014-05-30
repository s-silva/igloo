
//-- package.add('./config/routes.js', 'routes-last', 1) --//

var email = IoC.create('controllers/email')
app.get('/email', email.sendOneEmail)


//-- package.add('./app/views/home.jade', 'content-home', 2) --//
p: a(href='/email') Send Email!