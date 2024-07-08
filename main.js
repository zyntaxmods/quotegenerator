let button = document.getElementById("submit").onclick = function(){
    let user = document.getElementById("userInput").value;

    function extractVideoId(url) {
        // Regular expression to match the video ID
        var regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        
        // If match found, return the video ID
        if (match && match[1].length === 11) {
            return match[1];
        } else {
            // Handle invalid URL
            return 'Invalid YouTube URL';
        }
    }
    let videoId = extractVideoId(user);
    const url = `https://youtube-mp3-download1.p.rapidapi.com/dl?id=${videoId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'db3fcc2c7emsha0cc08b68381743p1c76b9jsn39db8c98bb60',
            'x-rapidapi-host': 'youtube-mp3-download1.p.rapidapi.com'
        }
    };
    
    fetch(url, options)
    .then(response => response.json())
    .then(data => {
        let thumbnail = document.getElementById("picture");
        thumbnail.src = data.thumb;
        let para = document.getElementById("stats").textContent = data.status;
        let main = document.getElementById("title").textContent = data.title;
        let name = document.getElementById("auth").textContent = data.author;
        var square = document.getElementById("box");
        var dlBtn = document.createElement("button");
        dlBtn.textContent = "Download MP3";
        square.appendChild(dlBtn);
        dlBtn.addEventListener('click', function(){
            let fuck = document.createElement('a');
            fuck.download = "zyrill.mp3";
            fuck.href = data.link;
            dlBtn.click();
        });
    })
}
