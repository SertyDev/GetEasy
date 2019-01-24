
function apiCall(){
    var url = document.getElementById("url").value;
    var elmRadios = document.getElementsByName('dType');
    var type = getType(elmRadios);
    
    $.ajax({
        url: "https://getvideo.p.rapidapi.com/?url=" + url,
        type: "GET",
        dataType: 'json',
        headers: {
            'X-RapidAPI-Key': '369e397939msh2c9063117937ea3p1a3e3bjsn4cf5e2208330'
        },
        contentType: 'application/json; charset=utf-8',
        success: function(result) {
            var downloadUrl;
            var downloadExtension;
            switch (type) {
                case "audio":
                    downloadUrl = result.streams[5].url;
                    downloadExtension = result.streams[5].extension;
                    break;
                case "video":
                    downloadUrl = result.streams[0].url;
                    downloadExtension = result.streams[0].extension;
                    break;
                default:

                    break;
            }

            download(downloadUrl, downloadExtension);
        }
     });
}

function getType(radios){
    for (var i = 0, length = radios.length; i < length; i++){
        if (radios[i].checked){
            return radios[i].value;
        }
    }
}

function download(downloadUrl, downloadExtension){
    var fileTransfer = new FileTransfer();
    var uri = encodeURI("http://some.server.com/download.php");

    fileTransfer.download(
        downloadUrl,
        // "file:///storage/emulated/0/",
        "C:/Users/ssilva/Documents",
        function(entry) {
            console.log("download complete: " + entry.toURL());
        },
        function(error) {
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
            console.log("download error code" + error.code);
        },
        true,
        {
            headers: {
                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            }
        }
    );
}


