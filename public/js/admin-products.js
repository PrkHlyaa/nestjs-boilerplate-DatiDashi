// Admin Products CRUD with JWT Token
const API_BASE_URL = '/api/products';
let authToken = localStorage.getItem('authToken') || '';

// Check if user is authenticated
if (!authToken) {
  // For demo purposes, you can get token from login
  // In production, redirect to login page
  console.warn('No auth token found. Please login first.');
}

// Set auth header
function getHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`,
  };
}

// Open create modal
function openCreateModal() {
  document.getElementById('modalTitle').textContent = 'Add Product';
  document.getElementById('productForm').reset();
  document.getElementById('productId').value = '';
  document.getElementById('productModal').classList.remove('hidden');
}

// Close modal
function closeModal() {
  document.getElementById('productModal').classList.add('hidden');
}

// Edit product
async function editProduct(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    
    const product = await response.json();
    
    document.getElementById('modalTitle').textContent = 'Edit Product';
    document.getElementById('productId').value = product.id;
    document.getElementById('productJudul').value = product.judul;
    document.getElementById('productDeskripsi').value = product.deskripsi;
    document.getElementById('productJumlah').value = product.jumlah || 0;
    document.getElementById('productModal').classList.remove('hidden');
  } catch (error) {
    alert('Error loading product: ' + error.message);
  }
}

// Save product (create or update)
async function saveProduct(event) {
  event.preventDefault();
  
  const id = document.getElementById('productId').value;
  
  // Client-side validation
  const judul = document.getElementById('productJudul').value.trim();
  const deskripsi = document.getElementById('productDeskripsi').value.trim();
  const jumlah = parseInt(document.getElementById('productJumlah').value);
  
  if (!judul || judul.length < 3) {
    alert('Judul harus minimal 3 karakter');
    return;
  }
  
  if (!deskripsi || deskripsi.length < 10) {
    alert('Deskripsi harus minimal 10 karakter');
    return;
  }
  
  if (isNaN(jumlah) || jumlah < 0) {
    alert('Jumlah harus berupa angka positif');
    return;
  }
  
  const data = {
    judul,
    deskripsi,
    jumlah,
  };
  
  try {
    const url = id ? `${API_BASE_URL}/${id}` : API_BASE_URL;
    const method = id ? 'PATCH' : 'POST';
    
    const response = await fetch(url, {
      method: method,
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    
    if (response.status === 401) {
      alert('Session expired. Please login again.');
      localStorage.removeItem('token');
      window.location.href = '/login';
      return;
    }
    
    if (response.status === 400) {
      const error = await response.json();
      alert('Validation error: ' + (error.message || 'Invalid data'));
      return;
    }
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to save product');
    }
    
    alert(id ? 'Product updated successfully!' : 'Product created successfully!');
    closeModal();
    location.reload(); // Reload to see changes
  } catch (error) {
    if (error.message.includes('401') || error.message.includes('Unauthorized')) {
      alert('Authentication required. Please login first.');
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else {
      alert('Error saving product: ' + error.message);
    }
  }
}

// Delete product
async function deleteProduct(id, judul) {
  if (!confirm(`Are you sure you want to delete "${judul}"?`)) {
    return;
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    
    if (response.status === 401) {
      alert('Session expired. Please login again.');
      localStorage.removeItem('token');
      window.location.href = '/login';
      return;
    }
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete product');
    }
    
    alert('Product deleted successfully!');
    location.reload(); // Reload to see changes
  } catch (error) {
    if (error.message.includes('401') || error.message.includes('Unauthorized')) {
      alert('Authentication required. Please login first.');
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else {
      alert('Error deleting product: ' + error.message);
    }
  }
}

// Close modal when clicking outside
document.getElementById('productModal')?.addEventListener('click', function(event) {
  if (event.target === this) {
    closeModal();
  }
});

// For demo: Set token from login
function setAuthToken(token) {
  authToken = token;
  localStorage.setItem('authToken', token);
  location.reload();
}

// Show token input for demo
window.addEventListener('DOMContentLoaded', () => {
  if (!authToken) {
    const showTokenInput = confirm('No authentication token found. Do you want to enter one now?');
    if (showTokenInput) {
      const token = prompt('Enter your JWT token:');
      if (token) {
        setAuthToken(token);
      }
    }
  }
});
