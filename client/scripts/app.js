// YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox'

};
var thisNameVar = invokeThisFunc();

app.init = function() {
  $('#main').find('.username').on('click', function(){
    app.addFriend();
  });
  $('.submit').on('click', function(){
    var message = {};
    // message.text = ;
    console.log("name:", thisNameVar);
    message.username = '' ;

    message.text = $('#messageBox').val();
    // message.username = ;
    console.log('clicked');
    app.send(message);
    //e.preventDefault();
    //app.handleSubmit();

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

// app.send(message);





// message.username = "something";
// // var message = {
// //   username: 'something',
// //   text: document.getElementById('mesageBox').value
// // }

// app.send(message);

// var sendMessage = function(message) {
//   $('#main').prepend('<div>' + )
// }

// var getMessage = function(data) {
//   //for loop to get data.results[i]
//   for(var i = 0; i < data.results.length; i++){
//     $('#main').append('<div> data.results[i].username + data.results[i].text </div>');
//   }
//   //append this data to main
//   //give it a class of messages
//   //sanitize the data when you append it. 
//     //add the username and the text
//     //close off the div tag. 
// }

app.fetch = function() { //send email about edge case.
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
};
app.fetch();

app.clearMessages = function(){
  $('#chats').children().remove();
};

app.addMessage = function(message){
  $('#chats').append('<p class="username">message</p>');
}

app.addRoom = function(roomName){
  $('#roomSelect').append("<p>roomName</p>");
}

app.addFriend = function(){
}

app.handleSubmit = function(){
  console.log("called handleSubmit");
};




    //   it('should try to send a message upon clicking submit', function(){
    //     sinon.spy(app, 'handleSubmit');

    //     $('#message').val('Why so many Mel Brooks quotes?');

    //     app.init();

    //     $('#send .submit').trigger('submit');
    //     expect(app.handleSubmit.calledOnce).to.be.true;

    //     app.handleSubmit.restore();
    //   });
    // });

console.log();