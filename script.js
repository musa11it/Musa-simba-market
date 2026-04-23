const products = [
  { id: 1, name: 'Organic Fuji Apples', category: 'Fresh Produce', price: 4.99, image: 'https://images.unsplash.com/photo-1560806e614542-ce33be841ce2?auto=format&fit=crop&w=900&q=80', description: 'Crisp and juicy apples, perfect for snacks and desserts.' },
  { id: 2, name: 'Artisan Sourdough Bread', category: 'Bakery', price: 5.49, image: 'https://images.unsplash.com/photo-1585521537296-9b93a15ea5c0?auto=format&fit=crop&w=900&q=80', description: 'Freshly baked sourdough loaf with a golden crust.' },
  { id: 3, name: 'Premium Whole Milk', category: 'Dairy', price: 3.29, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80', description: 'Rich whole milk sourced from local dairies.' },
  { id: 4, name: 'Italian Espresso Coffee', category: 'Beverages', price: 11.99, image: 'https://images.unsplash.com/photo-1559254990-73d813b70162?auto=format&fit=crop&w=900&q=80', description: 'Bold espresso beans to fuel your busy day.' },
  { id: 5, name: 'Chocolate Chip Cookies', category: 'Snacks', price: 6.49, image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80', description: 'Soft-baked cookies with real chocolate chips.' },
  { id: 6, name: 'Frozen Organic Veg Mix', category: 'Frozen Foods', price: 7.99, image: 'https://images.unsplash.com/photo-1599599810694-24270f3ee5bc?auto=format&fit=crop&w=900&q=80', description: 'Ready-to-cook frozen vegetables for fast meals.' },
  { id: 7, name: 'Laundry Liquid Detergent', category: 'Household', price: 9.99, image: 'https://images.unsplash.com/photo-1608228177340-d88e2f0bb611?auto=format&fit=crop&w=900&q=80', description: 'Effective cleaning power for all fabrics.' },
  { id: 8, name: 'Vitamin C Gummies', category: 'Health & Wellness', price: 14.49, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde0d?auto=format&fit=crop&w=900&q=80', description: 'Daily vitamin support for immune health.' },
  { id: 9, name: 'Organic Baby Formula', category: 'Baby & Kids', price: 24.99, image: 'https://images.unsplash.com/photo-1585231215220-a53ee3fed414?auto=format&fit=crop&w=900&q=80', description: 'Trusted nutrition for your little one.' },
  { id: 10, name: 'Pet Premium Chicken Meal', category: 'Pets', price: 18.99, image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=900&q=80', description: 'Savory nutrition for happy pets.' },
  { id: 11, name: 'Hummus & Pita Set', category: 'International', price: 8.25, image: 'https://images.unsplash.com/photo-1546546191-bb4cbc1b2158?auto=format&fit=crop&w=900&q=80', description: 'Mediterranean-ready snack with creamy hummus.' },
  { id: 12, name: 'Organic Quinoa', category: 'Organic', price: 10.49, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80', description: 'High-protein quinoa for healthy meals.' },
  { id: 13, name: 'Fresh Carrots Bundle', category: 'Fresh Produce', price: 3.49, image: 'https://images.unsplash.com/photo-1609501676725-7186f17a0fea?auto=format&fit=crop&w=900&q=80', description: 'Crunchy fresh carrots for salads and cooking.' },
  { id: 14, name: 'Greek Yogurt', category: 'Dairy', price: 5.99, image: 'https://images.unsplash.com/photo-1488477181946-6f0ee6c072d8?auto=format&fit=crop&w=900&q=80', description: 'Thick and creamy Greek yogurt, protein-rich.' },
  { id: 15, name: 'Orange Juice Pack', category: 'Beverages', price: 4.79, image: 'https://images.unsplash.com/photo-1600271886742-f049cd1e4f2b?auto=format&fit=crop&w=900&q=80', description: 'Fresh squeezed orange juice, vitamin C boost.' },
  { id: 16, name: 'Whole Wheat Pasta', category: 'Food Products', price: 3.99, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80', description: 'Healthy whole wheat pasta for nutritious meals.' },
  { id: 17, name: 'Premium Olive Oil', category: 'Food Products', price: 12.99, image: 'https://images.unsplash.com/photo-1618164436241-4473940571cd?auto=format&fit=crop&w=900&q=80', description: 'Extra virgin olive oil from Mediterranean.' },
  { id: 18, name: 'Dental Care Brush Set', category: 'Personal Care', price: 8.49, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80', description: 'Soft bristle toothbrushes for family care.' },
  { id: 19, name: 'Rice Cooker Deluxe', category: 'Kitchenware', price: 34.99, image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&w=900&q=80', description: 'Automatic rice cooker for perfect rice every time.' },
  { id: 20, name: 'Fresh Tomatoes', category: 'Fresh Produce', price: 2.99, image: 'https://images.unsplash.com/photo-1592841200221-a0b08c36b5a5?auto=format&fit=crop&w=900&q=80', description: 'Ripe, juicy tomatoes perfect for salads and cooking.' }
];

const categories = [
  { name: 'Beverages', image: 'https://images.unsplash.com/photo-1510626176961-4b55f6f7b66b?auto=format&fit=crop&w=900&q=80' },
  { name: 'Bakery', image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=900&q=80' },
  { name: 'Dairy', image: 'https://images.unsplash.com/photo-1599714451654-53fa6a79c54e?auto=format&fit=crop&w=900&q=80' },
  { name: 'Fresh Produce', image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=900&q=80' },
  { name: 'Snacks', image: 'https://images.unsplash.com/photo-1512058564366-c9e1e0d071f2?auto=format&fit=crop&w=900&q=80' },
  { name: 'Frozen Foods', image: 'https://images.unsplash.com/photo-1551477992-0d42c3ff7cfe?auto=format&fit=crop&w=900&q=80' },
  { name: 'Household', image: 'https://images.unsplash.com/photo-1586201375761-a48148d08a4c?auto=format&fit=crop&w=900&q=80' },
  { name: 'Personal Care', image: 'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80' },
  { name: 'Health & Wellness', image: 'https://images.unsplash.com/photo-1598026695132-15018fce63b2?auto=format&fit=crop&w=900&q=80' },
  { name: 'Baby & Kids', image: 'https://images.unsplash.com/photo-1571430946553-3d14b01f67d9?auto=format&fit=crop&w=900&q=80' },
  { name: 'Pets', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80' },
  { name: 'Organic', image: 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=900&q=80' },
  { name: 'International', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=900&q=80' }
];

function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

function getCart() {
  return JSON.parse(localStorage.getItem('simbaCart') || '[]');
}

function setCart(items) {
  localStorage.setItem('simbaCart', JSON.stringify(items));
  updateCartCount();
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('#cart-count').forEach((el) => (el.textContent = count));
}

function getUser() {
  return JSON.parse(localStorage.getItem('simbaCurrentUser') || 'null');
}

function setUser(user) {
  localStorage.setItem('simbaCurrentUser', JSON.stringify(user));
}

function getRegisteredUsers() {
  return JSON.parse(localStorage.getItem('simbaUsers') || '[]');
}

function setRegisteredUsers(users) {
  localStorage.setItem('simbaUsers', JSON.stringify(users));
}

function renderCategories() {
  const grid = document.getElementById('category-grid');
  if (!grid) return;
  grid.innerHTML = categories
    .map(
      (category) => `
        <div class="category-card" data-category="${category.name}">
          <button class="wishlist-btn ${isInWishlist('category-' + category.name) ? 'active' : ''}" data-product-id="category-${category.name}" onclick="toggleWishlist('category-${category.name}')">♡</button>
          <img src="${category.image}" alt="${category.name} category" />
          <h3>${category.name}</h3>
          <p>Shop premium ${category.name.toLowerCase()} selections.</p>
          <button class="button button-primary category-btn" onclick="window.location.href='category.html?category=${encodeURIComponent(category.name)}'">Shop Now</button>
        </div>`
    )
    .join('');
  updateWishlistButtons();
}

function renderFeaturedProducts() {
  const grid = document.getElementById('featured-products');
  if (!grid) return;
  grid.innerHTML = products
    .slice(0, 8)
    .map(
      (product) => `
        <article class="product-card">
          <button class="wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}" data-product-id="${product.id}" onclick="toggleWishlist(${product.id})">♡</button>
          <img src="${product.image}" alt="${product.name}" />
          <div class="product-meta">
            <span>${product.category}</span>
            <span>${formatCurrency(product.price)}</span>
          </div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-actions">
            <button class="button button-primary" onclick="addToCart(${product.id})">Add to cart</button>
          </div>
        </article>`
    )
    .join('');
  updateWishlistButtons();
}

function renderCategoryProducts(filter = 'All') {
  const grid = document.getElementById('category-products');
  if (!grid) return;
  const visible = filter === 'All' ? products : products.filter((product) => product.category === filter);
  if (!visible.length) {
    grid.innerHTML = `<div class="card-panel"><h3>No products found in ${filter}.</h3></div>`;
    return;
  }
  grid.innerHTML = visible
    .map(
      (product) => `
        <article class="product-card">
          <button class="wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}" data-product-id="${product.id}" onclick="toggleWishlist(${product.id})">♡</button>
          <img src="${product.image}" alt="${product.name}" />
          <div class="product-meta">
            <span>${product.category}</span>
            <span>${formatCurrency(product.price)}</span>
          </div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-actions">
            <button class="button button-primary" onclick="addToCart(${product.id})">Add to cart</button>
          </div>
        </article>`
    )
    .join('');
  updateWishlistButtons();
}

function showCategoryFilterButtons() {
  document.querySelectorAll('.filter-button').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.filter-button').forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      renderCategoryProducts(button.dataset.category);
    });
  });
}

function addToCart(productId) {
  const item = products.find((product) => product.id === productId);
  if (!item) return;
  const cart = getCart();
  const existing = cart.find((entry) => entry.id === item.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: item.id, quantity: 1 });
  }
  setCart(cart);
  const status = document.getElementById('cart-status');
  if (status) {
    status.textContent = `${item.name} was added to your cart.`;
    setTimeout(() => (status.textContent = ''), 2500);
  }
}

function renderCart() {
  const container = document.getElementById('cart-items');
  if (!container) return;
  const cart = getCart();
  if (!cart.length) {
    container.innerHTML = `<div class="card-panel"><h2>Your cart is empty.</h2><p><a class="button button-secondary" href="category.html">Browse products</a></p></div>`;
    document.getElementById('summary-subtotal').textContent = '$0.00';
    document.getElementById('summary-total').textContent = '$0.00';
    return;
  }
  const items = cart.map((entry) => {
    const product = products.find((product) => product.id === entry.id);
    return { ...product, quantity: entry.quantity };
  });
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  container.innerHTML = items
    .map(
      (item) => `
        <div class="cart-item-card">
          <img src="${item.image}" alt="${item.name}" />
          <div class="cart-item-info">
            <h3>${item.name}</h3>
            <p>${item.category}</p>
            <p><strong>${formatCurrency(item.price)}</strong> each</p>
            <div class="qty-controls">
              <button aria-label="Decrease quantity" onclick="updateCartQuantity(${item.id}, -1)">−</button>
              <span>${item.quantity}</span>
              <button aria-label="Increase quantity" onclick="updateCartQuantity(${item.id}, 1)">+</button>
            </div>
          </div>
          <div>
            <p>${formatCurrency(item.price * item.quantity)}</p>
            <button class="button button-secondary" onclick="removeCartItem(${item.id})">Remove</button>
          </div>
        </div>`
    )
    .join('');
  document.getElementById('summary-subtotal').textContent = formatCurrency(subtotal);
  document.getElementById('summary-total').textContent = formatCurrency(subtotal + 5);
}

function updateCartQuantity(productId, delta) {
  const cart = getCart();
  const item = cart.find((entry) => entry.id === productId);
  if (!item) return;
  item.quantity = Math.max(1, item.quantity + delta);
  setCart(cart);
  renderCart();
}

function removeCartItem(productId) {
  const cart = getCart();
  const filteredCart = cart.filter((entry) => entry.id !== productId);
  setCart(filteredCart);
  renderCart();
  updateCartCount();
}

function getWishlist() {
  return JSON.parse(localStorage.getItem('simbaWishlist') || '[]');
}

function setWishlist(items) {
  localStorage.setItem('simbaWishlist', JSON.stringify(items));
}

function toggleWishlist(productId) {
  const wishlist = getWishlist();
  const index = wishlist.indexOf(productId);
  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(productId);
  }
  setWishlist(wishlist);
  updateWishlistButtons();
}

function isInWishlist(productId) {
  return getWishlist().includes(productId);
}

function updateWishlistButtons() {
  document.querySelectorAll('.wishlist-btn').forEach((btn) => {
    const productId = parseInt(btn.dataset.productId, 10);
    btn.classList.toggle('active', isInWishlist(productId));
  });
}

function bindCheckoutButton() {
  const button = document.getElementById('checkout-button');
  if (!button) return;
  button.addEventListener('click', () => {
    window.location.href = 'checkout.html';
  });
}

function renderCheckoutSummary() {
  const container = document.getElementById('checkout-summary');
  if (!container) return;
  const cart = getCart();
  if (!cart.length) {
    container.innerHTML = '<p>Your cart is empty. Add products before checking out.</p>';
    return;
  }
  const items = cart.map((entry) => {
    const product = products.find((product) => product.id === entry.id);
    return { ...product, quantity: entry.quantity };
  });
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  container.innerHTML = `
    <div class="summary-row"><span>Items</span><span>${items.length}</span></div>
    <div class="summary-row"><span>Subtotal</span><span>${formatCurrency(subtotal)}</span></div>
    <div class="summary-row"><span>Delivery</span><span>$5.00</span></div>
    <div class="summary-row total"><span>Total</span><span>${formatCurrency(subtotal + 5)}</span></div>
    <div style="margin-top:16px; font-size:0.95rem; color: var(--muted);">
      Order includes ${items.reduce((sum, item) => sum + item.quantity, 0)} items.
    </div>`;
}

function bindSignUpForm() {
  const form = document.getElementById('signup-form');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim().toLowerCase();
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;
    const status = document.getElementById('signup-status');
    if (!name || !email || !password || !confirm) {
      status.textContent = 'Please complete all fields.';
      return;
    }
    if (password.length < 8) {
      status.textContent = 'Password must be at least 8 characters.';
      return;
    }
    if (password !== confirm) {
      status.textContent = 'Passwords do not match.';
      return;
    }
    const users = getRegisteredUsers();
    if (users.some((user) => user.email === email)) {
      status.textContent = 'An account with that email already exists.';
      return;
    }
    users.push({ name, email, password });
    setRegisteredUsers(users);
    setUser({ name, email });
    status.textContent = 'Account created successfully. Redirecting…';
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1200);
  });
}

function bindSignInForm() {
  const form = document.getElementById('signin-form');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('signin-email').value.trim().toLowerCase();
    const password = document.getElementById('signin-password').value;
    const status = document.getElementById('signin-status');
    const user = getRegisteredUsers().find((entry) => entry.email === email && entry.password === password);
    if (!user) {
      status.textContent = 'Invalid email or password.';
      return;
    }
    setUser({ name: user.name, email: user.email });
    status.textContent = 'Signed in successfully. Redirecting…';
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  });
}

function bindCheckoutForm() {
  const form = document.getElementById('checkout-form');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('checkout-name').value.trim();
    const address = document.getElementById('checkout-address').value.trim();
    const phone = document.getElementById('checkout-phone').value.trim();
    const paymentMethod = document.getElementById('payment-method').value;
    const status = document.getElementById('checkout-status');

    if (!name || !address || !phone) {
      status.textContent = 'Please fill in all delivery details.';
      return;
    }

    if (paymentMethod === 'card') {
      const card = document.getElementById('checkout-card').value.trim();
      const expiry = document.getElementById('checkout-expiry').value.trim();
      const cvv = document.getElementById('checkout-cvv').value.trim();
      if (!card || !expiry || !cvv) {
        status.textContent = 'Please fill in all card details.';
        return;
      }
      if (card.replace(/\s/g, '').length < 12) {
        status.textContent = 'Enter a valid card number.';
        return;
      }
    } else if (paymentMethod === 'momo') {
      const momoPhone = document.getElementById('momo-phone').value.trim();
      if (!momoPhone) {
        status.textContent = 'Please enter your MTN Mobile Money phone number.';
        return;
      }
    } else if (paymentMethod === 'airtel') {
      const airtelPhone = document.getElementById('airtel-phone').value.trim();
      if (!airtelPhone) {
        status.textContent = 'Please enter your Airtel Money phone number.';
        return;
      }
    }

    status.textContent = 'Processing payment…';
    form.querySelector('button').disabled = true;
    setTimeout(() => {
      status.textContent = '✓ Payment confirmed! Your order is complete.';
      localStorage.removeItem('simbaCart');
      updateCartCount();
      document.querySelectorAll('#cart-count').forEach((el) => (el.textContent = '0'));
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    }, 1800);
  });
}

