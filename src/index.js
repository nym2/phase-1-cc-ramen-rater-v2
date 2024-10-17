// index.js

// Callbacks
const handleClick = (ramen) => {
  document.querySelector('.detail-image').src = ramen.image;
  document.querySelector('.name').textContent = ramen.name;
  document.querySelector('.restaurant').textContent = ramen.restaurant;
  document.querySelector('#rating-display').textContent = ramen.rating;
  document.querySelector('#comment-display').textContent = ramen.comment;
};

const addSubmitListener = () => {
  const form = document.querySelector('#new-ramen');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newRamen = {
      name: event.target.name.value,
      restaurant: event.target.restaurant.value,
      image: event.target.image.value,
      rating: event.target.rating.value,
      comment: event.target.comment.value,
    };

    displayNewRamen(newRamen);

    form.reset();
  });
}

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramenList => {
      ramenList.forEach(ramen => {
        displayNewRamen(ramen);
      });
    })
    .catch(error => console.error('Error fetching ramen data:', error));
};

const displayNewRamen = (ramen) => {
  const ramenMenu = document.querySelector('#ramen-menu');
  const ramenImg = document.createElement('img');
  ramenImg.src = ramen.image;
  ramenImg.alt = ramen.name;

  ramenImg.addEventListener('click', () => handleClick(ramen));

  ramenMenu.appendChild(ramenImg);
};

const main = () => {
  // Ensure the DOM has fully loaded before running the script
  document.addEventListener('DOMContentLoaded', () => {
    // Invoke displayRamens here
    displayRamens();

    // Invoke addSubmitListener here
    addSubmitListener();
  });
};

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
