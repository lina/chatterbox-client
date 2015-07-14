

// YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox'

};

app.init = function() {

  $('.username').on('click', function(){
    app.addFriend();
  });

  $('.submit').on('click', function(){
    var message = {};
    
    message.username = $('#userNameBox').val();
    message.text = $('#messageBox').val();
    message.roomName = '';

    app.send(message);
  });

  $('.roomSubmit').on('click', function(){
    var roomNameToAdd = $('#roomNameInput').val();
    app.addRoom(roomNameToAdd);

  });

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




app.fetch = function() { //send email about edge case.
  // setInterval(function() {
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      success: function(data){
        for(var i = 0; i < data.results.length; i++){
          $('#main').append('<div>' + 'Username:' +escapeHtml(data.results[i].username) + '  Message:' + escapeHtml(data.results[i].text) + '</div>');
        }
      }, 
      error: function(){

      }
    });    
  // }, 100) //setInterval
};

app.fetch();

app.clearMessages = function(){
  $('#chats').children().remove();
};

app.addMessage = function(message){
  $('#chats').append('<p class="username">message</p>');
}

app.addRoom = function(roomName){
  console.log("executed .addRoom");
  $('#drop-nav').append('<option class="room" name=' + roomName + '>' + roomName + '</li>');
}


app.addFriend = function(){
}

app.handleSubmit = function(){
};

