
const changeBtn = document.getElementById("clicks");
const divText = document.getElementById("myDiv");

changeBtn.addEventListener("click", () => {
    // Update the div with a loading message
    divText.innerText = "Callback executed after 5 seconds.";

    // Delay fetching data by 5 seconds
    setTimeout(() => {
        fetch("https://dummyjson.com/posts")
            .then(response => response.json())
            .then(data => {
                // Create a list of post titles
                const postTitles = data.posts.map(post => `<li>${post.title}</li>`);
                divText.innerHTML = `<h3>Post Titles:</h3><ul>${postTitles}</ul>`;
            })
            .catch(error => {
                // Handle errors gracefully
                divText.textContent = "Error fetching data!";
                console.error("Error:", error);
            });
    }, 5000); // Delay of 5 seconds
});


