// Admin Pricings CRUD
const API_BASE_URL = '/api/pricings';
let authToken = localStorage.getItem('authToken') || '';

function getHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`,
  };
}

function openCreateModal() {
  document.getElementById('modalTitle').textContent = 'Add Pricing Plan';
  document.getElementById('pricingForm').reset();
  document.getElementById('pricingId').value = '';
  document.getElementById('pricingModal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('pricingModal').classList.add('hidden');
}

async function editPricing(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    const pricing = await response.json();
    
    document.getElementById('modalTitle').textContent = 'Edit Pricing Plan';
    document.getElementById('pricingId').value = pricing.id;
    document.getElementById('pricingName').value = pricing.name;
    document.getElementById('pricingDescription').value = pricing.description;
    document.getElementById('pricingPrice').value = pricing.price;
    document.getElementById('pricingPeriod').value = pricing.period;
    
    // Convert features array to multiline string
    if (pricing.features && Array.isArray(pricing.features)) {
      document.getElementById('pricingFeatures').value = pricing.features.join('\n');
    } else {
      document.getElementById('pricingFeatures').value = '';
    }
    
    document.getElementById('pricingModal').classList.remove('hidden');
  } catch (error) {
    alert('Error loading pricing: ' + error.message);
  }
}

async function savePricing(event) {
  event.preventDefault();
  
  const id = document.getElementById('pricingId').value;
  
  // Convert multiline string to features array
  const featuresText = document.getElementById('pricingFeatures').value.trim();
  const features = featuresText 
    ? featuresText.split('\n').map(f => f.trim()).filter(f => f.length > 0)
    : [];
  
  const data = {
    name: document.getElementById('pricingName').value,
    description: document.getElementById('pricingDescription').value,
    price: parseFloat(document.getElementById('pricingPrice').value),
    period: document.getElementById('pricingPeriod').value,
    features: features,
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
      localStorage.removeItem('authToken');
      window.location.href = '/login';
      return;
    }
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to save pricing');
    }
    
    alert(id ? 'Pricing updated!' : 'Pricing created!');
    closeModal();
    location.reload();
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

async function deletePricing(id, name) {
  if (!confirm(`Delete "${name}"?`)) return;
  
  try {
    await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    
    alert('Pricing deleted!');
    location.reload();
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

document.getElementById('pricingModal')?.addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});
