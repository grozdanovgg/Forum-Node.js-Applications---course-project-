/* globals $, io  */

const user = $('.navbar-nav').children().children()[0].innerText;

$.getScript('/static/js/socket.io.js', () => {
    const socket = io();
    // Client side emit data to server to catch - continue in app.js to handle.
    $('.chat').submit(function() {
        socket.emit('chat message', { user: user, message: $('#m').val() });
        $('#m').val('');
        return false;
    });
    // Handle emmitted data from server with the same event name
    socket.on('chat message', (msgData) => {
        $('#messages')
            .append($('<li>').text(`${msgData.user}: ${msgData.message}`))
            .scrollTop($('#messages')[0].scrollHeight);
    });
});
