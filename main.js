document.getElementById("submit").onclick = function() {
    let userInput = document.getElementById("userInput").value;

    function extractVideoId(url) {
        var regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        
        if (match && match[1].length === 11) {
            return match[1];
        } else {
            return null; 
        }
    }

    let videoId = extractVideoId(userInput);
    if (!videoId) {
        alert('Invalid YouTube URL');
        return;
    }

    const url = `https://youtube-mp3-download1.p.rapidapi.com/dl?id=${videoId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'db3fcc2c7emsha0cc08b68381743p1c76b9jsn39db8c98bb60',
            'x-rapidapi-host': 'youtube-mp3-download1.p.rapidapi.com'
        }
    };
    
    fetch(url, options)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        let thumbnail = document.getElementById("picture");
        thumbnail.src = data.thumb;
        
        let stats = document.getElementById("stats");
        stats.textContent = data.status;

        let titleElement = document.getElementById("title");
        titleElement.textContent = data.title;

        let authorElement = document.getElementById("auth");
        authorElement.textContent = data.author;

        let square = document.getElementById("box");
        square.style.border = '1px solid gray';
        square.style.backgroundColor = 'gray';
        
        let existingDownloadButton = square.querySelector("button");
        if (existingDownloadButton) {
            square.removeChild(existingDownloadButton);
        }

        
        let downloadButton = document.createElement("button");
        downloadButton.textContent = "Go To Download Page";
        downloadButton.style.cursor = "url(cursor.cur),auto";
        square.appendChild(downloadButton);
        downloadButton.addEventListener('click', function() {
            let fuck = document.createElement('a');
            fuck.download = "fuckyou.mp3";
            fuck.href = data.link;
            fuck.click();
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        let stats = document.getElementById("stats");
        stats.textContent = 'Error: ' + error.message;
    });
};
