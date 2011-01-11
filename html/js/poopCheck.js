var yesOptions = [
  "Give him a call and ask how it's going!",
  "Yep!",
  "Yes! :D",
  "Awwwwwwwww yeahhhhhhh!"
];
var noOptions = [
  "No :(",
  "Sadly no...",
  "No, but he can't hold out forever",
  "No. Stay vigilant, friend!",
  "It's bound to come out sooner or later..."
];

var maxPoopTimeInMinutes = 10;
var minPoopTimeInMinutes = 5;
var poopTimeInMinutes = minPoopTimeInMinutes + (Math.random() * (maxPoopTimeInMinutes - minPoopTimeInMinutes));
var poopTimeInMilliseconds = poopTimeInMinutes * 60 * 1000;

/**
 * @todo  Implement error handling.
 */
$(document).ready( function() {
  $.ajax({
    url:'http://api.twitter.com/1/statuses/user_timeline.json?callback=?',
    data:{
      screen_name:'isdougpooping'
    },
    success:parseTweets,
    dataType:'json'
  });
});

function parseTweets(data,status,request)
{
  var lastTweet = data[0];
  
  if(lastTweet.error)
  {
    $('#poopingStatus').html(lastTweet.error);
    return;
  }
  
  var createdAtDate = new Date(lastTweet.created_at);
  var currentDate = new Date();
  var timeDiffInMilliseconds = currentDate.getTime() - createdAtDate.getTime();
  
  if(poopTimeInMilliseconds > timeDiffInMilliseconds)
  {
    $('#poopingStatus').html(yesOptions[Math.floor(Math.random() * (yesOptions.length))] + '<br/><span style="font-size:18px">@<a href="http://twitter.com/' + lastTweet.user.screen_name + '">' + lastTweet.user.screen_name + "</a>: " + lastTweet.text + '</span>');
  }
  else
  {
    var hour = createdAtDate.getHours() > 11 ? createdAtDate.getHours() - 12 : createdAtDate.getHours();
    var am = createdAtDate.getHours() < 12;
    if(hour == 0) hour = 12;
    $('#poopingStatus').html(noOptions[Math.floor(Math.random() * (noOptions.length))] + '<br/><span style="font-size:18px">Last poop at ' + hour.toString() + ':' + (createdAtDate.getMinutes() < 10 ? '0' + createdAtDate.getMinutes() : createdAtDate.getMinutes()) + (am ? ' AM' : ' PM') + ' on ' + (createdAtDate.getMonth() + 1) + '/' + createdAtDate.getDate() + '/' + createdAtDate.getFullYear() + '</span>');
  }
}