function selectPayment(method) {
  document.getElementById('payment-method').value = method;
  document.querySelectorAll('.payment-option').forEach((opt) => {
    opt.classList.remove('selected');
  });
  document.querySelector(`[data-payment="${method}"]`).classList.add('selected');

  document.getElementById('card-payment').style.display = method === 'card' ? 'block' : 'none';
  document.getElementById('momo-payment').style.display = method === 'momo' ? 'block' : 'none';
  document.getElementById('airtel-payment').style.display = method === 'airtel' ? 'block' : 'none';
  document.getElementById('cash-payment').style.display = method === 'cash' ? 'block' : 'none';
}

function bindContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = document.getElementById('contact-status');
    status.textContent = 'Thanks! Your message has been sent. We will respond shortly.';
    form.reset();
    setTimeout(() => {
      status.textContent = '';
    }, 3500);
  });
}

function setupCategoryLinks() {
  document.querySelectorAll('.category-card').forEach((card) => {
    card.addEventListener('click', (event) => {
      event.preventDefault();
      const category = card.dataset.category;
      window.location.href = `category.html?category=${encodeURIComponent(category)}`;
    });
  });
}

function handleQueryCategory() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');
  if (category) {
    document.querySelectorAll('.filter-button').forEach((button) => {
      button.classList.toggle('active', button.dataset.category === category);
    });
    renderCategoryProducts(category);
  }
}

