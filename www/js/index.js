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
		navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
		pushNotification = window.plugins.pushNotification;
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
		
		alert('receivedEvent Loaded');
		$("#app-status-ul").append('<li>registering ' + device.platform + '</li>');
		if ( device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" ){
			pushNotification.register(
			successHandler,
			errorHandler,
			{
				"senderID":"854409438626",
				"ecb":"onNotification"
			});
		} else if ( device.platform == 'blackberry10'){
			pushNotification.register(
			successHandler,
			errorHandler,
			{
				invokeTargetId : "replace_with_invoke_target_id",
				appId: "replace_with_app_id",
				ppgUrl:"replace_with_ppg_url", //remove for BES pushes
				ecb: "pushNotificationHandler",
				simChangeCallback: replace_with_simChange_callback,
				pushTransportReadyCallback: replace_with_pushTransportReady_callback,
				launchApplicationOnPush: true
			});
		} else {
			pushNotification.register(
			tokenHandler,
			errorHandler,
			{
				"badge":"true",
				"sound":"true",
				"alert":"true",
				"ecb":"onNotificationAPN"
			});
		}
		function successHandler (result) {
			alert('result = ' + result);
		}
		// result contains any error description text returned from the plugin call
		function errorHandler (error) {
			alert('error = ' + error);
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
