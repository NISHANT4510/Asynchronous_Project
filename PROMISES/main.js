document.getElementById("fetchButton").addEventListener("click", () => {
    const resultDiv = document.getElementById("result");

    // Display "Loading..." while waiting for the Promise to resolve
    resultDiv.textContent = "Loading...";
    resultDiv.className = "loading";

    // Create a Promise to fetch data with timeout handling
    const fetchData = new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject("Operation timed out."); // Reject after 5 seconds
        }, 5000);

        fetch("https://dummyjson.com/posts")
            .then((response) => {
                clearTimeout(timeout); // Clear timeout if successful
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => resolve(data))
            .catch((error) => reject(error.message));
    });

    // Handle the resolved or rejected Promise
    fetchData
        .then((data) => {
            resultDiv.className = ""; // Remove loading or error styles
            resultDiv.innerHTML = ""; // Clear the result div

            // Display fetched data in a scrollable list
            data.posts.forEach((post) => {
                const postElement = document.createElement("div");
                postElement.className = "post";
                postElement.innerHTML = `<strong>${post.title}</strong><br>${post.body}`;
                resultDiv.appendChild(postElement);
            });
        })
        .catch((error) => {
            resultDiv.className = "error";
            resultDiv.textContent = `Error: ${error}`;
        });
});