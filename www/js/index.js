/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		pushNotification = window.plugins.pushNotification;
		navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
    },
	onSuccess: function(position){ 
		var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          + position.timestamp                    + '<br />';
	},
	onError: function(error){  
		alert('code: '    + error.code    + '\n' +   'message: ' + error.message + '\n');
	},
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
		
		alert('receivedEvent '+device.platform);
		var pushNotification = window.plugins.pushNotification;
		$("#app-status-ul").append('<li>registering ' + device.platform + '</li>');
		pushNotification.register(app.successHandler, app.errorHandler,{"senderID":"854409438626","ecb":"app.onNotificationGCM"});		
    },
	// result contains any message sent from the plugin call
	successHandler: function(result) {
		alert('Callback Success! Result = '+result)
	},
	errorHandler:function(error) {
		alert(error);
	},
	onNotificationGCM: function(e) {
		alert("In the onNotificationGCM " + e.event);
		switch( e.event )
		{
			case 'registered':
				if ( e.regid.length > 0 )
				{
					console.log("Regid " + e.regid);
					alert('registration id = '+e.regid);
				}
				break;

			case 'message':
				// this is the actual push notification. its format depends on the data model from the push server
				alert('message = '+e.message+' msgcnt = '+e.msgcnt);
				break;

			case 'error':
				alert('GCM error = '+e.msg);
				break;

			default:
				alert('An unknown GCM event has occurred');
				break;
		}
	}
};
// notif event
(function($){
$(document)
// Login
.ready(function()
{	
	$('#close').click(function()
	{
		$("#hasil").hide("slow");
		$("#close").hide("slow");
	})
	$('#cek').click(function()
	{
		var origin = rootUrl + 'cekApp.php';
		var dataString = 'token=true';
		$.ajax({
		type: "POST",
		url: '',
		data: dataString,
		cache: false,
		beforeSend: function(){ $("#cek").text('Connecting...');},
		success: function(data){
		if(data != "false"){
			//alert(data);
			$("#cek").text('Cek Lagi');
			$("#hasil").show("slow");
			$("#close").show("slow");
			$("#hasil").html("<h3>"+data+"</h3>");
			//alert('harusnya bisa');
		}else{
			$("#hasil").html("<span style='color:#cc0000'>Error:</span> Invalid email and password. ");
			//alert('API nya gagal');
		}
	  },
	  error: function(XMLHttpRequest, textStatus, errorThrown) {
		alert(textStatus);
	  }
	});
	return false;
 });
})  
})(jQuery);
