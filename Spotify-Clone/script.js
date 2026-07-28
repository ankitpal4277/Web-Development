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

const playMusic = (track, pause = false) => {
    console.log("Trying to play:", track)
    currentsong.src = `./songs/${currfolder}/${encodeURIComponent(track)}`;
    if (!pause) {
        currentsong.play()
        play.src = "./img/pause.svg"


    }
    console.log("Final src:", currentsong.src);
    currentsong.load();
    currentsong.play().catch(err => console.error("Playback failed:", err));
    document.querySelector(".songinfo").innerHTML = track;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function main() {


    // Get the list of all the songs
    songs = await getSongs("ncs")
    playMusic(songs[0], true)

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
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", ()=>{
        console.log(e, e.target, e.target.value)
        currentsong.volume = parseInt(e.target.value) / 100
    })

    // Load the playlist when the card is clicked 
    Array.from(document.getElementsByClassName("card")).forEach(e=>{
        e.addEventListener("click", async item=>{
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
            
        })
    }
    )

}

main()

