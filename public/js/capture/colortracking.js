function screentracker ()
{
  var self = this;

  self.X = 0;
  self.Y = 0;
  self.W = 0;
  self.H = 0;
     
  self.TrackColor = function()
  {

    var colors = new tracking.ColorTracker(["magenta"]);
    colors.on('track', function (e)
    {
      if (e.data.length === 0)
        ;//console.log('Cannot find any color');
      else
      {
        e.data.forEach(function (rect)
        {
          self.X = rect.x;
          self.Y = rect.y;
          self.W = rect.width;
          self.H = rect.height;
        })
      }
    });

    tracking.track("#video", colors);
  }
}