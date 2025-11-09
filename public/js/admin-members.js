// Admin Members CRUD
const API_BASE_URL = '/api/organization-members';
let authToken = localStorage.getItem('authToken') || '';
let currentPhotoMode = 'url'; // 'url' or 'upload'
let uploadedPhotoBase64 = null;

function getHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`,
  };
}

// Toggle between URL and Upload mode for photo
function togglePhotoMode(mode) {
  currentPhotoMode = mode;
  const urlSection = document.getElementById('photoUrlSection');
  const uploadSection = document.getElementById('photoUploadSection');
  const btnUrl = document.getElementById('btnPhotoUrlMode');
  const btnUpload = document.getElementById('btnPhotoUploadMode');
  
  if (mode === 'url') {
    urlSection.classList.remove('hidden');
    uploadSection.classList.add('hidden');
    btnUrl.classList.remove('bg-white', 'text-gray-700', 'border-gray-300');
    btnUrl.classList.add('bg-blue-600', 'text-white', 'border-blue-600');
    btnUpload.classList.remove('bg-blue-600', 'text-white', 'border-blue-600');
    btnUpload.classList.add('bg-white', 'text-gray-700', 'border-gray-300');
    
    // Clear upload
    uploadedPhotoBase64 = null;
    document.getElementById('photoPreview').classList.add('hidden');
    document.getElementById('memberPhotoFile').value = '';
  } else {
    urlSection.classList.add('hidden');
    uploadSection.classList.remove('hidden');
    btnUpload.classList.remove('bg-white', 'text-gray-700', 'border-gray-300');
    btnUpload.classList.add('bg-blue-600', 'text-white', 'border-blue-600');
    btnUrl.classList.remove('bg-blue-600', 'text-white', 'border-blue-600');
    btnUrl.classList.add('bg-white', 'text-gray-700', 'border-gray-300');
    
    // Clear URL
    document.getElementById('memberPhotoUrl').value = '';
  }
}

// Handle photo file upload
function handlePhotoUpload(event) {
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
    uploadedPhotoBase64 = e.target.result;
    
    // Show preview
    document.getElementById('previewPhotoImg').src = uploadedPhotoBase64;
    document.getElementById('photoPreview').classList.remove('hidden');
  };
  reader.readAsDataURL(file);
}

// Remove uploaded photo
function removeUploadedPhoto() {
  uploadedPhotoBase64 = null;
  document.getElementById('memberPhotoFile').value = '';
  document.getElementById('photoPreview').classList.add('hidden');
}

function openCreateModal() {
  document.getElementById('modalTitle').textContent = 'Add Member';
  document.getElementById('memberForm').reset();
  document.getElementById('memberId').value = '';
  
  // Reset photo mode to URL
  togglePhotoMode('url');
  uploadedPhotoBase64 = null;
  
  document.getElementById('memberModal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('memberModal').classList.add('hidden');
}

async function editMember(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    const member = await response.json();
    
    document.getElementById('modalTitle').textContent = 'Edit Member';
    document.getElementById('memberId').value = member.id;
    document.getElementById('memberName').value = member.name;
    document.getElementById('memberPosition').value = member.position;
    
    // Set photo mode based on existing data
    if (member.photoUrl) {
      // Check if it's a base64 image or URL
      if (member.photoUrl.startsWith('data:image')) {
        togglePhotoMode('upload');
        uploadedPhotoBase64 = member.photoUrl;
        document.getElementById('previewPhotoImg').src = member.photoUrl;
        document.getElementById('photoPreview').classList.remove('hidden');
      } else {
        togglePhotoMode('url');
        document.getElementById('memberPhotoUrl').value = member.photoUrl;
      }
    } else {
      togglePhotoMode('url');
    }
    
    document.getElementById('memberModal').classList.remove('hidden');
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

async function saveMember(event) {
  event.preventDefault();
  
  const id = document.getElementById('memberId').value;
  
  // Determine photo URL based on mode
  let photoUrl = null;
  if (currentPhotoMode === 'url') {
    photoUrl = document.getElementById('memberPhotoUrl').value || null;
  } else if (currentPhotoMode === 'upload' && uploadedPhotoBase64) {
    photoUrl = uploadedPhotoBase64; // Store base64 photo
  }
  
  const data = {
    name: document.getElementById('memberName').value,
    position: document.getElementById('memberPosition').value,
    photoUrl: photoUrl,
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
      const error = await response.json();
      throw new Error(error.message || 'Failed to save member');
    }
    
    alert(id ? '✅ Member updated successfully!' : '✅ Member created successfully!');
    closeModal();
    location.reload();
  } catch (error) {
    alert('❌ Error: ' + error.message);
  }
}

async function deleteMember(id, name) {
  if (!confirm(`Delete "${name}"?`)) return;
  
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    
    if (!response.ok) throw new Error('Failed to delete member');
    
    alert('Member deleted!');
    location.reload();
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

document.getElementById('memberModal')?.addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});
