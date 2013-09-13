(function() {

    /**
     * TELNET CLIENT
     * author: andre@andregarzia.com
     *
     * This is a minimal telnet client that is able to connect and interact with telnet servers. It does not support
     * ANSI or other control characters. It serves only to demonstrate the TCP Sockets API.
     *
     * TCP Sockets https://developer.mozilla.org/en-US/docs/WebAPI/TCP_Socket
     *
     * It uses jQuery Mobile for its UI.
     */

    var socket;
    var terminal = document.querySelector("#terminal");

    /**
     * Asks the user for a server and port then connect to it. It register some callbacks for possible event handlers
     * on the socket. Most telnet servers start sending data as soon as you connect.
     */
    function connectToServer() {
        var server = prompt("Server Address", "mud.darkerrealms.org");
        var port = prompt("Server Port", "2000");

        socket = navigator.mozTCPSocket.open(server, port);

        socket.ondata = function (event) {
            if (typeof event.data === 'string') {
                console.log(event.data);
                terminal.innerHTML = "<pre>"+event.data+"</pre>" ;


            } else {
                console.log('Get a Uint8Array');
            }
        };

        socket.onerror = function(event) {
            console.log("error");
            terminal.innerHTML = "<pre>Error: "+event.type+"</pre>";
        };

        socket.onopen = function() {
            console.log("error");
            terminal.innerHTML = "<pre>Connected!</pre>";
        };

        socket.onclose = function() {
            console.log("error");
            terminal.innerHTML = "<pre>Closed!</pre>";
        };


    }

    /**
     * Prompts the user for a string to send to the server and writes that string to the socket.
     */
    function sendCommand() {
        var command = prompt("Command To Send", "");

        console.log("sending command: " + command);

        command += "\r\n";

        socket.send(command);
    }

    /**
     * Disconnects from remote server.
     */
    function disconnectFromServer() {
        socket.close();
        terminal.innerText = "Closed.";
    }




    /**
     * This is our initialization function, like an onload function but provided by jQuery Mobile. This will fire
     * after everything load and the page is assembled.
     *
     * It binds the buttons to the correct functions.
     */
    $( document ).on( 'pageinit', function(){
        console.log("starting app...");
        document.getElementById("connect-to-server").addEventListener("click", connectToServer);
        document.getElementById("send-command").addEventListener("click", sendCommand);
        document.getElementById("close-connection").addEventListener("click", disconnectFromServer);

    });

}());

