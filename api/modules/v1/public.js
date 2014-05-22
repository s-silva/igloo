/** 
 * Public API Version 1.0
 * Anybody with or without access to authentication
 * system can use these routes.
 */

module.exports = function(server){

  server.version = '1.0.0';
  server.security = 'public';
  
  server.get('/public/foo', function(req, res, next){
    res.send({msg: 'Hey! you called foo'})
  })

  server.get('/public/foo/:id', function(req, res, next){
    res.send({msg: 'Hey! you called foo with ' + req.params.id})
  })

}