function renderAccountState() {
  const user = getUser();
  const actions = document.querySelector('.action-group');
  if (!actions) return;
  if (user) {
    const accountButton = document.createElement('span');
    accountButton.className = 'action-link';
    accountButton.textContent = `Hello, ${user.name}`;
    const logoutButton = document.createElement('button');
    logoutButton.className = 'button button-secondary';
    logoutButton.textContent = 'Sign out';
    logoutButton.onclick = () => {
      localStorage.removeItem('simbaCurrentUser');
      window.location.reload();
    };
    const signInLink = actions.querySelector('.action-link[href="signin.html"]');
    const signUpLink = actions.querySelector('.button[href="signup.html"]');
    if (signInLink) signInLink.remove();
    if (signUpLink) signUpLink.remove();
    actions.prepend(logoutButton);
    actions.prepend(accountButton);
  }
}

function initializePage() {
  updateCartCount();
  renderCategories();
  renderFeaturedProducts();
  renderCategoryProducts();
  showCategoryFilterButtons();
  bindCheckoutButton();
  bindSignUpForm();
  bindSignInForm();
  bindCheckoutForm();
  bindContactForm();
  renderCart();
  renderCheckoutSummary();
  setupCategoryLinks();
  handleQueryCategory();
  renderAccountState();
  bindSearchInput();
  updateWishlistButtons();
  initializeChatbot();
}

