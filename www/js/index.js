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
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		//alert('receivedEvent '+device.platform);
		var pushNotification = window.plugins.pushNotification;
		pushNotification.register(app.successHandler, app.errorHandler,{"senderID":"1094004461627","ecb":"app.onNotificationGCM"});		
    },
	// result contains any message sent from the plugin call
	successHandler: function(result) {
		alert('Tunggu hingga ada pemberitahuan berhasil '+result)
	},
	errorHandler:function(error) {
		alert(error);
	},
	onNotificationGCM: function(e) {
		//alert("In the onNotificationGCM " + e.event);
		switch( e.event )
		{
			case 'registered':
				if ( e.regid.length > 0 )
				{
					localStorage.setItem('regid',e.regid);
					alert('Berhasil!! registration id = '+e.regid);
				}
				break;
			case 'message':
				// this is the actual push notification. its format depends on the data model from the push server
				alert('message = '+e.message+' Dari = '+e.msgcnt);
					navigator.notification.alert(
						'You are the winner!',  // message
						alertDismissed,         // callback
						'Game Over',            // title
						'Done'                  // buttonName
					);

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
	function registerID(id,name){
		var rootUrl = 'http://api.dicoba.net/api/';
		var origin = rootUrl + 'example/uuidReg';
		var regid = getCookie('regid');
		var dataString = 'name='+name+'&regid='+regid;
		$.ajax({
			type: "POST",
			url: origin,
			data: dataString,
			cache: false,
			beforeSend: function(){ },
			success: function(data){
			if(data != "false"){
				
			}else{
			
			}
		  },
		  error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(textStatus);
		  }
		});
	}
	function pushNotif(id,name,msg){
		var rootUrl = 'http://api.dicoba.net/api/';
		var origin = rootUrl + 'example/push';
		var dataString = 'id='+id+'&name='+name+'&msg='+msg;
		$.ajax({
			type: "POST",
			url: origin,
			data: dataString,
			cache: false,
			beforeSend: function(){ },
			success: function(data){
			if(data != "false"){
				
			}else{
			
			}
		  },
		  error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(textStatus);
		  }
		});
	}
	function getCookie(name){
		return localStorage.getItem(name);
	}
  
	
	function makecokies(key,val){
		localStorage.setItem(key,val);
	}
	
	function delcokies(key){
		localStorage.removeItem(key);
	}
	
	function pindahPage(link){	
		$.mobile.changePage( link, { 
			transition: "fade", 
			changeHash: true,
			reloadPage:false			
		});			
	}
(function($){
$(document)
.on('click','#changename',function(e){
	delcokies('name');
	pindahPage('#index');
})
.on('click','#PopupShow',function(e){
	var img = $(this).attr('src');
	$('#showimagepopup').attr( "src", img);
	$( "#imagePopup" ).popup( "open" );
})
.on('pageinit', function () { 
	// variable session	
	function isLoged(){
	var name = getCookie('name');
		if($.trim(name).length > 0){
			//alert(name);
			return true;
		}else{
			return false;
		}
	}
	$('[data-role=page]').on('pageshow', function (event, ui) {
		var pageAct = $('body').pagecontainer( 'getActivePage' ).attr( 'id' );
		if(isLoged() && pageAct === 'index'){
			alert('Loged In');
			pindahPage('#chat');
		}
	})
})
.ready(function()
{
	
	var messagesRef = new Firebase('https://sizzling-fire-2271.firebaseio.com/');
	$('#clearMsg').on('click',function (e) {	
		var ok = confirm("Yakin dihapus?");
		if(ok == true){			
			$('#messagesDiv').html('');
			messagesRef.remove();
		}		
	})
	$('#getregid').on('click',function (e) {	
		alert(getCookie('regid'));
	})
	
	function readImage(input) {
		if ( input.files && input.files[0] ) {
			var FR= new FileReader();
			FR.onload = function(e) {
				makecokies('messageImg',e.target.result);
			};       
			FR.readAsDataURL( input.files[0] );
		}
	}
	$("#messageImg").change(function(){
		var img =  readImage( this );
	});
	$('#sendMsg').on('click',function (e) {		
		if($.trim($('#messageInput').val()).length>0){
			var name = getCookie('name');
			var text = $('#messageInput').val();
			var idLawan = getCookie('idLawan');
			var image = getCookie('messageImg');
			if(image != 'undefined'){
				messagesRef.push({name:name, text:text,idlawan:idLawan,image:image});
			}else{
				messagesRef.push({name:name, text:text,idlawan:idLawan});
			}
			delcokies('messageImg');
			$('#messageInput').val('');	
			$('html, body, #messagesDiv').animate({ 
			   scrollTop: $(document).height()-$(window).height()}, 
			   250
			);
			pushNotif(getCookie('regid'),name,text);
		}
    })
	$('#messageInput').keypress(function (e) {
		if(e.which == 13 && $.trim($('#messageInput').val()).length>0){
			var name = getCookie('name');
			var text = $('#messageInput').val();
			var idLawan = getCookie('idLawan');
			var image = getCookie('messageImg');
			if(image != 'undefined'){
				messagesRef.push({name:name, text:text,idlawan:idLawan,image:image});
			}else{
				messagesRef.push({name:name, text:text,idlawan:idLawan});
			}
			delcokies('messageImg');
			$('#messageInput').val('');	
			$('html, body').animate({ 
			   scrollTop: $(document).height()-$(window).height()}, 
			   250
			);			
			pushNotif(getCookie('regid'),name,text);
			return false;
		}
    })
	 // Add a callback that is triggered for each chat message.
	messagesRef.on('child_added', function (snapshot) {
		 $("#messageInput").focus();
		var message = snapshot.val();
		if(message.name === getCookie('name')){
			var green = 'bubble--alt';
		}else{
			var green = '';
		}
		if($.trim(message.image).length>0){
			var hide = '';
		}else{
			var hide = 'none';
		}
		makecokies('idLawan',message.idlawan);
		var resultMSG = '<p class="bubble '+green+'"><span style="color:#3617FF">'+message.name+' :</span> '+message.text+'<br /><img id="PopupShow" class="'+hide+'" src="'+message.image+'" style="width:100px;height:100px;"></p>';
		$('#messagesDiv').append(resultMSG).animate({scrollTop: $(document).height()},"slow");	
	})
	$(window).load(function() {
	  $("html, body").animate({ scrollTop: $(document).height() }, 1000);
	});
	$('#registerName').click(function(e){
		e.stopPropagation();
		e.preventDefault();
		if($.trim($('#name').val()).length>0){
			var name = $('#name').val();	
			makecokies('name',name);
			registerID(getCookie('regid'),name);
			pindahPage("#chat");
		}else{
			alert('Isi nama lo!');
		}
	})
	$('#regidShow').click(function()
	{
		alert(getCookie('regid'));
	})
	$('#regidPush').click(function()
	{
		var rootUrl = 'http://api.dicoba.net/api/';
		var origin = rootUrl + 'example/push';
		var regid = getCookie('regid');
		var dataString = 'id='+regid;
		$.ajax({
		type: "POST",
		url: origin,
		data: dataString,
		cache: false,
		beforeSend: function(){ $("#regidPush").text('Connecting...');},
		success: function(data){
		if(data != "false"){
			//alert(data);
			$("#cek").text('Cek Lagi');
			$("#hasil").html("<h3>"+data.why+"</h3>");
			//alert('harusnya bisa');
			$("#regidPush").text('Push Now');
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
