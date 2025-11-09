// Admin Features CRUD
const API_BASE_URL = '/api/features';
let authToken = localStorage.getItem('authToken') || '';

function getHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`,
  };
}

function openCreateModal() {
  document.getElementById('modalTitle').textContent = 'Add Feature';
  document.getElementById('featureForm').reset();
  document.getElementById('featureId').value = '';
  
  // Hide icon preview
  document.getElementById('iconPreview').classList.add('hidden');
  
  document.getElementById('featureModal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('featureModal').classList.add('hidden');
}

// Show icon preview when icon is selected
function updateIconPreview() {
  const iconSelect = document.getElementById('featureIcon');
  const iconValue = iconSelect.value;
  const iconPreview = document.getElementById('iconPreview');
  const previewIcon = document.getElementById('previewIcon');
  const previewIconName = document.getElementById('previewIconName');
  
  if (iconValue) {
    // Get selected option text
    const selectedOption = iconSelect.options[iconSelect.selectedIndex];
    const optionText = selectedOption.textContent;
    
    // Update preview
    previewIcon.className = `fas ${iconValue} text-5xl text-blue-600 mb-2`;
    previewIconName.textContent = optionText;
    iconPreview.classList.remove('hidden');
  } else {
    iconPreview.classList.add('hidden');
  }
}

async function editFeature(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    const feature = await response.json();
    
    document.getElementById('modalTitle').textContent = 'Edit Feature';
    document.getElementById('featureId').value = feature.id;
    document.getElementById('featureName').value = feature.name;
    document.getElementById('featureDescription').value = feature.description;
    document.getElementById('featureIcon').value = feature.icon || '';
    
    // Show icon preview for existing icon
    updateIconPreview();
    
    document.getElementById('featureModal').classList.remove('hidden');
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

async function saveFeature(event) {
  event.preventDefault();
  
  const id = document.getElementById('featureId').value;
  const data = {
    name: document.getElementById('featureName').value,
    description: document.getElementById('featureDescription').value,
    icon: document.getElementById('featureIcon').value || null,
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
      throw new Error(error.message || 'Failed to save feature');
    }
    
    alert(id ? 'Feature updated!' : 'Feature created!');
    closeModal();
    location.reload();
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

async function deleteFeature(id, name) {
  if (!confirm(`Delete "${name}"?`)) return;
  
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    
    if (!response.ok) throw new Error('Failed to delete feature');
    
    alert('Feature deleted!');
    location.reload();
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

document.getElementById('featureModal')?.addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// Add event listener for icon select change
document.getElementById('featureIcon')?.addEventListener('change', updateIconPreview);