function bindSearchInput() {
  const input = document.getElementById('search-input');
  const resultsDiv = document.getElementById('search-results');
  if (!input) return;

  input.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
      resultsDiv.innerHTML = '';
      resultsDiv.style.display = 'none';
      return;
    }

    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );

    if (results.length === 0) {
      resultsDiv.innerHTML = '<div class="search-result-item">No products found</div>';
      resultsDiv.style.display = 'block';
      return;
    }

    resultsDiv.innerHTML = results
      .slice(0, 6)
      .map(
        (product) => `
          <div class="search-result-item" onclick="addToCart(${product.id}); document.getElementById('search-input').value=''; document.getElementById('search-results').style.display='none';">
            <strong>${product.name}</strong> - ${formatCurrency(product.price)}
            <div style="font-size: 0.85rem; color: var(--muted);">${product.category}</div>
          </div>`
      )
      .join('');
    resultsDiv.style.display = 'block';
  });

  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !resultsDiv.contains(e.target)) {
      resultsDiv.style.display = 'none';
    }
  });
}

const chatbotResponses = {
  greeting: ["Hello! 👋 Welcome to Simba Market. How can I help you today?", "Hi there! 😊 What can I assist you with?"],
  products: ["We have a wide range of groceries, household essentials, and daily-use items. Would you like to browse a specific category?", "Check our categories for fresh produce, dairy, bakery, beverages, snacks, and much more!"],
  payment: ["We accept MOMO, Airtel Money, and card payments for your convenience. Safe and secure checkout! 💳", "Payment options: MOMO, Airtel Money, Credit/Debit Cards. All transactions are secure."],
  delivery: ["We offer fast delivery to most areas. Shipping fee is $5.00 on all orders.", "Our delivery partners ensure your groceries arrive fresh and on time!"],
  account: ["Sign up takes less than a minute! Create an account to save your cart and track orders.", "Already have an account? Sign in here to continue shopping!"],
  contact: ["Feel free to reach out! 📞 Phone: 0787065734 | Email: itangishatsemus@gmail.com | Name: Musa", "Contact us anytime for support. We're here to help!"],
  thanks: ["You're welcome! Is there anything else I can help you with?", "Happy to help! Need anything else?"],
  default: ["I'm here to help! You can ask about products, payments, delivery, or anything else. How can I assist? 🛒", "That's interesting! Would you like to know more about our products or services?"]
};

