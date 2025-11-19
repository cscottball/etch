// Grab elements from the page
const buttons = document.querySelectorAll('.grid-btn');
const grid = document.getElementById('grid');
const welcome = document.querySelector('.welcome');
const buttonContainer = document.querySelector('.grid-buttons');
const resetBtn = document.getElementById('reset-btn');

// Function that builds an N x N grid
function makeGrid(size) {
  // Clear anything that was there before
  grid.innerHTML = '';

  // Set up CSS grid to have size x size cells
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  const totalCells = size * size;

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-cell');

    // Hover logic: random color for 3 seconds, then back to black
    cell.addEventListener('mouseenter', () => {
      // pick a random color
      const randomColor = getRandomColor();
      cell.style.backgroundColor = randomColor;

      // after 3 seconds, revert to black
      setTimeout(() => {
        cell.style.backgroundColor = 'black';
      }, 3000);
    });

    grid.appendChild(cell);
  }
}

// When a size button is clicked
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const size = Number(button.dataset.size); // read data-size="..."

    // Hide welcome text + size buttons
    if (welcome) welcome.classList.add('hidden');
    if (buttonContainer) buttonContainer.classList.add('hidden');

    // Show the grid and reset button
    grid.classList.remove('hidden');
    if (resetBtn) resetBtn.classList.remove('hidden');

    // Build the grid
    makeGrid(size);
  });
});

// When Reset is clicked
if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    // Hide the grid and clear its contents
    grid.classList.add('hidden');
    grid.innerHTML = '';

    // Hide the reset button
    resetBtn.classList.add('hidden');

    // Show welcome text + size buttons again
    if (welcome) welcome.classList.remove('hidden');
    if (buttonContainer) buttonContainer.classList.remove('hidden');

    // Optional: remove "selected" classes from buttons if you used them
    buttons.forEach(b => b.classList.remove('selected'));
  });
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256); // 0–255
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
