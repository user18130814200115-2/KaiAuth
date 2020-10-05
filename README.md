# Pin support
This fork exists to add rudimentary pin support to kaiauth. To do this, one must edit the js/pin.js file and set the pin variable to a sha256 hash of any number. More detailed instructions are avaiable under Install.

# KaiAuth

![KaiAuth icon](img/icons/app_112.png)

KaiAuth is a simple Google Authenticator alternative on KaiOS.

# Screenshots

![app_in_launcher](https://kaiauth.zjyl1994.com/img/app_in_launcher.png)
![main_interface](https://kaiauth.zjyl1994.com/img/main_interface.png)
![scan_qrcode](https://kaiauth.zjyl1994.com/img/scan_qrcode.png)
![option_menu](https://kaiauth.zjyl1994.com/img/option_menu.png)
![pin input](https://github.com/user18130814200115-2/KaiAuth/blob/master/Screenshots/Screenshot_inputPin.png?raw=true)
![failed pin](https://github.com/user18130814200115-2/KaiAuth/blob/master/Screenshots/Screenshot_failedPin.png?raw=true)

# Install
- Download the latest release and cxtract first kaiauth.zip and then application.zip
- open the js/pin.js file
- look for the line that says `if (sha256(document.getElementById('pin').value) == "ENTER PIN HERE") {` and replace `ENTER PIN HERE` with a [hash](https://passwordsgenerator.net/sha256-hash-generator/) of your desired four digit pin
  + You can also have a more than four digits. To allow this, look for the line saying `else if (document.getElementById('pin').value.length > 3) {` and change 3 to your pin length-1 (EG. 14 for a fifteen digit pin)

## Omni SD
- Compress all the files inside the application folder (NOT THE APPLICATION FOLDER ITSELF) zip called application.zip.
- Compress aplication.zip and metadata.json into yet another zip called KaiAuth.zip
- Place this file in Internal Storage/downloads and install with omni sd

## Web IDE
- Open WebIDE
- Click "Open Packaged App" and select the folder with your edited version of KaiAuth.
- Click "Install and Run" button.

# More information
For more information please visit https://kaiauth.zjyl1994.com/ .

(Available in 🇺🇸 American English, 🇨🇳 Simplified Chinese, 🇹🇼 Traditional Chinese and 🇭🇰 Cantonese.)
