// Admin About CRUD
const API_BASE_URL = '/api/about';
let authToken = localStorage.getItem('authToken') || '';
let currentImageMode = 'url'; // 'url' or 'upload'
let uploadedImageBase64 = null;

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

// Toggle between URL and Upload mode
function toggleImageMode(mode) {
  currentImageMode = mode;
  const urlSection = document.getElementById('urlInputSection');
  const uploadSection = document.getElementById('uploadInputSection');
  const btnUrl = document.getElementById('btnUrlMode');
  const btnUpload = document.getElementById('btnUploadMode');
  
  if (mode === 'url') {
    urlSection.classList.remove('hidden');
    uploadSection.classList.add('hidden');
    btnUrl.classList.remove('bg-white', 'text-gray-700', 'border-gray-300');
    btnUrl.classList.add('bg-blue-600', 'text-white', 'border-blue-600');
    btnUpload.classList.remove('bg-blue-600', 'text-white', 'border-blue-600');
    btnUpload.classList.add('bg-white', 'text-gray-700', 'border-gray-300');
    
    // Clear upload
    uploadedImageBase64 = null;
    document.getElementById('imagePreview').classList.add('hidden');
    document.getElementById('aboutImageFile').value = '';
  } else {
    urlSection.classList.add('hidden');
    uploadSection.classList.remove('hidden');
    btnUpload.classList.remove('bg-white', 'text-gray-700', 'border-gray-300');
    btnUpload.classList.add('bg-blue-600', 'text-white', 'border-blue-600');
    btnUrl.classList.remove('bg-blue-600', 'text-white', 'border-blue-600');
    btnUrl.classList.add('bg-white', 'text-gray-700', 'border-gray-300');
    
    // Clear URL
    document.getElementById('aboutImageUrl').value = '';
  }
}

// Handle image file upload
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  // Validate file type
  if (!file.type.startsWith('image/')) {
    alert('Please upload an image file (PNG, JPG, WEBP)');
    return;
  }
  
  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    alert('Image size must be less than 5MB');
    return;
  }
  
  // Read file as base64
  const reader = new FileReader();
  reader.onload = function(e) {
    uploadedImageBase64 = e.target.result;
    
    // Show preview
    document.getElementById('previewImg').src = uploadedImageBase64;
    document.getElementById('imagePreview').classList.remove('hidden');
  };
  reader.readAsDataURL(file);
}

// Remove uploaded image
function removeUploadedImage() {
  uploadedImageBase64 = null;
  document.getElementById('aboutImageFile').value = '';
  document.getElementById('imagePreview').classList.add('hidden');
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
  
  // Reset image mode to URL
  toggleImageMode('url');
  uploadedImageBase64 = null;
  
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
    document.getElementById('aboutIsActive').checked = about.isActive;
    
    // Set image mode based on existing data
    if (about.imageUrl) {
      // Check if it's a base64 image or URL
      if (about.imageUrl.startsWith('data:image')) {
        toggleImageMode('upload');
        uploadedImageBase64 = about.imageUrl;
        document.getElementById('previewImg').src = about.imageUrl;
        document.getElementById('imagePreview').classList.remove('hidden');
      } else {
        toggleImageMode('url');
        document.getElementById('aboutImageUrl').value = about.imageUrl;
      }
    } else {
      toggleImageMode('url');
    }
    
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
  
  // Determine image URL based on mode
  let imageUrl = null;
  if (currentImageMode === 'url') {
    imageUrl = document.getElementById('aboutImageUrl').value.trim() || null;
  } else if (currentImageMode === 'upload' && uploadedImageBase64) {
    imageUrl = uploadedImageBase64; // Store base64 image
  }
  
  const data = {
    title: title,
    description: description,
    section: section || null,
    imageUrl: imageUrl,
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