function initializeChatbot() {
  const chatbotBtn = document.createElement('button');
  chatbotBtn.className = 'chatbot-icon';
  chatbotBtn.innerHTML = '💬';
  chatbotBtn.onclick = () => toggleChatbot();
  document.body.appendChild(chatbotBtn);

  const chatbotWindow = document.createElement('div');
  chatbotWindow.className = 'chatbot-window';
  chatbotWindow.id = 'chatbot-window';
  chatbotWindow.style.display = 'none';
  chatbotWindow.innerHTML = `
    <div class="chatbot-header">
      <div>
        <h3 style="margin: 0;">Simba Support Chat</h3>
        <p style="margin: 0; font-size: 0.85rem; opacity: 0.9;">AI Assistant • Always Online</p>
      </div>
      <button class="chatbot-close" onclick="toggleChatbot()">✕</button>
    </div>
    <div class="chatbot-messages" id="chatbot-messages"></div>
    <div class="chatbot-input">
      <input type="text" id="chatbot-input" placeholder="Type your message..." />
      <button onclick="sendChatMessage()">📤</button>
    </div>
  `;
  document.body.appendChild(chatbotWindow);

  const messagesDiv = document.getElementById('chatbot-messages');
  addChatbotMessage("Hello! 👋 Welcome to Simba Market. I'm here 24/7 to help with any questions about our products, payments, or delivery. What can I do for you?", 'bot');

  document.getElementById('chatbot-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChatMessage();
  });
}

