/** 
 * Private API Version 1.0
 * Only registered users/client apps can access these.
 * Check ./api/Readme.md for more details on auth.
 * process.
 */


module.exports = function(server){

  server.version = '1.0.0';
  server.security = 'private';

  server.get('/private/foo', function(req, res){
    res.send({msg: 'Secret message from foo'})
  })

  server.get('/private/foo/:id', function(req, res){
    res.send({msg: 'Secret message from foo - id: ' + req.params.id})
  })

}

