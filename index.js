// index.js

// Function to fetch and display ramens
async function displayRamens() {
    const response = await fetch('http://localhost:3000/ramens');
    const ramens = await response.json();

    const ramenMenuDiv = document.getElementById('ramen-menu');
    ramenMenuDiv.innerHTML = ''; // Clear previous content

    ramens.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image; // Use the image URL from the JSON data
        img.alt = ramen.name; // Set alt text for accessibility
        img.addEventListener('click', (event) => handleClick(ramen, event));
        ramenMenuDiv.appendChild(img); // Append the image to the ramen menu
    });
}

// Function to handle clicking on a ramen image
function handleClick(ramen) {
    const detailImg = document.querySelector('.detail-image');
    const detailName = document.querySelector('.name');
    const detailRestaurant = document.querySelector('.restaurant');
    const detailsRating = document.getElementById('rating-display');
    const detailsComment = document.getElementById('comment-display');

    detailImg.src = ramen.image; // Display the ramen image
    detailName.textContent = ramen.name; // Display the ramen name
    detailRestaurant.textContent = ramen.restaurant; // Display the restaurant name
    detailsRating.textContent = ramen.rating; // Display the rating
    detailsComment.textContent = ramen.comment; // Display the comment
}

// Function to handle the form submission
function addSubmitListener(form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get values from the form
        const newRamen = {
            name: event.target.name.value,
            restaurant: event.target.restaurant.value,
            image: event.target.image.value,
            rating: event.target.rating.value,
            comment: event.target.comment.value,
        };

        // Add the new ramen to the #ramen-menu
        const ramenMenuDiv = document.getElementById('ramen-menu');
        const img = document.createElement('img');
        img.src = newRamen.image;
        img.alt = newRamen.name;
        img.addEventListener('click', (event) => handleClick(newRamen, event));
        ramenMenuDiv.appendChild(img);

        // Optionally, you can also POST the new ramen to the server
        await fetch('http://localhost:3000/ramens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRamen),
        });

        // Clear the form fields
        form.reset();
    });
}

// Main function to initialize the app
function main() {
    const ramenForm = document.getElementById('new-ramen');
    displayRamens();
    addSubmitListener(ramenForm);
}

// Wait for the DOM to load before running the main function
document.addEventListener('DOMContentLoaded', main);
