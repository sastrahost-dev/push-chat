# Chat dan Pushnotification PhoneGap Application [![bitHound Score][bithound-img]][bithound-url]

> Sebuah Aplikasi chat dan Pushnotification yang dibangun dengan PhoneGap

## Usage

### Desktop

Karena saat ini masih menggunakan ID saya, maka jika anda ingin mengembangkan sendiri silahkan update dibawah ini
Silahkan edit di js/index.js <= file main untuk semua konfigurasi JS.

	pushNotification.register(app.successHandler, app.errorHandler,{"senderID":"isi_sender_id","ecb":"app.onNotificationGCM"});	
	Silahkan aktifkan sender ID dengan cara signup di google developer dan aktifkan (enable) API GCM pada dashboard.
	
### Build dengan phonegap build, http://build.phonegap.com

[phonegap-cli-url]: http://github.com/phonegap/phonegap-cli
[cordova-app]: http://github.com/apache/cordova-app-hello-world
[nitrous-url]: https://www.nitrous.io/hack_button?source=embed&runtime=nodejs&repo=phonegap%2Fphonegap-start&file_to_open=README.md
[bithound-img]: https://www.bithound.io/github/phonegap/phonegap-start/badges/score.svg
[bithound-url]: https://www.bithound.io/github/phonegap/phonegap-start

