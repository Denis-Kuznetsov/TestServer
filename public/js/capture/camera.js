function CameraCapture()
{
  var videoStreamUrl = false;

  //var video = $("#video").val();
  var video = document.getElementById('video');
  var allow = document.getElementById('allow');

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  navigator.getUserMedia({video: true}, function (stream) {
    videoStreamUrl = window.URL.createObjectURL(stream);
    video.src = videoStreamUrl;
  }, function () {
    alert('Cannot use camera');
  });

}
