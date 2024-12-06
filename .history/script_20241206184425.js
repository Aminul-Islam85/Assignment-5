let accountBalance = 5500;

document.getElementById('donation-tab').addEventListener('click', () => {
  toggleSection('donation');
});

document.getElementById('history-tab').addEventListener('click', () => {
  toggleSection('history');
});

document.querySelectorAll('.donate-btn').forEach(button => {
  button.addEventListener('click', () => {
    const id = button.getAttribute('data-id');
    const input = document.getElementById(`${id}-input`);
    const amount = parseInt(input.value);

    if (isNaN(amount) || amount <= 0) {
      alert('Invalid amount');
      return;
    }

    if (amount > accountBalance) {
      alert('Insufficient balance');
      return;
    }

    accountBalance -= amount;
    document.getElementById('account-balance').textContent = `${accountBalance} BDT`;

    const donation = document.getElementById(`${id}-donation`);
    const currentDonation = parseInt(donation.textContent) || 0;
    donation.textContent = `${currentDonation + amount} BDT`;

    addToHistory(amount, id);

    input.value = '';
    showModal();
  });
});

document.getElementById('close-modal').addEventListener('click', () => {
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
});

function toggleSection(section) {
  document.getElementById('donation-section').classList.toggle('hidden', section !== 'donation');
  document.getElementById('history-section').classList.toggle('hidden', section !== 'history');
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.toggle('active', btn.id.includes(section)));
}

function addToHistory(amount, id) {
  const history = document.getElementById('history-list');
  const item = document.createElement('li');
  const now = new Date();
  const donationName =
    id === 'noakhali' ? 'Flood at Noakhali' :
    id === 'feni' ? 'Flood Relief in Feni' :
    'Aid for Quota Movement';
  item.textContent = `${amount} BDT donated to ${donationName} on ${now.toLocaleString()}`;
  history.appendChild(item);
}

function showModal() {
  document.getElementById('modal').classList.remove('hidden');
}
