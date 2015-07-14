

// YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox'

};

app.init = function() {

  $('.username').on('click', function(){
    app.addFriend();
  });

  // for (var i =0 ; i < 50000; i++) {
  //       var message = {};
    
  //   message.username = ;
  //   message.text = "fucking stop spamming";
  //   message.roomname = $('.room').val() || undefined;

  //   app.send(message);
  // }

  $('.submit').on('click', function(){
    var message = {};
    
    message.username = $('#userNameBox').val();
    message.text = $('#messageBox').val();
    message.roomname = $('.room').val() || undefined;

    app.send(message);
  });

  $('.roomSubmit').on('click', function(){
    var roomnameToAdd = $('#roomnameInput').val();
    app.addRoom(roomnameToAdd);

  });

  $('#main').find('.room').append('<option>' +  + '</option>');

};


$('document').ready(function(){
  app.init();


});

app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    } 
  });
};



var roomnameArray;

app.fetch = function() { //send email about edge case.
  var roomnameArrayoutsideAjax;
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      success: function(data){
        for(var i = 0; i < data.results.length; i++){
          $('#main').append('<div>' + 'Username:' +escapeHtml(data.results[i].username) + 
            '  Message:' + escapeHtml(data.results[i].text) +  
            ' Room: ' + escapeHtml(data.results[i].roomname) +
            '</div>' );
        }

        // For room names

        var roomnameStore = {};
        var currentRoomname = [];
        roomnameStore[data.results[0].roomname] = true;
        for(var i = 1; i < data.results.length; i++){
          currentRoomname = data.results[i].roomname;

          for(var room in roomnameStore){
            if(!(currentRoomname in roomnameStore)) {
              roomnameStore[currentRoomname] = true;
            }
          }  
        }

        roomnameArray = [];

        for(var key in roomnameStore){
          roomnameArray.push(key);
        }

      }, 
      error: function(){

      }
    });
  setTimeout(function() {console.log('settimeout', roomnameArray)}, 300)
    
};
app.fetch();

app.clearMessages = function(){
  $('#chats').children().remove();
};

app.addMessage = function(message){
  $('#chats').append('<p class="username">message</p>');
}

app.addRoom = function(roomname){
  // console.log("executed .addRoom");
  $('#drop-nav').append('<option class="room" name=' + roomname + '>' + roomname + '</option>');
}


app.addFriend = function(){
}

app.handleSubmit = function(){
};


setTimeout(function(){
  for (var i = 0 ; i < roomnameArray.length; i++) {
    var nameToAppend = roomnameArray[i];
    // $('#drop-nav').append('<option class="room" value=' + i +  ' name=' + nameToAppend + '>' + nameToAppend + '</option>');
    $('#drop-nav').append('<option class="room" name=' + nameToAppend + '>' + nameToAppend + '</option>');

  }
}, 5000); 
// 

// $("#drop-nav").find(".room").

// $( "li" ).filter( ":even" ).css( "background-color", "red" );


var dropOptions = document.getElementById("drop-nav");
// var selectedValue = dropOptions.options[dropOptions.selectedIndex].name;
// console.log(selectedValue);
