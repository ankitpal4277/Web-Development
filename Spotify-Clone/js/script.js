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
    let res = await fetch(`./songs/songs.json`);
    let manifest = await res.json();
    songs = manifest[folder] || [];

    // show all the songs in the playlist
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    songUL.innerHTML = "";

    for (const song of songs) {
        let displayName = song.replace(/\.mp3$/i, "");
        songUL.innerHTML += `<li data-file="${song}">
                        <img class="invert" src="./img/music.svg" alt="">
                        <div class="info">
                             <div>${displayName}</div>
                        </div>
                        <div class="playnow">
                            <span>Play Now</span>
                            <img class="invert" src="./img/play.svg" alt="">
                        </div>
                          </li>`;
    }

    // Attach an eventlistener to each song - use the full filename stored in data-file
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            const file = e.dataset.file;
            if (file) {
                playMusic(file);
            } else {
                // fallback: use the display name if data-file is missing
                playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
            }
        })

    });

    return songs;
}

const playMusic = (track, pause = false) => {

    currentsong.src = `./songs/${encodeURIComponent(currfolder)}/${encodeURIComponent(track)}`;
    currentsong.load();

    // Strip the file extension only for display
    let displayName = track.replace(/\.mp3$/i, "");
    document.querySelector(".songinfo").innerHTML = displayName;

    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"

    if (!pause) {
        currentsong.play().catch(err => console.error("Playback failed:", err));
        play.src = "./img/pause.svg"
    }
}

async function displayAlbums() {
    let res = await fetch(`./songs/songs.json`);
    let manifest = await res.json();
    let cardcontainer = document.querySelector(".cardcontainer");
    cardcontainer.innerHTML = "";

    for (const folder of Object.keys(manifest)) {

        let title = folder;
        let description = "";
        try {
            let infoRes = await fetch(`./songs/${encodeURIComponent(folder)}/info.json`);
            if (!infoRes.ok) throw new Error("no info.json");
            let info = await infoRes.json();
            title = info.title || folder;
            description = info.description || "";
        } catch (err) {
            console.warn(`No info.json for "${folder}", using folder name`, err);
        }

        cardcontainer.innerHTML += `<div data-folder="${folder}" class="card border">
                    <div class="play">
                        <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="24" cy="24" r="24" fill="#1ED760" />
                            <path d="M19 15L33 24L19 33V15Z" fill="black" />
                        </svg>
                    </div>
                    <img src="./songs/${encodeURIComponent(folder)}/cover.jpg" onerror="this.src='./img/music.svg'" alt="">
                    <h2>${title}</h2>
                    <p>${description}</p>
                </div>`;
    }

    // Load the playlist when a card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            songs = await getSongs(item.currentTarget.dataset.folder);
            playMusic(songs[0], false);
        });
    });
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

        currentsong.volume = parseInt(e.target.value) / 100
    })

    // Add event listener to mute the track 
    document.querySelector(".volume>img").addEventListener("click", e => {

        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg")
            currentsong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        } else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg")

            currentsong.volume = .10;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
        }
    })



}

main()

