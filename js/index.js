window.addEventListener('DOMContentLoaded', function () {
    setInterval(updateRemaining, 1000);
    var mainlist = document.getElementById('authcodes');
    var authcodes = [], selectIndex = 0;
    var shortCodeBuffer = '';
    var shortCodeActive = false;
    init();
    // functions
    function init(){
        if(window.localStorage.getItem("authcodes")!=null){
            authcodes = JSON.parse(window.localStorage.getItem("authcodes"));
        }else{
            authcodes = [];
        }
        refreshCodeList();
        updateRemaining();
    }
    function updateRemaining() {
        let remain = window.otplib.authenticator.timeRemaining();
        document.getElementById('softkey-center').innerText = `Next in ${remain}s`;
        if (remain === 30) {
            refreshCodeList();
        }
    }
    function refreshCodeList() {
        mainlist.innerHTML = '';
        if(authcodes.length > 0){
            authcodes.forEach(element => {
                let code = window.otplib.authenticator.generate(element.secret);
                let item = document.createElement('div');
                item.dataset.id = element.id;
                item.innerHTML = `<p class="code-row">${numberWithSpaces(code)}</p><p class="name-row">${element.name}</p>`;
                item.classList.add('authcode-item');
                mainlist.appendChild(item);
            });
            selectItemByIndex();
        }
    }
    function selectItemByIndex() {
        [].forEach.call(mainlist.children, function (el) {
            el.classList.remove('active');
        });
        if (selectIndex > (authcodes.length - 1)) selectIndex = 0;
        let activeElem = mainlist.children[selectIndex];
        activeElem.classList.add('active');
        activeElem.scrollIntoViewIfNeeded(false);
    }
    function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    // key
    window.addEventListener('keydown', function (e) {
        switch (e.key) {
            case 'ArrowUp': //scroll up
            case 'ArrowLeft':
                selectIndex--;
                if (selectIndex < 0) selectIndex = authcodes.length - 1;
                selectItemByIndex();
                break;
            case 'ArrowDown': //scroll down
            case 'ArrowRight':
                selectIndex++;
                if (selectIndex > (authcodes.length - 1)) selectIndex = 0;
                selectItemByIndex();
                break;
            case 'SoftLeft':
                var qrcode = new MozActivity({
					name: 'com.zjyl1994.kaiauth.addCode'
				})
				qrcode.onsuccess = function () {
					qrcodeContent = this.result;
                    alert(qrcodeContent);
				}
                break;
            case 'SoftRight':
                var authcodeActiveItem = document.getElementsByClassName('active')[0].dataset.id;
                var result = confirm("Are you sure?");
                if(result == true){
                    authcodes = authcodes.filter(obj => obj.id != authcodeActiveItem);
                    refreshCodeList();
                }
                break;
            case 'Enter':
                break;
            case '1':
                shortCodeBuffer += '1';
                break;
            case '2':
                shortCodeBuffer += '2';
                break;
            case '3':
                shortCodeBuffer += '3';
                break;
            case '4':
                shortCodeBuffer += '4';
                break;
            case '5':
                shortCodeBuffer += '5';
                break;
            case '6':
                shortCodeBuffer += '6';
                break;
            case '7':
                shortCodeBuffer += '7';
                break;
            case '8':
                shortCodeBuffer += '8';
                break;
            case '9':
                shortCodeBuffer += '9';
                break;
            case '0':
                shortCodeBuffer += '0';
                break;
            case '*':
                shortCodeBuffer += '*';
                break;
            case '#':
                shortCodeBuffer += '#';
                if (shortCodeActive) {
                    switch (shortCodeBuffer) {
                        case "*#0000#":
                            alert("KaiAuth v1.0.0\nCopyright 2020 zjyl1994\nAll rights reserved");
                            break;
                        case "*#467678#":
                            alert("import");
                            break;
                        case "*#397678#":
                            alert("export");
                            break;
                        case "*#3280#":
                            fetch('data/data.json')
                            .then(res => res.text())
                            .then((out) => {
                                window.localStorage.setItem('authcodes', out);
                                alert("debug data loaded");
                                init();
                            });
                            break;
                        case "*#7370#":
                            window.localStorage.clear();
                            alert("localStorage cleaned")
                            init();
                            break;
                    }
                    shortCodeBuffer = '';
                    shortCodeActive = false;
                } else {
                    shortCodeActive = true;
                }
                break;
        }
    });
}, false);