function toggleMobileMenu() {
  const nav = document.querySelector('.main-nav');
  const search = document.querySelector('.search-container');
  const actions = document.querySelector('.action-group');

  nav.classList.toggle('mobile-menu-open');
  search.classList.toggle('mobile-menu-open');
  actions.classList.toggle('mobile-menu-open');
}

function addChatbotMessage(text, sender) {
  const messagesDiv = document.getElementById('chatbot-messages');
  if (!messagesDiv) return;
  const message = document.createElement('div');
  message.className = `message ${sender}`;
  message.textContent = text;
  messagesDiv.appendChild(message);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function sendChatMessage() {
  const input = document.getElementById('chatbot-input');
  if (!input) return;
  const message = input.value.trim();
  if (!message) return;

  addChatbotMessage(message, 'user');
  input.value = '';

  const lowerMessage = message.toLowerCase();
  let response = chatbotResponses.default[0];

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    response = chatbotResponses.greeting[Math.floor(Math.random() * chatbotResponses.greeting.length)];
  } else if (lowerMessage.includes('product') || lowerMessage.includes('what do you sell')) {
    response = chatbotResponses.products[Math.floor(Math.random() * chatbotResponses.products.length)];
  } else if (lowerMessage.includes('payment') || lowerMessage.includes('momo') || lowerMessage.includes('airtel')) {
    response = chatbotResponses.payment[Math.floor(Math.random() * chatbotResponses.payment.length)];
  } else if (lowerMessage.includes('delivery') || lowerMessage.includes('shipping')) {
    response = chatbotResponses.delivery[Math.floor(Math.random() * chatbotResponses.delivery.length)];
  } else if (lowerMessage.includes('account') || lowerMessage.includes('sign')) {
    response = chatbotResponses.account[Math.floor(Math.random() * chatbotResponses.account.length)];
  } else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
    response = chatbotResponses.contact[Math.floor(Math.random() * chatbotResponses.contact.length)];
  } else if (lowerMessage.includes('thank')) {
    response = chatbotResponses.thanks[Math.floor(Math.random() * chatbotResponses.thanks.length)];
  }

  setTimeout(() => {
    addChatbotMessage(response, 'bot');
  }, 500);
}

function toggleChatbot() {
  const window = document.getElementById('chatbot-window');
  if (!window) return;
  window.style.display = window.style.display === 'none' ? 'flex' : 'none';
  if (window.style.display === 'flex') {
    document.getElementById('chatbot-input').focus();
  }
}

document.addEventListener('DOMContentLoaded', initializePage);
