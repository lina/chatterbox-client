

// YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox'
}; //app

var users;
window.friends = {};

app.init = function() {

  $(".users").click(function() {
      // console.log("id = " + $(this).attr("id")); 
      // console.log("name = " + $(this).attr("name")); 
      console.log("this", $(this)); 
      // console.log("class = " + $(this).attr("class"));
  }); //users.click()


  // $('.username').on('click', function(){
  //   app.addFriend();
  // });

  var selectedOption;
  $('.roomSelectSubmit').on('click', function() {
    selectedOption = $('#drop-nav').find('option:selected').text();
    console.log('selectedOption', selectedOption);
  });

  $('.submit').on('click', function(){
    var message = {};
    
    message.username = $('#userNameBox').val();
    message.text = $('#messageBox').val();
    selectedOption = $('#drop-nav').find('option:selected').text();

    message.roomname = selectedOption || undefined;

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
  $(document).on('click','.username', function(){
    var username = $(this).text();
    // console.log('clicked username:'+username);
    if(!window.friends.hasOwnProperty(username)) {
      window.friends[username] = true;
      console.log("I want to add user: ", username);
    } else {
      console.log("oops, you already added this user")
    } //if
  });
  // $('.username').on('click', function(){
  //   var username = $(this).text();
  //   console.log('clicked');
  // });

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
    success: function(data){ //callback function
      // console.log('success');
      window.data = data;
      for(var i = 0; i < data.results.length; i++){
        var post = data.results[i];
        var usernameset = post['username'] || 'anonymous';

        var $user = $('<span class="username"></span>').append(usernameset);
        var $message = $('<span class="message"></span>').append(":  "+post['text']);
          
        
        if(!window.friends[post['username']]){
          var $container = $('<div class="friend"></div>');
          // console.log("there")
        }else{
          // console.log(window.friends);
          var $container = $('<div class="friend"></div>');
          // console.log('here');
        }
        $container.append($user).append($message);

        $('#main').append($container);

        // $('#main').append('<div class="users"><div class="' + escapeHtml(data.results[i].username) +'">' + 'Username:' +escapeHtml(data.results[i].username) + 
        //   '  Message:' + escapeHtml(data.results[i].text) +  
        //   ' Room: ' + escapeHtml(data.results[i].roomname) +
        //   '</div>\r\r' + '<button class="' + escapeHtml(data.results[i].username) + '">' + 'add friend </button></div>');
      } //for

      // if(window.friends) {
      //   // console.log(window.friends);
      //   for (var key in window.friends) {
      //     $('#main').prepend('<div class="friendAdd">' + key + '</div>');
      //   }
      // } //if

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
      };

      $('.roomSelectSubmit').on('click', function() {
        selectedOption = $('#drop-nav').find('option:selected').text();
        $( "#main > div:not(:contains('Room: "+ selectedOption + "'))" ).remove();
      });

      $('.showFriendsPost').on('click', function() {

        // selectedOption = $('#drop-nav').find('option:selected').text();
        for (var friend in window.friends) {
          $("#main > div:contains(" + friend + ")").css("text-decoration", "bold");
        }
        // $( "#main > div:not(:contains('Room: "+ selectedOption + "'))" ).remove(); //remove laterXXX
      });

      // $( "div:contains('John')" ).css( "text-decoration", "underline" );

      $('.seeAllSubmit').on('click', function() {
        for(var i = 0; i < data.results.length; i++){
          $('#main').append('<div>' + 'Username:' +escapeHtml(data.results[i].username) + 
            '  Message:' + escapeHtml(data.results[i].text) +  
            ' Room: ' + escapeHtml(data.results[i].roomname) +
            '</div>' );
        }
      });
    }, 
     error: function(){
    } //
  });
  // setTimeout(function() {console.log('settimeout', roomnameArray)}, 300)
    
}; // app.fetch()

app.fetch();
setInterval(function(){
  app.fetch();

}, 1000);

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


app.addFriend = function(evt){
  // var username = $("div .users").attr('class');
  // console.log("username", username);
  // if (username !== undefined) {
  //   console.log('chatterbox: Adding %s as a friend', username);

  //   // Store as a friend
  //   app.friends[username] = true;

  //   // Bold all previous messages
  //   // Escape the username in case it contains a quote
  //   var selector = '[data-username="'+username.replace(/"/g, '\\\"')+'"]';
  //   var $usernames = $(selector).addClass('friend');
  // }
}
app.addFriend();
// //start
// addFriend: function(evt) {
//   var username = $(evt.currentTarget).attr('data-username');

//   if (username !== undefined) {
//     console.log('chatterbox: Adding %s as a friend', username);

//     // Store as a friend
//     app.friends[username] = true;

//     // Bold all previous messages
//     // Escape the username in case it contains a quote
//     var selector = '[data-username="'+username.replace(/"/g, '\\\"')+'"]';
//     var $usernames = $(selector).addClass('friend');
//   }
// },
// //end

app.handleSubmit = function(){
};


setTimeout(function(){
  for (var i = 0 ; i < roomnameArray.length; i++) {
    var nameToAppend = roomnameArray[i];
    // $('#drop-nav').append('<option class="room" value=' + i +  ' name=' + nameToAppend + '>' + nameToAppend + '</option>');
    $('#drop-nav').append('<option class="room" name=' + nameToAppend + '>' + nameToAppend + '</option>');

  }
}, 1000); 


$(function(){

});




// $('#main .addFriend').on('click', function() {
//   var userNameGet = $(this).context.className;
  
//   console.log('HERE');

//   if(!window.friends.hasOwnProperty(userNameGet)) {
//     window.friends[userNameGet] = true;
//     console.log("I want to add user: ", userNameGet);
//   } else {
//     console.log("oops, you already added this user")
//   } //if

// }); //button.click()

    // array.push(userNameGet);
    // var gettingClass = $(this)[0];
    // var classNameGet = $('this?').find('.unicorn').val();
    // console.log('gettingClass', gettingClass);
    // console.log("test", $(this).context.className);
    // console.log('classNameGet', classNameGet);
    // var className = $('div').attr('class');
    // console.log($('div').attr('class'));
    // console.log('clicked something');

//setInterval this shit
// if(window.friends) {
//   for (var key in window.friends) {
//     $('div .friends').append('<li>' + key + '</li>');
//   }
// }

// setTimeout(function() {
//   if(window.friends) {
//     console.log("")
//     for (var key in window.friends) {
//       $('#main').prepend('<div class="friendAdd">' + key + '</div>');
//     }
//   }
// }, 500);


// $("p").click(function(){
//     alert("The paragraph was clicked.");
// });

// on('click', function() {
//   console.log('triggered');
// })


// for(var i = 0; i < data.results.length; i++){
//   $('#main').append('<div class="users"><div class="' + escapeHtml(data.results[i].username) +'">' + 'Username:' +escapeHtml(data.results[i].username) + 
//     '  Message:' + escapeHtml(data.results[i].text) +  
//     ' Room: ' + escapeHtml(data.results[i].roomname) +
//     '</div>\r\r' + '<button class="' + escapeHtml(data.results[i].username) + '">' + 'add friend </button></div>');
// }