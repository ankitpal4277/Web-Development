console.log("Lets write javascript code");
let songs;
let currfolder;
let currentsong = new Audio()

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
    currfolder = folder;
    let a = await fetch(`./songs/${folder}`)
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;
    let as = Array.from(div.getElementsByTagName("a"));
    songs = []

    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        const href = element.href;

        if (href && href.toLowerCase().endsWith(".mp3")) {
            const fileName = decodeURIComponent(new URL(href).pathname.split("/").pop());
            songs.push(fileName);
        }
    }

    // show all the songs in the playlist
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    songUL.innerHTML = "";
    for (const song of songs) {
        songUL.innerHTML += `<li>
                            <img class="invert" src="./img/music.svg" alt="">
                            <div class="info">
                                 <div>${song}</div>
                                 <div>Me</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="./img/play.svg" alt="">
                            </div>
                              </li>`;
    }

    // Attach an eventlistener to each song 
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        })

    });
}

const playMusic = (track, pause = false) => {
    console.log("Trying to play:", track)
    currentsong.src = `./songs/${currfolder}/${encodeURIComponent(track)}`;
    currentsong.load();
    document.querySelector(".songinfo").innerHTML = track;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"


    if (!pause) {
        currentsong.play().catch(err => console.error("Playback failed:", err));
        play.src = "./img/pause.svg"

    }

    console.log("Final src:", currentsong.src);


}

async function displayAlbums() {
    let a = await fetch(`./songs/`)
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")
    let cardcontainer = document.querySelector(".cardcontainer")
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        
        if (e.href.includes("/songs/") && e.href.endsWith("/") && !e.href.endsWith("/songs/")) {
            let folder = e.href.split("/").filter(Boolean).pop();

            // Get the metadata of the folder 
            let a = await fetch(`./songs/${folder}/info.json`)
            let response = await a.json();
            console.log(response);
            cardcontainer.innerHTML = cardcontainer.innerHTML + `<div data-folder="${folder}" class="card border">
                        <div class="play">
                            <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="24" cy="24" r="24" fill="#1ED760" />
                                <path d="M19 15L33 24L19 33V15Z" fill="black" />
                            </svg>
                        </div>
                        <img src="/songs/${folder}/cover.jpg" alt="">
                        <h2>${response.title}</h2>
                        <p>${response.description}</p>
                    </div>`
        }
    }

    // Load the playlist when the card is clicked 
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            console.log(item.target, item.currentTarget.dataset)
            songs = await getSongs(item.currentTarget.dataset.folder)

        })
    }
    )

}

async function main() {


    // Get the list of all the songs
    await getSongs("ncs")
    playMusic(songs[0], true)

    //    Display all the albums on the page 
    displayAlbums()

    // Attach an event listener to play, next and previous
    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play()
            play.src = "./img/pause.svg"
        }
        else {
            currentsong.pause()
            play.src = "./img/play.svg";
        }
    })

    // Listen for timeupdate event 
    currentsong.addEventListener("timeupdate", () => {
        console.log(currentsong.currentTime, currentsong.duration);
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)} / ${secondsToMinutesSeconds(currentsong.duration)}`
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
    })

    // Add an event listener to the seekbar   
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "% ";
        currentsong.currentTime = ((currentsong.duration) * percent) / 100
    })

    // Add an event listener for hamburger 
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })


    // Add an event listener for close button 
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%"
    })

    // Add an event listener to previous 
    previous.addEventListener("click", () => {
        let currentFile = decodeURIComponent(currentsong.src.split("/").slice(-1)[0]);
        let index = songs.indexOf(currentFile);

        if (index - 1 >= 0) {
            playMusic(songs[index - 1]);
        }
    })

    // Add an event listener to next 
    next.addEventListener("click", () => {
        currentsong.pause();
        let currentFile = decodeURIComponent(currentsong.src.split("/").slice(-1)[0]);
        let index = songs.indexOf(currentFile);

        if (index + 1 < songs.length) {
            playMusic(songs[index + 1]);
        }
    })

    // Add an event to volume 
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log(e, e.target, e.target.value)
        currentsong.volume = parseInt(e.target.value) / 100
    })



}

main()

