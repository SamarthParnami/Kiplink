// Product data
const products = [
  {
    id: 1,
    name: "Minimal Tea Pot",
    description: "A sleek, modern tea pot for seamless brewing. Perfect for home and cafe.",
    price: 1999,
    image: "https://picsum.photos/id/225/400/300"
  },
  {
    id: 2,
    name: "Classic Ceramic Pot",
    description: "A timeless ceramic pot with elegant curves. Ideal for traditional tea ceremonies.",
    price: 2499,
    image: "https://picsum.photos/id/225/400/300"
  },
  {
    id: 3,
    name: "Artisan Clay Pot",
    description: "Handcrafted clay pot with rustic charm. Enhances the natural flavor of your tea.",
    price: 3299,
    image: "https://picsum.photos/id/225/400/300"
  }
];

// Get product by ID
function getProductById(id) {
  return products.find(p => p.id === parseInt(id));
}

// Cart functions
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

function addToCart(productId, quantity) {
  const cart = getCart();
  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
}

function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// Wishlist functions
function getWishlist() {
  const wishlist = localStorage.getItem('wishlist');
  return wishlist ? JSON.parse(wishlist) : [];
}

function toggleWishlist(productId) {
  const wishlist = getWishlist();
  const index = wishlist.indexOf(productId);
  
  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(productId);
  }
  
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  return wishlist;
}

function isInWishlist(productId) {
  const wishlist = getWishlist();
  return wishlist.includes(productId);
}

// Format price in INR
function formatPrice(price) {
  return '₹' + price.toLocaleString('en-IN');
}
