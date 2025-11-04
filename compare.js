// Compare Mode Logic
let collectedWritings = [];
let selectedWriting1 = null;
let selectedWriting2 = null;

// Initialize compare page
function initCompare() {
    loadCollectedWritings();

    if (collectedWritings.length < 2) {
        showNoCollection();
        return;
    }

    hideNoCollection();
    populateSelects();
    setupEventListeners();
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

// Populate select dropdowns
function populateSelects() {
    const select1 = document.getElementById('writing1Select');
    const select2 = document.getElementById('writing2Select');

    collectedWritings.forEach(writingId => {
        const writing = getWritingById(writingId);
        if (writing) {
            const option1 = document.createElement('option');
            option1.value = writing.id;
            option1.textContent = `${writing.title} - ${writing.author}`;
            select1.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = writing.id;
            option2.textContent = `${writing.title} - ${writing.author}`;
            select2.appendChild(option2);
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    const select1 = document.getElementById('writing1Select');
    const select2 = document.getElementById('writing2Select');
    const compareButton = document.getElementById('compareButton');
    const clearButton = document.getElementById('clearComparison');

    select1.addEventListener('change', (e) => {
        selectedWriting1 = e.target.value ? getWritingById(parseInt(e.target.value)) : null;
        updatePreview('writing1Preview', selectedWriting1);
        updateCompareButton();
    });

    select2.addEventListener('change', (e) => {
        selectedWriting2 = e.target.value ? getWritingById(parseInt(e.target.value)) : null;
        updatePreview('writing2Preview', selectedWriting2);
        updateCompareButton();
    });

    compareButton.addEventListener('click', performComparison);
    clearButton.addEventListener('click', clearComparison);
}

// Update preview
function updatePreview(previewId, writing) {
    const preview = document.getElementById(previewId);

    if (!writing) {
        preview.innerHTML = '';
        return;
    }

    preview.innerHTML = `
        <div class="preview-content">
            <h4>${writing.title}</h4>
            <p class="preview-author">${writing.author}, ${writing.year}</p>
            <p class="preview-summary">${writing.summary}</p>
        </div>
    `;
}

// Update compare button state
function updateCompareButton() {
    const compareButton = document.getElementById('compareButton');
    const canCompare = selectedWriting1 && selectedWriting2 && selectedWriting1.id !== selectedWriting2.id;
    compareButton.disabled = !canCompare;
}

// Perform comparison
function performComparison() {
    if (!selectedWriting1 || !selectedWriting2) return;

    // Populate comparison cards
    populateComparisonCard('compare1', selectedWriting1);
    populateComparisonCard('compare2', selectedWriting2);

    // Perform analysis
    analyzeWritings(selectedWriting1, selectedWriting2);

    // Show results
    document.getElementById('comparisonResults').style.display = 'block';

    // Scroll to results
    document.getElementById('comparisonResults').scrollIntoView({ behavior: 'smooth' });
}

// Populate comparison card
function populateComparisonCard(prefix, writing) {
    document.getElementById(`${prefix}Title`).textContent = writing.title;
    document.getElementById(`${prefix}Author`).textContent = writing.author;
    document.getElementById(`${prefix}Year`).textContent = writing.year;
    document.getElementById(`${prefix}Summary`).textContent = writing.summary;

    const conceptsList = document.getElementById(`${prefix}Concepts`);
    conceptsList.innerHTML = writing.keyConcepts.map(concept =>
        `<li>${concept}</li>`
    ).join('');
}

// Analyze writings
function analyzeWritings(writing1, writing2) {
    // Historical Proximity
    analyzeHistoricalProximity(writing1, writing2);

    // Shared Concepts
    analyzeSharedConcepts(writing1, writing2);

    // Contrasting Philosophies
    analyzeContrastingPhilosophies(writing1, writing2);

    // Cultural Context
    analyzeCulturalContext(writing1, writing2);
}

// Analyze historical proximity
function analyzeHistoricalProximity(writing1, writing2) {
    const year1 = parseYear(writing1.year);
    const year2 = parseYear(writing2.year);
    const difference = Math.abs(year1 - year2);

    let proximity = '';
    let proximityClass = '';

    if (difference === 0) {
        proximity = 'These works were written in the same year!';
        proximityClass = 'proximity-same';
    } else if (difference < 50) {
        proximity = `These works were written within ${difference} years of each other - they are from the same historical period.`;
        proximityClass = 'proximity-close';
    } else if (difference < 200) {
        proximity = `These works are separated by ${difference} years - they share similar historical contexts.`;
        proximityClass = 'proximity-medium';
    } else if (difference < 500) {
        proximity = `These works are ${difference} years apart - they come from different but related eras.`;
        proximityClass = 'proximity-far';
    } else {
        proximity = `These works are separated by ${difference} years - they represent vastly different historical periods.`;
        proximityClass = 'proximity-very-far';
    }

    const timeline = generateTimeline(writing1, writing2, year1, year2);

    document.getElementById('historicalProximity').innerHTML = `
        <p class="${proximityClass}">${proximity}</p>
        <div class="timeline">${timeline}</div>
    `;
}

// Parse year from string
function parseYear(yearString) {
    const match = yearString.match(/-?\d+/);
    if (!match) return 0;

    let year = parseInt(match[0]);
    if (yearString.includes('BCE')) {
        year = -year;
    }
    return year;
}

// Generate timeline visualization
function generateTimeline(writing1, writing2, year1, year2) {
    const minYear = Math.min(year1, year2);
    const maxYear = Math.max(year1, year2);
    const range = maxYear - minYear || 1;

    const pos1 = year1 === minYear ? 0 : ((year1 - minYear) / range) * 100;
    const pos2 = year2 === minYear ? 0 : ((year2 - minYear) / range) * 100;

    return `
        <div class="timeline-container">
            <div class="timeline-bar">
                <div class="timeline-marker" style="left: ${pos1}%">
                    <div class="timeline-label">${writing1.title} (${writing1.year})</div>
                </div>
                <div class="timeline-marker" style="left: ${pos2}%">
                    <div class="timeline-label">${writing2.title} (${writing2.year})</div>
                </div>
            </div>
        </div>
    `;
}

// Analyze shared concepts
function analyzeSharedConcepts(writing1, writing2) {
    const concepts1 = writing1.keyConcepts.map(c => c.toLowerCase());
    const concepts2 = writing2.keyConcepts.map(c => c.toLowerCase());

    // Find similar concepts (checking for partial matches)
    const shared = [];
    const similar = [];

    concepts1.forEach(c1 => {
        concepts2.forEach(c2 => {
            if (c1 === c2 && !shared.includes(c1)) {
                shared.push(writing1.keyConcepts[concepts1.indexOf(c1)]);
            } else if (c1.includes(c2) || c2.includes(c1)) {
                if (!similar.some(s => s.includes(c1) || s.includes(c2))) {
                    similar.push(`${writing1.keyConcepts[concepts1.indexOf(c1)]} / ${writing2.keyConcepts[concepts2.indexOf(c2)]}`);
                }
            }
        });
    });

    let html = '';

    if (shared.length > 0) {
        html += '<div class="shared-exact"><h5>Exact Matches:</h5><ul>';
        shared.forEach(concept => {
            html += `<li class="concept-match">${concept}</li>`;
        });
        html += '</ul></div>';
    }

    if (similar.length > 0) {
        html += '<div class="shared-similar"><h5>Related Concepts:</h5><ul>';
        similar.forEach(concept => {
            html += `<li class="concept-similar">${concept}</li>`;
        });
        html += '</ul></div>';
    }

    if (shared.length === 0 && similar.length === 0) {
        html = '<p class="no-shared">These works explore distinct conceptual territories with no direct overlap in key concepts.</p>';
    }

    document.getElementById('sharedConcepts').innerHTML = html;
}

// Analyze contrasting philosophies
function analyzeContrastingPhilosophies(writing1, writing2) {
    const contrasts = [];

    // Location-based contrasts
    if (writing1.location !== writing2.location) {
        const locations = {
            temple: 'classical antiquity and philosophy',
            ballroom: 'enlightenment and political thought',
            church: 'religious and spiritual wisdom'
        };
        contrasts.push(`<strong>Thematic Origin:</strong> ${writing1.title} represents ${locations[writing1.location]}, while ${writing2.title} embodies ${locations[writing2.location]}.`);
    }

    // Author-based insights
    const authors = [writing1.author, writing2.author];
    if (authors.includes('Plato') && authors.includes('Aristotle')) {
        contrasts.push('<strong>Philosophical Tradition:</strong> Plato\'s idealism contrasts with Aristotle\'s empiricism.');
    }
    if (authors.includes('Thomas Hobbes') && authors.includes('John Locke')) {
        contrasts.push('<strong>Political Philosophy:</strong> Hobbes\' absolutism contrasts sharply with Locke\'s liberalism.');
    }
    if (authors.includes('Karl Marx and Friedrich Engels') || authors.includes('Adam Smith')) {
        contrasts.push('<strong>Economic Theory:</strong> These works represent opposing views on capitalism and economic organization.');
    }

    // Time period analysis
    const year1 = parseYear(writing1.year);
    const year2 = parseYear(writing2.year);

    if ((year1 < 0 && year2 > 1500) || (year2 < 0 && year1 > 1500)) {
        contrasts.push('<strong>Temporal Perspective:</strong> These works span from ancient to modern thought, representing fundamentally different worldviews shaped by their eras.');
    }

    // Genre/type analysis
    const genres = {
        'Epic': ['Iliad', 'Odyssey', 'Aeneid', 'Divine Comedy'],
        'Philosophy': ['Republic', 'Ethics', 'Meditations', 'Critique'],
        'Political': ['Prince', 'Leviathan', 'Two Treatises', 'Social Contract'],
        'Religious': ['Bible', 'Qur\'an', 'Torah', 'Gita'],
        'Drama': ['Hamlet', 'Oedipus', 'Antigone']
    };

    let genre1 = 'Philosophical';
    let genre2 = 'Philosophical';

    for (const [genre, works] of Object.entries(genres)) {
        if (works.some(w => writing1.title.includes(w))) genre1 = genre;
        if (works.some(w => writing2.title.includes(w))) genre2 = genre;
    }

    if (genre1 !== genre2) {
        contrasts.push(`<strong>Genre:</strong> ${writing1.title} is a ${genre1} work, while ${writing2.title} is ${genre2} in nature.`);
    }

    let html = '<ul class="contrast-list">';
    contrasts.forEach(contrast => {
        html += `<li>${contrast}</li>`;
    });
    html += '</ul>';

    if (contrasts.length === 0) {
        html = '<p>These works share similar philosophical and thematic approaches, offering complementary perspectives on related topics.</p>';
    }

    document.getElementById('contrastingPhilosophies').innerHTML = html;
}

// Analyze cultural context
function analyzeCulturalContext(writing1, writing2) {
    const cultures = {
        'Greek': ['Plato', 'Aristotle', 'Homer', 'Sophocles', 'Herodotus'],
        'Roman': ['Virgil', 'Ovid', 'Marcus Aurelius'],
        'Chinese': ['Confucius', 'Laozi', 'Sun Tzu'],
        'Islamic': ['Prophet Muhammad'],
        'Christian': ['Augustine', 'Aquinas', 'Luther', 'Calvin', 'Teresa', 'Thomas à Kempis', 'John Bunyan', 'John Milton'],
        'Enlightenment European': ['Descartes', 'Hobbes', 'Locke', 'Voltaire', 'Rousseau', 'Kant', 'Hegel', 'Mill'],
        'Renaissance European': ['Machiavelli', 'Cervantes', 'Shakespeare', 'Dante'],
        'Modern European': ['Marx', 'Engels', 'Nietzsche', 'Beauvoir'],
        'Scottish': ['Adam Smith'],
        'American/British': ['Thomas Paine', 'Mary Wollstonecraft'],
        'Hindu': ['Vyasa'],
        'Jewish': ['Moses']
    };

    let culture1 = 'Western';
    let culture2 = 'Western';

    for (const [culture, authors] of Object.entries(cultures)) {
        if (authors.some(a => writing1.author.includes(a))) culture1 = culture;
        if (authors.some(a => writing2.author.includes(a))) culture2 = culture;
    }

    let html = '';

    if (culture1 === culture2) {
        html = `<p>Both works emerge from <strong>${culture1}</strong> cultural tradition, sharing common historical and intellectual contexts.</p>`;
    } else {
        html = `
            <p><strong>${writing1.title}</strong> comes from the <strong>${culture1}</strong> tradition, while <strong>${writing2.title}</strong> originates from <strong>${culture2}</strong> culture.</p>
            <p class="cultural-insight">This cross-cultural comparison reveals how different civilizations approached similar fundamental questions about human existence, society, and meaning.</p>
        `;
    }

    // Add influence note if there's a significant time gap
    const year1 = parseYear(writing1.year);
    const year2 = parseYear(writing2.year);
    const difference = Math.abs(year1 - year2);

    if (difference > 500 && year1 < year2) {
        html += `<p class="influence-note">💡 <strong>${writing1.title}</strong> may have influenced the intellectual climate that produced <strong>${writing2.title}</strong>.</p>`;
    } else if (difference > 500 && year2 < year1) {
        html += `<p class="influence-note">💡 <strong>${writing2.title}</strong> may have influenced the intellectual climate that produced <strong>${writing1.title}</strong>.</p>`;
    }

    document.getElementById('culturalContext').innerHTML = html;
}

// Clear comparison
function clearComparison() {
    document.getElementById('comparisonResults').style.display = 'none';
    document.getElementById('writing1Select').value = '';
    document.getElementById('writing2Select').value = '';
    document.getElementById('writing1Preview').innerHTML = '';
    document.getElementById('writing2Preview').innerHTML = '';
    selectedWriting1 = null;
    selectedWriting2 = null;
    updateCompareButton();
}

// Show/hide no collection message
function showNoCollection() {
    document.querySelector('.compare-selection').style.display = 'none';
    document.querySelector('.compare-button-container').style.display = 'none';
    document.getElementById('noCompareCollection').style.display = 'block';
}

function hideNoCollection() {
    document.querySelector('.compare-selection').style.display = 'grid';
    document.querySelector('.compare-button-container').style.display = 'block';
    document.getElementById('noCompareCollection').style.display = 'none';
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCompare);
} else {
    initCompare();
}
