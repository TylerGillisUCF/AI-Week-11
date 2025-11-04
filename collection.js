// Collection page logic
let collectedWritings = [];
let currentFilter = 'all';

// Initialize collection page
function initCollection() {
    loadCollectedWritings();
    setupFilterButtons();
    updateStats();
    renderCollection();
    setupModalListeners();
}

// Load collected writings from localStorage
function loadCollectedWritings() {
    const saveData = localStorage.getItem('historicalWritingsGame');
    if (saveData) {
        try {
            const data = JSON.parse(saveData);
            collectedWritings = data.collectedWritings || [];
        } catch (error) {
            console.error('Error loading collection:', error);
            collectedWritings = [];
        }
    }
}

// Setup filter buttons
function setupFilterButtons() {
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            // Update active state
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            // Set filter and re-render
            currentFilter = e.target.dataset.filter;
            renderCollection();
        });
    });
}

// Update statistics
function updateStats() {
    const collectedCount = collectedWritings.length;
    const templeCount = collectedWritings.filter(id => {
        const writing = getWritingById(id);
        return writing && writing.location === 'temple';
    }).length;
    const ballroomCount = collectedWritings.filter(id => {
        const writing = getWritingById(id);
        return writing && writing.location === 'ballroom';
    }).length;
    const churchCount = collectedWritings.filter(id => {
        const writing = getWritingById(id);
        return writing && writing.location === 'church';
    }).length;

    document.getElementById('collectedCount').textContent = collectedCount;
    document.getElementById('templeCount').textContent = templeCount;
    document.getElementById('ballroomCount').textContent = ballroomCount;
    document.getElementById('churchCount').textContent = churchCount;
}

// Render collection
function renderCollection() {
    const grid = document.getElementById('collectionGrid');
    const noCollection = document.getElementById('noCollection');

    if (collectedWritings.length === 0) {
        grid.style.display = 'none';
        noCollection.style.display = 'block';
        return;
    }

    grid.style.display = 'grid';
    noCollection.style.display = 'none';

    // Get all writings
    let writingsToDisplay = HISTORICAL_WRITINGS.map(writing => ({
        ...writing,
        collected: collectedWritings.includes(writing.id)
    }));

    // Apply filter
    if (currentFilter !== 'all') {
        writingsToDisplay = writingsToDisplay.filter(w => w.location === currentFilter);
    }

    // Render items
    grid.innerHTML = writingsToDisplay.map(writing => {
        const locationLabels = {
            temple: 'Greek Temple',
            ballroom: 'Ballroom',
            church: 'Church'
        };

        if (writing.collected) {
            return `
                <div class="collection-item collected" data-writing-id="${writing.id}">
                    <div class="item-header">
                        <span class="item-location ${writing.location}">${locationLabels[writing.location]}</span>
                    </div>
                    <div class="item-icon">📖</div>
                    <h3 class="item-title">${writing.title}</h3>
                    <p class="item-author">${writing.author}</p>
                    <p class="item-year">${writing.year}</p>
                    <button class="btn btn-small btn-primary view-details">View Details</button>
                </div>
            `;
        } else {
            return `
                <div class="collection-item locked">
                    <div class="item-header">
                        <span class="item-location ${writing.location}">${locationLabels[writing.location]}</span>
                    </div>
                    <div class="item-icon locked-icon">🔒</div>
                    <h3 class="item-title">???</h3>
                    <p class="item-subtitle">Not yet discovered</p>
                </div>
            `;
        }
    }).join('');

    // Add click listeners to view details buttons
    grid.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', (e) => {
            const item = e.target.closest('.collection-item');
            const writingId = parseInt(item.dataset.writingId);
            showDetailModal(writingId);
        });
    });
}

// Show detail modal
function showDetailModal(writingId) {
    const writing = getWritingById(writingId);
    if (!writing) return;

    document.getElementById('modalTitle').textContent = writing.title;
    document.getElementById('modalAuthor').textContent = writing.author;
    document.getElementById('modalYear').textContent = writing.year;
    document.getElementById('modalSummary').textContent = writing.summary;
    document.getElementById('modalDescription').textContent = writing.description;
    document.getElementById('modalSignificance').textContent = writing.significance;

    const conceptsList = document.getElementById('modalConcepts');
    conceptsList.innerHTML = writing.keyConcepts.map(concept =>
        `<li>${concept}</li>`
    ).join('');

    document.getElementById('collectionDetailModal').classList.add('active');
}

// Setup modal listeners
function setupModalListeners() {
    document.querySelectorAll('.close-modal, .close-modal-btn').forEach(button => {
        button.addEventListener('click', closeModal);
    });

    // Close on background click
    document.getElementById('collectionDetailModal').addEventListener('click', (e) => {
        if (e.target.id === 'collectionDetailModal') {
            closeModal();
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Close modal
function closeModal() {
    document.getElementById('collectionDetailModal').classList.remove('active');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCollection);
} else {
    initCollection();
}
