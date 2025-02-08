document.getElementById("fetchButton").addEventListener("click", async () => {
    const resultDiv = document.getElementById("resultDiv");

    // Display "Loading..." while fetching data
    resultDiv.textContent = "Loading...";
    resultDiv.className = "loading";

    try {
        // Fetch data using async/await
        const response = await fetch("https://dummyjson.com/posts");

        // Check if the response is successful
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json(); // Parse the JSON response

        // Update the div with fetched data
        resultDiv.className = ""; // Clear loading style
        resultDiv.innerHTML = ""; // Clear previous content

        // Display the fetched data in a scrollable div
        data.posts.forEach((post) => {
            const postElement = document.createElement("div");
            postElement.className = "post";
            postElement.style.borderBottom = "1px solid #ccc";
            postElement.style.padding = "10px 0";
            postElement.innerHTML = `<strong>${post.title}</strong><br>${post.body}`;
            resultDiv.appendChild(postElement);
        });
    } catch (error) {
        // Handle errors (e.g., network issues)
        resultDiv.className = "error";
        resultDiv.textContent = `Error: ${error.message}`;
    }
});