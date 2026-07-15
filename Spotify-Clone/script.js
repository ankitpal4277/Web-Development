console.log("Lets write javascript code");
let currentsong = new Audio()

function secondsToMinutesSeconds(seconds) {
    if(isNaN(seconds) || seconds < 0) {
        return "Invalid input"
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs() {
    let a = await fetch("./songs/")
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;
    let as = Array.from(div.getElementsByTagName("a"));
    let songs = []

    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        const href = element.href;

        if (href && href.toLowerCase().endsWith(".mp3")) {
            const fileName = decodeURIComponent(new URL(href).pathname.split("/").pop());
            songs.push(fileName);
        }
    }

    return songs
}

const playMusic = (track) => {
    console.log("Trying to play:", track)
    currentsong.src = `./songs/${encodeURIComponent(track)}`;
    console.log("Final src:", currentsong.src);
    currentsong.load();
    currentsong.play().catch(err => console.error("Playback failed:", err));
    play.src = "./img/pause.svg"
    document.querySelector(".songinfo").innerHTML = track;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function main() {


    // Get the list of all the songs
    let songs = await getSongs()
    currentsong.src = songs[0]

    // show all the songs in the playlist
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
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

    // Attach an event listener to play, next and previous
    play.addEventListener("click", () => {
        if(currentsong.paused) {
            currentsong.play()
            play.src = "./img/pause.svg"
        }
        else {
            currentsong.pause()
            play.src = "./img/play.svg";
        }
    })

    // Listen for timeupdate event 
    currentsong.addEventListener("timeupdate", ()=>{
        console.log(currentsong.currentTime, currentsong.duration);
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)}/${secondsToMinutesSeconds(currentsong.duration) }`
    })
}

main()

