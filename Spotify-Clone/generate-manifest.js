const fs = require('fs');
const path = require('path');

const songsDir = path.join(__dirname, 'songs');
const manifest = {};

const folders = fs.readdirSync(songsDir).filter(f =>
  fs.statSync(path.join(songsDir, f)).isDirectory()
);

folders.forEach(folder => {
  const files = fs.readdirSync(path.join(songsDir, folder))
    .filter(f => f.toLowerCase().endsWith('.mp3'));
  manifest[folder] = files;
});

fs.writeFileSync(
  path.join(songsDir, 'songs.json'),
  JSON.stringify(manifest, null, 2)
);

console.log('songs.json generated with folders:', folders);