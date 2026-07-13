console.log("Lets write javascript code");

async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text();
    console.log(response);

    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = []


    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href)
        }
    }

    return songs
}

async function main(){
    // Get the list of all the songs
    let songs = await getSongs()
    console.log(songs);

    // Play the first song 
    var audio = new Audio(songs[0]);
    audio.play(); 

    audio.addEventListener("loadeddata", () => {
        let duration = audio.duration;
        console.log(duration);
    });
}

main()

