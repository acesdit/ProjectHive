const books = [
  {
    title: "Data Structures Using C",
    author: "Reema Thareja",
    price: "₹350",
  },
  {
    title: "Fundamentals of Data Structures in C",
    author: "Ellis Horowitz, Sartaj Sahni",
    price: "₹400",
  },
  {
    title: "Introduction to Algorithms",
    author: "Cormen, Leiserson, Rivest, Stein",
    price: "₹550",
  },
  {
    title: "Discrete Mathematics and Its Applications",
    author: "Kenneth H. Rosen",
    price: "₹450",
  },
  {
    title: "Higher Engineering Mathematics (M3)",
    author: "B.S. Grewal",
    price: "₹300",
  },
  {
    title: "Probability and Statistics",
    author: "T. Veerarajan",
    price: "₹280",
  }
];

const customItems = [];

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const role = document.querySelector('input[name="role"]:checked')?.value;

  if (email && role) {
    localStorage.setItem('email', email);
    localStorage.setItem('role', role);

    alert('Login successful');
    document.querySelector('.container').style.display = 'none';

    if (role === 'buyer') {
      showBookList();
    }

    if (role === 'seller') {
      document.querySelector('.chatbox-container').style.display = 'block';
      document.getElementById('chatInput').disabled = false;
      document.getElementById('sendBtn').disabled = false;
      document.getElementById('sellerForm').style.display = 'block';
    }
  } else {
    alert('Please enter a valid email and select a role.');
  }
});

function showBookList() {
  const bookListDiv = document.getElementById('bookList');
  bookListDiv.style.display = 'flex';
  bookListDiv.innerHTML = '';

  books.forEach((book) => {
    const card = document.createElement('div');
    card.className = 'book-card';

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Details:</strong> ${book.author}</p>
      <p><strong>Price:</strong> ${book.price}</p>
      <button onclick="openChat('${book.title}')">Chat with Seller</button>
    `;
    bookListDiv.appendChild(card);
  });
}

function openChat(bookTitle) {
  document.querySelector('.chatbox-container').style.display = 'block';
  document.getElementById('chatInput').disabled = false;
  document.getElementById('sendBtn').disabled = false;

  const intro = document.createElement('div');
  intro.textContent = `You are now chatting about "${bookTitle}".`;
  intro.style.color = '#00bfff';
  document.getElementById('chatMessages').appendChild(intro);
}

document.getElementById('sendBtn').addEventListener('click', function() {
  const message = document.getElementById('chatInput').value;
  if (message.trim()) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.color = '#ff66cc';
    document.getElementById('chatMessages').appendChild(messageDiv);
    document.getElementById('chatInput').value = '';
  }
});

document.getElementById('chatInput').addEventListener('input', function() {
  document.getElementById('sendBtn').disabled = !this.value.trim();
});

document.getElementById('uploadForm')?.addEventListener('submit', function(e) {
  e.preventDefault();

  const title = document.getElementById('itemTitle').value;
  const description = document.getElementById('itemDescription').value;
  const price = document.getElementById('itemPrice').value;

  const newItem = {
    title,
    author: description,
    price
  };

  customItems.push(newItem);
  books.push(newItem); // makes available for buyers

  alert('Item added successfully!');
  this.reset();
  showBookList(); // auto-refresh for seller
});

