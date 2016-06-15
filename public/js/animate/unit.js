define('unit', [], function()
{
  var unit = function (nmesh, response_func)
  {
    this.Mesh = nmesh;
    this.ResponseFunc = function(mesh){response_func(mesh)};  
  };
  
  return unit;
});
