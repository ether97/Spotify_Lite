const createSongs = () => {
  let songs = [];
  let languages = ["English", "Spanish", "Polish", "Korean"];
  let titles = [
    "Dance",
    "Don't Dance",
    "Chicken Dance",
    "Stanky Leg",
    "Milly Rock",
  ];
  let alphabet = "ABCDEF GHIJKL MNOPQRSTUVWX YZabcdefghi jklmnopqr stuvwyz";
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let genres = ["pop", "rock", "jazz", "metal", "classical", "edm", "techno"];
  let likes = [true, false];
  let artists = ["Spongebob", "Zedd", "David Guetta", "50 Cent", "Willy Wonka"];

  for (let i = 0; i < 10; i++) {
    let picture = `${Math.floor(Math.random() * 4)}.jpg`;
    let title = titles[Math.floor(Math.random() * 5)];
    let language = languages[Math.floor(Math.random() * 4)];
    let album = "";
    for (let j = 0; j < 22; j++) {
      album += alphabet[Math.floor(Math.random() * alphabet.length - 1)];
    }
    let date = `${months[Math.floor(Math.random() * 12)]} ${Math.floor(
      Math.random() * 30
    )}, ${Math.floor(Math.random() * 23) + 2000}`;
    let runtime = `${Math.floor(Math.random() * 5)}:${
      Math.floor(Math.random() * 49) + 10
    }`;
    let liked = likes[Math.floor(Math.random() * 2)];
    let genre = genres[Math.floor(Math.random() * 7)];
    let artist = artists[Math.floor(Math.random() * 5)];
    let song = {
      picture,
      title,
      language,
      album,
      date,
      runtime,
      liked,
      genre,
      artist,
    };
    songs.push(song);
  }
  return songs;
};

module.exports = { createSongs };
