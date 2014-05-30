
// # email

var path           = require('path')
var templatesDir   = path.resolve(__dirname, '../../assets/templates')
var emailTemplates = require('email-templates')
var nodemailer     = require('nodemailer')

exports = module.exports = email

function email(lib, settings) {
  return {

      sendOneEmail: function(req, res, next) {

        emailTemplates(templatesDir, function(err, template) {

          if (err) {
            console.log(err, '##');
          } else {

            // ## Send a single email

            // Prepare nodemailer transport object
            var transport = nodemailer.createTransport("SMTP", {
              service: "Mandrill", // you can use Gmail/Yahoo etc.
              auth: {
                user: "owner@example.com",
                pass: "user password or api key"
              }
            });

            // An example users object with formatted email function
            var locals = {
              email: 'john@example.com',
              name: {
                first: 'John',
                last: 'Doe'
              }
            };

            // Send a single email
            template('newsletter', locals, function(err, html, text) {
              if (err) {
                console.log(err);
              } else {
                transport.sendMail({
                  from: 'Igloo <chaeze@gmail.com>',
                  to: locals.email,
                  subject: 'This is an email from Igloo!',
                  html: html,
                  // generateTextFromHTML: true,
                  text: text
                }, function(err, responseStatus) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(responseStatus.message);
                  }
                });
              }
            });

            res.send(200, 'Email sent.')
          }
        });
      }
    }
}

exports['@require'] = [ 'lib', 'settings' ];