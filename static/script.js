const jobForm = document.getElementById('job-form');
const jobCarousels = document.querySelector('.job-carousels');

// Function to create a new job card element (your code)
function createJobCard(jobData) {
  const card = document.createElement('div');
  card.classList.add('job-card');
  card.style.cssText = "border: 2px solid black; border-radius: 20px; width: 450px; height: 575px; display: inline-block; margin: 20px; padding: 20px; background: radial-gradient(343px at 46.3% 47.5%, rgb(242, 242, 242) 0%, rgb(241, 241, 241) 72.9%)";




  const p5 = document.createElement('p');
  p5.textContent = `Job Description :
   ${jobData.Job_Description} `;
  p5.style.overflowY = 'scroll';  // Enable scroll for long descriptions
  p5.style.maxHeight = '950px';  // Set a maximum height for description
  card.appendChild(p5);
  p5.style.marginTop = "12px";
  p5.style.fontWeight = "500";
  p5.style.textAlign = 'center';
  p5.style.textAlign = 'justify';



  // Set the fontWeight property to bold



  // Create a container for the buttons
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');
  card.appendChild(buttonContainer);
  buttonContainer.style.display = 'flex';
  buttonContainer.style.justifyContent = 'center';
  buttonContainer.style.alignItems = 'flex-end'; // Align to bottom

  const button3 = createButton('Review JD');
  buttonContainer.appendChild(button3);

  // function my_fun(){
  //   window.location.href = '/predict';
  // }

  function createResumeTable(resumes) {
    // Remove any existing table
    const existingTable = card.querySelector('.resume-table');
    if (existingTable) {
      existingTable.remove();
    }

    // Create the table element
    const table = document.createElement('table');
    table.classList.add('resume-table');

    // Create the table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Resume Name', 'Accuracy', 'Ranking'];
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create the table body
    const tbody = document.createElement('tbody');
    // Sort resumes by accuracy in descending order
    resumes.sort((a, b) => b.accuracy - a.accuracy);
    // Populate the table rows with resume information
    resumes.forEach((resume, index) => {
      const tr = document.createElement('tr');
      const nameCell = document.createElement('td');
      const accuracyCell = document.createElement('td');
      const rankingCell = document.createElement('td');
      nameCell.textContent = resume.name;
      accuracyCell.textContent = resume.accuracy;
      rankingCell.textContent = index + 1; // Ranking based on index (1-based)
      tr.appendChild(nameCell);
      tr.appendChild(accuracyCell);
      tr.appendChild(rankingCell);
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    table.style.margin = "auto";

    return table;
  }

  // Add event listener for Review JD button
  button3.addEventListener('click', function () {
    // Example resumes data (replace with actual data)
    const resumes = [
      { name: 'Resume 1', accuracy: 90 },
      { name: 'Resume 2', accuracy: 85 },
      { name: 'Resume 3', accuracy: 80 },
      // Add more resume objects as needed
    ];

    // Create the resume table
    // my_fun()
  });





  const button2 = createButton('Delete Card');
  buttonContainer.appendChild(button2);

  // Add event listener for delete button
  button2.addEventListener('click', function () {
    card.remove(); // Remove the card from the DOM
    removeCardFromStorage(card.id); // Remove card data from local storage
  });

  // Generate a unique ID for the card
  const cardId = generateUniqueId();
  card.setAttribute('id', cardId);

  // Store card data in local storage
  storeCardData(cardId, jobData);

  return card;
}

// Helper function to create a button element
function createButton(buttonText) {
  const button = document.createElement('button');
  button.textContent = buttonText;
  button.style.margin = '10px';
  button.classList.add('job-card-button');
  return button;
}

// Event listener for form submission
// jobForm.addEventListener('submit', function (event) {
//   event.preventDefault(); // Prevent default form submission

//   const formData = new FormData(jobForm);
//   const jobData = {
//     Job_Role: formData.get('Job_Role'),
//     Work_Experience: formData.get('Work_Experience'),
//     Salary_Offered: formData.get('Salary_Offered'),
//     Skills: formData.get('Skills'),
//     Certification: formData.get('Certification'),
//     Job_Description: formData.get('Job_Description')
//   };

//   const newJobCard = createJobCard(jobData);
//   jobCarousels.appendChild(newJobCard); // Add card to carousels container

//   // Clear the form after successful submission (optional)
//   jobForm.reset();
// });

// Function to generate a unique ID
function generateUniqueId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Function to store card data in local storage
function storeCardData(cardId, jobData) {
  localStorage.setItem(cardId, JSON)

}

// Function to retrieve card data from local storage (added)
function retrieveCardDataFromStorage() {
  const cards = [];
  for (let i = 0; localStorage.getItem(i) !== null; i++) {
    const cardDataString = localStorage.getItem(i);
    if (cardDataString) {
      const cardData = JSON.parse(cardDataString);
      cards.push(cardData);
    }
  }
  return cards;
}

// Function to display retrieved cards (added)
function displayRetrievedCards(cards) {
  cards.forEach(cardData => {
    const newJobCard = createJobCard(cardData);
    jobCarousels.appendChild(newJobCard);
  });
}

// Function to remove card data from local storage (added)
function removeCardFromStorage(cardId) {
  localStorage.removeItem(cardId);
}

// Call the function to retrieve cards on page load
const retrievedCards = retrieveCardDataFromStorage();
displayRetrievedCards(retrievedCards);

function storeCardData(cardId, jobData) {
  try {
    const jobDataString = JSON.stringify(jobData);
    localStorage.setItem(cardId, jobDataString);
  } catch (error) {
    console.error("Error storing data in localStorage:", error);
  }
}






