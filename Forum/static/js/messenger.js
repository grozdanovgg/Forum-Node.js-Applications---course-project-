$.getScript("/static/js/socket.io.js", function(func) {
    var socket = io();
    $('.chat').submit(function() {
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function(msg) {
        $('#messages').append($('<li>').text(msg)).scrollTop($("#messages")[0].scrollHeight);
    });
    // alert("Script loaded but not necessarily executed.");

});

// function messenger() {
//     // io();
//     // console.log(socket);
//     console.log('Hey hey');
// }


// $(function() {
//     var socket = io();
//     $('.chat').submit(function() {
//         socket.emit('chat message', $('#m').val());
//         $('#m').val('');
//         return false;
//     });
//     socket.on('chat message', function(msg) {
//         $('#messages').append($('<li>').text(msg)).scrollTop($("#messages")[0].scrollHeight);
//     });
// });
