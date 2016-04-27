$(document).ready(function() {
    typeInOut();
});

var colors = ['#FFB74D', '#4DD0E1'];
var active = 0;
var screenSize = document.documentElement.clientWidth;

function typeInOut(){
      $("#inout").typed({
        strings: ["in", "out"],
        typeSpeed: 75,
        backDelay: 5000,
        loop:true,
        onStringTyped: function() {
        	document.querySelector('body').style.background = colors[active];
          document.querySelector('.about').style.color = colors[active];
          document.querySelector('.alert').style.color = colors[active];
          document.querySelector('#begintimer').style.color = colors[active];
    active++;
    if (active == colors.length) active = 0;
        },

      });
  }

var newNum = '';
var oldNum = '';
var quotesArr = ["Be like water. –Bruce Lee", "You aren’t stuck in traffic. You are traffic.", "The man who moves a mountain begins by carrying away small stones. –Confucius","Life is a journey, not a destination. –Ralph Waldo Emerson", "We cannot see our reflection in running water. It is only in still water that we can see.","When I let go of what I am, I become what I might be. –Lao Tzu","Being busy is most often used as a guise for avoiding the few critically important but uncomfortable actions. –Tim Ferriss","If a problem is fixable,there is no need to worry. If it’s not fixable, then there is no benefit in worrying whatsoever. –Dalai Lama","The person who says it cannot be done should not interrupt the person who is doing it.","Turn your face towards the sun, and the shadows fall behind you.","A smooth sea never made a skilled sailor.","Death smiles at us all. All a man can do is smile back.","Everything in moderation."];

function accessQuote() {
	while (newNum == oldNum) {
		newNum = Math.floor(Math.random() * quotesArr.length);
	}
	oldNum = newNum;
  $('.quote').html('<br><i class="fa fa-twitter" id="tweet" aria-hidden="true"></i><div class="ghost"></div>');
	$('.quote').prepend(quotesArr[newNum]);
	$('.quote').fadeIn(1000);
  if (screenSize < 1025) {
    $("#tweet").replaceWith('<a target="_blank" href="http://twitter.com/intent/tweet?text='+quotesArr[newNum]+' via adamelnaggar.github.io/breathe"><i class="fa fa-twitter" id="tweet" aria-hidden="true"></i></a>');
    $("#tweet").css("opacity", "1");
  }
}

function fadeInQuote() {
	if ($(".quote").html().length < 90) {
		$('.quote').fadeOut(1, accessQuote);
	}
	else {
		$('.quote').fadeOut(1000, accessQuote);
	}
}
if (screenSize > 1024) {
  $('.quote').hover(function(){
    $("#tweet").replaceWith('<a target="_blank" href="http://twitter.com/intent/tweet?text='+quotesArr[newNum]+' via adamelnaggar.github.io/breathe"><i class="fa fa-twitter" id="tweet" aria-hidden="true"></i></a>');
    $("#tweet").fadeIn(500);
  },function(){
    $("#tweet").fadeOut(500);
  });
}

var minutes = $(".minutenumber").html();
var beginSound = new Audio('start.wav');
var completeSound = new Audio('complete.wav');
var running = false;

function increaseMinutes() {
  minutes++;
  $(".minutenumber").html(minutes);
  if (minutes > 9) {
    $(".minutenumber").css("right", "3.5px");
    $(".units").css("margin-left", "8px");
  }
}
function decreaseMinutes() {
  if (minutes > 1) {
    minutes--;
  }
  if (minutes < 10) {
    $(".minutenumber").css("right", "0px");
    $(".units").css("margin-left", "0px");
  }
  $(".minutenumber").html(minutes);
}

function getReady() {
  var count = 10;
  $('.countdown').html('Get comfortable, timer starting in ' + count + ' seconds.');
  $(".countdown").fadeIn(1000);
  var a = setInterval(function(){ 
    count--;
    $('.countdown').html("Get comfortable, timer starting in " + count + " seconds.");
  }, 1000);
  setTimeout(function(){
    clearInterval(a);
    beginSound.play();
    actualTimer(minutes);
  }, 10000);
}

function actualTimer(mins){
  if (mins < 10) {
    $('.countdown').html("0"+mins+":00");
  }
  else {
    $('.countdown').html(mins+":00");
  }
  var totalSeconds = mins*60;
  var b = setInterval(function(){ 
    totalSeconds--;
    if (totalSeconds < mins*60-60) {
      mins--;
    }
    var displayed;
    if (mins < 11) {
      displayed = "0" + (mins-1);
    }
    else {
      displayed = mins-1;
    }
    if (totalSeconds%60 > 9) {
      $('.countdown').html(displayed+":"+totalSeconds%60);
    }
    else {
      $('.countdown').html(displayed+":0"+totalSeconds%60);
    }
  }, 1000);
  setTimeout(function(){
    clearInterval(b);
    $('.countdown').html("Thank you. Come back anytime.");
    completeSound.play();
    running = false;
  }, totalSeconds*1000);
}

$("#inspire").on('click', fadeInQuote);

$("#aboutmenu").on('click', function() {
  $(".removeforabout").fadeOut(1000);
  setTimeout(function() {
    $(".about").fadeIn(1000);}, 1001);
});

$(".close").on('click', function() {
  $(".about").fadeOut(1000);
  setTimeout(function() {
    $(".removeforabout").fadeIn(1000);}, 1001);
});

$("#timermenu").on('click', function() {
  if (running === false) {
    if ($(".countdown").html() === "") {
      $(".innersection").fadeIn(1000);
    }
    else {
      $(".countdown").fadeOut(1000);
      setTimeout(function(){
        $(".innersection").fadeIn(1000);
      }, 1001);
    }
  }
  else {
    $(".alert").fadeIn(1000);
    setTimeout(function(){
      $(".alert").fadeOut(1000);
    },1500);
  }
});

$("#increase").on('click', increaseMinutes);
$("#decrease").on('click', decreaseMinutes);

$("#begintimer").on('click', function() {
  $(".innersection").fadeOut(1000);
  running = true;
  setTimeout(getReady, 1001);
});