// Admin Members CRUD
const API_BASE_URL = '/api/organization-members';
let authToken = localStorage.getItem('authToken') || '';

function getHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`,
  };
}

function openCreateModal() {
  document.getElementById('modalTitle').textContent = 'Add Member';
  document.getElementById('memberForm').reset();
  document.getElementById('memberId').value = '';
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
    document.getElementById('memberPhotoUrl').value = member.photoUrl || '';
    document.getElementById('memberModal').classList.remove('hidden');
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

async function saveMember(event) {
  event.preventDefault();
  
  const id = document.getElementById('memberId').value;
  const data = {
    name: document.getElementById('memberName').value,
    position: document.getElementById('memberPosition').value,
    photoUrl: document.getElementById('memberPhotoUrl').value || null,
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
    
    alert(id ? 'Member updated!' : 'Member created!');
    closeModal();
    location.reload();
  } catch (error) {
    alert('Error: ' + error.message);
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
