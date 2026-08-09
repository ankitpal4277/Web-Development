# Spotify Clone 🎧

A responsive, front-end recreation of Spotify's web player — built with vanilla HTML, CSS, and JavaScript. Browse playlists, play songs, and control playback with a fully working seekbar, volume control, and next/previous navigation.

**🔗 Live Demo:** [ankitpal4277.github.io/spotify-clone](https://ankitpal4277.github.io/spotify-clone/)

## Features

- 🎵 Browse multiple playlists/albums, each with its own cover art and track list
- ▶️ Play, pause, skip to next/previous track
- 🎚️ Interactive seekbar with live progress tracking
- 🔊 Volume control with mute/unmute toggle
- 📱 Fully responsive layout — works on desktop, tablet, and mobile
- 🗂️ Dynamic playlist loading — add a new folder of songs and it shows up automatically

## Tech Stack

- **HTML5** — structure & semantic markup
- **CSS3** — responsive layout, custom Spotify-inspired styling
- **Vanilla JavaScript** — DOM manipulation, Audio API, async/await, fetch

No frameworks, no build tools — just the fundamentals.

## Project Structure

```
spotify-clone/
├── css/
│   ├── style.css
│   └── utility.css
├── img/              # UI icons (play, pause, volume, etc.)
├── js/
│   └── script.js      # Core app logic
├── songs/
│   ├── songs.json     # Manifest of all playlists & tracks
│   └── [Playlist folders]/
├── generate-manifest.js
├── favicon.ico
└── index.html
```

## Running Locally

Since the app fetches a JSON manifest instead of relying on live directory listings, you can run it with any static server:

```bash
# Using VS Code Live Server, or:
npx serve
```

Then open the local URL in your browser.

If you add new songs or playlists, regenerate the manifest:

```bash
node generate-manifest.js
```

## Challenges & What I Learned

The trickiest part of this project wasn't the UI — it was getting playlist/song discovery working reliably. Initially, the app used `fetch()` on a folder path and parsed the auto-generated directory-listing HTML to find `.mp3` files. This worked fine locally with a dev server, but **completely broke on static hosts like GitHub Pages**, which don't generate directory listings at all.

The fix: write a small Node script (`generate-manifest.js`) that scans the `songs/` folder ahead of time and outputs a `songs.json` manifest — then have the app fetch that JSON instead of relying on server-generated HTML. This was a good lesson in the difference between **local dev server behavior and real static-hosting constraints**, and why testing on your actual deployment target matters.

Other bugs solved along the way:
- Async fetch race conditions when loading songs before rendering the UI
- Autoplay policy restrictions in modern browsers
- URL encoding for folder/file names containing spaces (e.g. `Justin Bieber`, `Weeknd Songs`)
- CSS layout issues switching between flexbox and grid for the album card grid

## Author

Built by [Ankit Pal](https://github.com/ankitpal4277) as part of a full-stack web development learning path, following CodeWithHarry's Sigma Web Development course.
