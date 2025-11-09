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
  document.getElementById('featureModal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('featureModal').classList.add('hidden');
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
