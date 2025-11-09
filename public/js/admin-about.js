// Admin About CRUD
const API_BASE_URL = '/api/about';
let authToken = localStorage.getItem('authToken') || '';

// Define fixed order mapping for sections
const SECTION_ORDER = {
  'about': 1,
  'vision': 2,
  'mission': 3,
  'history': 4,
  'values': 5
};

function getHeaders() {
  return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` };
}

// Auto-update order when section changes
function updateOrderBySection() {
  const section = document.getElementById('aboutSection').value;
  const order = SECTION_ORDER[section] || 0;
  document.getElementById('aboutOrder').value = order;
}

function openCreateModal() {
  document.getElementById('modalTitle').textContent = 'Add About Section';
  document.getElementById('aboutForm').reset();
  document.getElementById('aboutId').value = '';
  
  // Set default order based on default section
  updateOrderBySection();
  
  document.getElementById('aboutModal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('aboutModal').classList.add('hidden');
}

async function editAbout(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    const about = await response.json();
    
    document.getElementById('modalTitle').textContent = 'Edit About Section';
    document.getElementById('aboutId').value = about.id;
    document.getElementById('aboutTitle').value = about.title;
    document.getElementById('aboutDescription').value = about.description;
    document.getElementById('aboutSection').value = about.section || '';
    document.getElementById('aboutImageUrl').value = about.imageUrl || '';
    document.getElementById('aboutIsActive').checked = about.isActive;
    
    // Auto-set order based on section
    updateOrderBySection();
    
    document.getElementById('aboutModal').classList.remove('hidden');
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

async function saveAbout(event) {
  event.preventDefault();
  
  const id = document.getElementById('aboutId').value;
  const title = document.getElementById('aboutTitle').value.trim();
  const description = document.getElementById('aboutDescription').value.trim();
  
  // Client-side validation
  if (title.length < 3) {
    alert('Title must be at least 3 characters long');
    return;
  }
  
  if (description.length < 10) {
    alert('Description must be at least 10 characters long');
    return;
  }
  
  // Auto-update order based on section before saving
  const section = document.getElementById('aboutSection').value;
  const autoOrder = SECTION_ORDER[section] || 0;
  
  const data = {
    title: title,
    description: description,
    section: section || null,
    imageUrl: document.getElementById('aboutImageUrl').value.trim() || null,
    order: autoOrder, // Use auto-calculated order
    isActive: document.getElementById('aboutIsActive').checked,
  };
  
  try {
    const url = id ? `${API_BASE_URL}/${id}` : API_BASE_URL;
    const method = id ? 'PATCH' : 'POST';
    
    const response = await fetch(url, {
      method: method,
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      
      // Handle specific errors
      if (response.status === 401) {
        alert('Authentication required! Please login first.\n\nRedirecting to login page...');
        setTimeout(() => window.location.href = '/login', 1500);
        return;
      }
      
      if (response.status === 400) {
        const errorMsg = error.message || 'Validation error';
        if (Array.isArray(error.message)) {
          alert('Validation errors:\n' + error.message.join('\n'));
        } else {
          alert('Error: ' + errorMsg);
        }
        return;
      }
      
      throw new Error(error.message || `Failed to save (${response.status})`);
    }
    
    alert(id ? '✅ About section updated successfully!' : '✅ About section created successfully!');
    closeModal();
    location.reload();
  } catch (error) {
    console.error('Save error:', error);
    alert('❌ Error: ' + error.message);
  }
}

async function deleteAbout(id, title) {
  if (!confirm(`Delete "${title}"?`)) return;
  
  try {
    await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE', headers: getHeaders() });
    alert('About deleted!');
    location.reload();
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

document.getElementById('aboutModal')?.addEventListener('click', e => {
  if (e.target.id === 'aboutModal') closeModal();
});

// Check auth status on page load
window.addEventListener('DOMContentLoaded', function() {
  const token = localStorage.getItem('authToken');
  const warningBanner = document.getElementById('authWarning');
  
  if (!token && warningBanner) {
    warningBanner.classList.remove('hidden');
  }
  
  // Add event listener to section dropdown to auto-update order
  const sectionSelect = document.getElementById('aboutSection');
  if (sectionSelect) {
    sectionSelect.addEventListener('change', updateOrderBySection);
  }
});
