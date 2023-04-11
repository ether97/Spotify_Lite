var song1 = document.getElementById("song1");
song1.addEventListener("click", async function () {
  try {
    await fetch("http://localhost:3000/user/songs/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: song1.innerHTML,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  } catch (error) {
    console.log(error);
  }
});
