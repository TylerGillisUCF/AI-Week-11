// Game Configuration
const CONFIG = {
    CANVAS_WIDTH: 1200,
    CANVAS_HEIGHT: 700,
    TILE_SIZE: 32,
    PLAYER_SIZE: 24,
    PLAYER_SPEED: 3,
    GHOST_SPEED: 1.5, // Half of player speed
    GHOST_SIZE: 30,
    INTERACTION_DISTANCE: 40
};

// Game State
const gameState = {
    currentScreen: 'character',
    selectedCharacter: null,
    currentLocation: 'field',
    persistedLocation: null, // Used when caught by ghost
    player: {
        x: CONFIG.CANVAS_WIDTH / 2,
        y: CONFIG.CANVAS_HEIGHT / 2,
        direction: 'down'
    },
    ghost: {
        active: false,
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0
    },
    inventory: [],
    pedestals: [],
    collectedWritings: [],
    locationItems: [],
    itemsCollectedThisVisit: 0,
    keys: {},
    lastInteractionTime: 0
};

// Canvas and Context
let canvas, ctx;

// Initialize game
function init() {
    // Setup canvas
    canvas = document.getElementById('gameCanvas');
    if (canvas) {
        canvas.width = CONFIG.CANVAS_WIDTH;
        canvas.height = CONFIG.CANVAS_HEIGHT;
        ctx = canvas.getContext('2d');
    }

    // Setup pedestals (50 total in a grid)
    setupPedestals();

    // Load saved game
    loadGame();

    // Setup event listeners
    setupEventListeners();

    // Start game loop if character is already selected
    if (gameState.selectedCharacter) {
        showGameScreen();
        gameLoop();
    }
}

// Setup 50 pedestals in the field
function setupPedestals() {
    const rows = 5;
    const cols = 10;
    const startX = 150;
    const startY = 150;
    const spacingX = 100;
    const spacingY = 80;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            gameState.pedestals.push({
                x: startX + col * spacingX,
                y: startY + row * spacingY,
                filled: false,
                writingId: null
            });
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    // Character selection
    document.querySelectorAll('.select-character').forEach(button => {
        button.addEventListener('click', (e) => {
            const character = e.target.closest('.character-card').dataset.character;
            selectCharacter(character);
        });
    });

    // Keyboard controls
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // Reset game button
    const resetBtn = document.getElementById('resetGame');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetGame);
    }

    // Close popup buttons
    document.querySelectorAll('.close-popup, .close-popup-btn').forEach(btn => {
        btn.addEventListener('click', closePopups);
    });
}

// Handle key down
function handleKeyDown(e) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'e', 'Escape'].includes(e.key.toLowerCase())) {
        e.preventDefault();
    }

    if (e.key === 'Escape') {
        closePopups();
        return;
    }

    gameState.keys[e.key.toLowerCase()] = true;

    if (e.key.toLowerCase() === 'e') {
        handleInteraction();
    }
}

// Handle key up
function handleKeyUp(e) {
    gameState.keys[e.key.toLowerCase()] = false;
}

// Select character
function selectCharacter(character) {
    gameState.selectedCharacter = character;
    saveGame();
    showGameScreen();
    gameLoop();
}

// Show game screen
function showGameScreen() {
    document.getElementById('characterSelection').classList.remove('active');
    document.getElementById('gameScreen').classList.add('active');
}

// Update player position
function updatePlayer() {
    const oldX = gameState.player.x;
    const oldY = gameState.player.y;

    // Movement
    if (gameState.keys['arrowup'] || gameState.keys['w']) {
        gameState.player.y -= CONFIG.PLAYER_SPEED;
        gameState.player.direction = 'up';
    }
    if (gameState.keys['arrowdown'] || gameState.keys['s']) {
        gameState.player.y += CONFIG.PLAYER_SPEED;
        gameState.player.direction = 'down';
    }
    if (gameState.keys['arrowleft'] || gameState.keys['a']) {
        gameState.player.x -= CONFIG.PLAYER_SPEED;
        gameState.player.direction = 'left';
    }
    if (gameState.keys['arrowright'] || gameState.keys['d']) {
        gameState.player.x += CONFIG.PLAYER_SPEED;
        gameState.player.direction = 'right';
    }

    // Boundary checking
    gameState.player.x = Math.max(CONFIG.PLAYER_SIZE, Math.min(CONFIG.CANVAS_WIDTH - CONFIG.PLAYER_SIZE, gameState.player.x));
    gameState.player.y = Math.max(CONFIG.PLAYER_SIZE, Math.min(CONFIG.CANVAS_HEIGHT - CONFIG.PLAYER_SIZE, gameState.player.y));

    // Check collisions
    if (checkCollisions()) {
        gameState.player.x = oldX;
        gameState.player.y = oldY;
    }
}

// Check collisions
function checkCollisions() {
    // Add collision logic here if needed
    return false;
}

// Handle interaction (E key)
function handleInteraction() {
    const now = Date.now();
    if (now - gameState.lastInteractionTime < 500) return;
    gameState.lastInteractionTime = now;

    if (gameState.currentLocation === 'field') {
        // Check cave entrance
        if (isNearCaveEntrance()) {
            enterCave();
            return;
        }

        // Check pedestals
        if (gameState.inventory.length > 0) {
            const nearbyPedestal = findNearbyPedestal();
            if (nearbyPedestal && !nearbyPedestal.filled) {
                placeOnPedestal(nearbyPedestal);
                return;
            }
        }
    } else {
        // Check cave exit
        if (isNearCaveExit()) {
            exitCave();
            return;
        }

        // Check items
        const nearbyItem = findNearbyItem();
        if (nearbyItem && !nearbyItem.collected) {
            pickupItem(nearbyItem);
            return;
        }
    }
}

// Check if near cave entrance
function isNearCaveEntrance() {
    const caveX = CONFIG.CANVAS_WIDTH / 2;
    const caveY = 100;
    const distance = Math.hypot(gameState.player.x - caveX, gameState.player.y - caveY);
    return distance < CONFIG.INTERACTION_DISTANCE;
}

// Check if near cave exit
function isNearCaveExit() {
    const exitX = CONFIG.CANVAS_WIDTH / 2;
    const exitY = CONFIG.CANVAS_HEIGHT - 80;
    const distance = Math.hypot(gameState.player.x - exitX, gameState.player.y - exitY);
    return distance < CONFIG.INTERACTION_DISTANCE;
}

// Find nearby pedestal
function findNearbyPedestal() {
    for (let pedestal of gameState.pedestals) {
        const distance = Math.hypot(gameState.player.x - pedestal.x, gameState.player.y - pedestal.y);
        if (distance < CONFIG.INTERACTION_DISTANCE) {
            return pedestal;
        }
    }
    return null;
}

// Find nearby item
function findNearbyItem() {
    for (let item of gameState.locationItems) {
        const distance = Math.hypot(gameState.player.x - item.x, gameState.player.y - item.y);
        if (distance < CONFIG.INTERACTION_DISTANCE && !item.collected) {
            return item;
        }
    }
    return null;
}

// Enter cave
function enterCave() {
    // Use persisted location if available, otherwise randomly select
    let selectedLocation;
    if (gameState.persistedLocation) {
        selectedLocation = gameState.persistedLocation;
    } else {
        const locations = ['temple', 'ballroom', 'church'];
        selectedLocation = locations[Math.floor(Math.random() * locations.length)];
    }

    gameState.currentLocation = selectedLocation;
    gameState.player.x = CONFIG.CANVAS_WIDTH / 2;
    gameState.player.y = CONFIG.CANVAS_HEIGHT - 100;
    gameState.itemsCollectedThisVisit = 0;

    // Generate items for this location
    generateLocationItems(selectedLocation);

    // Spawn ghost at opposite end of the room
    spawnGhost();

    updateLocationIndicator();
}

// Exit cave
function exitCave() {
    // Deactivate ghost
    gameState.ghost.active = false;

    // Clear persisted location if player collected all items successfully
    if (gameState.itemsCollectedThisVisit >= 5) {
        gameState.persistedLocation = null;
    }

    gameState.currentLocation = 'field';
    gameState.player.x = CONFIG.CANVAS_WIDTH / 2;
    gameState.player.y = 150;
    gameState.locationItems = [];
    gameState.itemsCollectedThisVisit = 0;
    updateLocationIndicator();
}

// Generate items for location
function generateLocationItems(location) {
    // Get available writings for this location that haven't been collected
    const availableWritings = HISTORICAL_WRITINGS.filter(w =>
        w.location === location && !gameState.collectedWritings.includes(w.id)
    );

    if (availableWritings.length === 0) {
        gameState.locationItems = [];
        return;
    }

    // Shuffle and take up to 5
    const shuffled = availableWritings.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(5, availableWritings.length));

    // Item positions based on location type
    const positions = getItemPositions(location);

    gameState.locationItems = selected.map((writing, index) => ({
        writingId: writing.id,
        x: positions[index].x,
        y: positions[index].y,
        type: positions[index].type,
        collected: false
    }));
}

// Get item positions based on location
function getItemPositions(location) {
    // Different layouts for each location
    const positions = {
        temple: [
            { x: 200, y: 200, type: 'chest' },
            { x: 600, y: 250, type: 'table' },
            { x: 1000, y: 200, type: 'frame' },
            { x: 300, y: 450, type: 'chest' },
            { x: 900, y: 450, type: 'chair' }
        ],
        ballroom: [
            { x: 250, y: 180, type: 'chest' },
            { x: 600, y: 300, type: 'table' },
            { x: 950, y: 180, type: 'frame' },
            { x: 350, y: 500, type: 'chest' },
            { x: 850, y: 500, type: 'chair' }
        ],
        church: [
            { x: 220, y: 220, type: 'chest' },
            { x: 600, y: 200, type: 'table' },
            { x: 980, y: 220, type: 'frame' },
            { x: 300, y: 480, type: 'chest' },
            { x: 900, y: 480, type: 'chair' }
        ]
    };

    return positions[location] || positions.temple;
}

// Pickup item
function pickupItem(item) {
    if (gameState.inventory.length >= 5) {
        alert('Inventory full! Return to the field and place items on pedestals.');
        return;
    }

    item.collected = true;
    gameState.inventory.push(item.writingId);
    gameState.itemsCollectedThisVisit++;
    updateInventoryCount();
    saveGame();
}

// Place on pedestal
function placeOnPedestal(pedestal) {
    if (gameState.inventory.length === 0) return;

    const writingId = gameState.inventory.shift();
    pedestal.filled = true;
    pedestal.writingId = writingId;

    gameState.collectedWritings.push(writingId);

    updateInventoryCount();
    updatePedestalsCount();
    saveGame();

    // Show summary popup
    const writing = getWritingById(writingId);
    if (writing) {
        showSummaryPopup(writing);
    }
}

// Show summary popup
function showSummaryPopup(writing) {
    document.getElementById('popupTitle').textContent = writing.title;
    document.getElementById('popupAuthor').textContent = writing.author;
    document.getElementById('popupYear').textContent = writing.year;
    document.getElementById('popupSummary').textContent = writing.summary;
    document.getElementById('summaryPopup').classList.add('active');
}

// Close popups
function closePopups() {
    document.querySelectorAll('.popup').forEach(popup => {
        popup.classList.remove('active');
    });
}

// Update UI
function updateInventoryCount() {
    const element = document.getElementById('inventoryCount');
    if (element) {
        element.textContent = `${gameState.inventory.length} / 5`;
    }
}

function updatePedestalsCount() {
    const element = document.getElementById('pedestalsCount');
    if (element) {
        element.textContent = `${gameState.collectedWritings.length} / 50`;
    }
}

function updateLocationIndicator() {
    const element = document.getElementById('currentLocation');
    if (element) {
        const locationNames = {
            field: 'Open Field',
            temple: 'Ancient Greek Temple',
            ballroom: 'Masquerade Ballroom',
            church: 'Old Church'
        };
        element.textContent = locationNames[gameState.currentLocation] || 'Unknown';
    }
}

// Render functions
function render() {
    // Clear canvas
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);

    if (gameState.currentLocation === 'field') {
        renderField();
    } else {
        renderLocation(gameState.currentLocation);
    }

    renderGhost();
    renderPlayer();
}

// Render field
function renderField() {
    // Background
    ctx.fillStyle = '#4a7c4e';
    ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);

    // Add simple grass pattern
    ctx.fillStyle = '#3d6b41';
    for (let i = 0; i < 50; i++) {
        const x = (i * 137) % CONFIG.CANVAS_WIDTH;
        const y = (i * 197) % CONFIG.CANVAS_HEIGHT;
        ctx.fillRect(x, y, 20, 20);
    }

    // Cave entrance
    drawCaveEntrance(CONFIG.CANVAS_WIDTH / 2, 100);

    // Pedestals
    gameState.pedestals.forEach(pedestal => {
        drawPedestal(pedestal);
    });

    // Draw interaction hint
    if (isNearCaveEntrance()) {
        drawInteractionHint(CONFIG.CANVAS_WIDTH / 2, 70, 'Press E to enter cave');
    } else if (gameState.inventory.length > 0) {
        const nearbyPedestal = findNearbyPedestal();
        if (nearbyPedestal && !nearbyPedestal.filled) {
            drawInteractionHint(nearbyPedestal.x, nearbyPedestal.y - 30, 'Press E to place');
        }
    }
}

// Render location
function renderLocation(location) {
    // Background based on location
    const backgrounds = {
        temple: '#d4c4a8',
        ballroom: '#4a3a5a',
        church: '#5a4a3a'
    };
    ctx.fillStyle = backgrounds[location] || '#3a3a3a';
    ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);

    // Draw location-specific elements
    if (location === 'temple') {
        drawTempleElements();
    } else if (location === 'ballroom') {
        drawBallroomElements();
    } else if (location === 'church') {
        drawChurchElements();
    }

    // Cave exit
    drawCaveExit(CONFIG.CANVAS_WIDTH / 2, CONFIG.CANVAS_HEIGHT - 80);

    // Items
    gameState.locationItems.forEach(item => {
        if (!item.collected) {
            drawItem(item);
        }
    });

    // Draw interaction hints
    if (isNearCaveExit()) {
        drawInteractionHint(CONFIG.CANVAS_WIDTH / 2, CONFIG.CANVAS_HEIGHT - 110, 'Press E to exit');
    } else {
        const nearbyItem = findNearbyItem();
        if (nearbyItem && !nearbyItem.collected) {
            drawInteractionHint(nearbyItem.x, nearbyItem.y - 30, 'Press E to collect');
        }
    }
}

// Draw temple elements
function drawTempleElements() {
    // Columns
    ctx.fillStyle = '#8a7a6a';
    for (let i = 0; i < 5; i++) {
        const x = 150 + i * 250;
        ctx.fillRect(x, 100, 40, 300);
        ctx.fillRect(x - 10, 100, 60, 30);
        ctx.fillRect(x - 10, 370, 60, 30);
    }

    // Floor pattern
    ctx.strokeStyle = '#6a5a4a';
    ctx.lineWidth = 2;
    for (let i = 0; i < 15; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 80, 0);
        ctx.lineTo(i * 80, CONFIG.CANVAS_HEIGHT);
        ctx.stroke();
    }
}

// Draw ballroom elements
function drawBallroomElements() {
    // Chandelier
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(CONFIG.CANVAS_WIDTH / 2, 80, 30, 0, Math.PI * 2);
    ctx.fill();

    // Floor tiles
    ctx.strokeStyle = '#3a2a4a';
    ctx.lineWidth = 2;
    for (let x = 0; x < CONFIG.CANVAS_WIDTH; x += 100) {
        for (let y = 0; y < CONFIG.CANVAS_HEIGHT; y += 100) {
            ctx.strokeRect(x, y, 100, 100);
        }
    }

    // Windows
    ctx.fillStyle = '#6a5a8a';
    ctx.fillRect(50, 150, 80, 120);
    ctx.fillRect(CONFIG.CANVAS_WIDTH - 130, 150, 80, 120);
}

// Draw church elements
function drawChurchElements() {
    // Pews
    ctx.fillStyle = '#4a3a2a';
    for (let i = 0; i < 6; i++) {
        ctx.fillRect(200, 150 + i * 70, 350, 50);
        ctx.fillRect(650, 150 + i * 70, 350, 50);
    }

    // Altar
    ctx.fillStyle = '#6a5a4a';
    ctx.fillRect(CONFIG.CANVAS_WIDTH / 2 - 100, 80, 200, 60);

    // Stained glass window
    ctx.fillStyle = '#8a4a4a';
    ctx.beginPath();
    ctx.arc(CONFIG.CANVAS_WIDTH / 2, 50, 30, 0, Math.PI * 2);
    ctx.fill();
}

// Draw cave entrance
function drawCaveEntrance(x, y) {
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(x, y, 40, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#8a7a6a';
    ctx.beginPath();
    ctx.arc(x - 45, y + 20, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 45, y + 20, 25, 0, Math.PI * 2);
    ctx.fill();

    // Label
    ctx.fillStyle = '#fff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Cave Entrance', x, y + 60);
}

// Draw cave exit
function drawCaveExit(x, y) {
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#8a7a6a';
    ctx.beginPath();
    ctx.arc(x - 40, y + 15, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 40, y + 15, 20, 0, Math.PI * 2);
    ctx.fill();

    // Label
    ctx.fillStyle = '#fff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Exit', x, y + 50);
}

// Draw pedestal
function drawPedestal(pedestal) {
    if (pedestal.filled) {
        // Filled pedestal
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(pedestal.x - 15, pedestal.y - 15, 30, 30);
        ctx.fillStyle = '#8a6a3a';
        ctx.fillRect(pedestal.x - 12, pedestal.y - 12, 24, 24);

        // Book icon
        ctx.fillStyle = '#d4a574';
        ctx.fillRect(pedestal.x - 8, pedestal.y - 8, 16, 12);
        ctx.strokeStyle = '#8a6a3a';
        ctx.strokeRect(pedestal.x - 8, pedestal.y - 8, 16, 12);
    } else {
        // Empty pedestal
        ctx.fillStyle = '#6a6a6a';
        ctx.fillRect(pedestal.x - 15, pedestal.y - 15, 30, 30);
        ctx.fillStyle = '#4a4a4a';
        ctx.fillRect(pedestal.x - 12, pedestal.y - 12, 24, 24);
    }
}

// Draw item
function drawItem(item) {
    const itemColors = {
        chest: '#8a5a3a',
        table: '#6a4a2a',
        frame: '#4a3a5a',
        chair: '#5a4a3a'
    };

    ctx.fillStyle = itemColors[item.type] || '#5a5a5a';

    if (item.type === 'chest') {
        ctx.fillRect(item.x - 20, item.y - 15, 40, 30);
        ctx.strokeStyle = '#4a3a2a';
        ctx.strokeRect(item.x - 20, item.y - 15, 40, 30);
    } else if (item.type === 'table') {
        ctx.fillRect(item.x - 25, item.y - 10, 50, 20);
        ctx.fillRect(item.x - 25, item.y + 10, 5, 20);
        ctx.fillRect(item.x + 20, item.y + 10, 5, 20);
    } else if (item.type === 'frame') {
        ctx.fillRect(item.x - 20, item.y - 25, 40, 50);
        ctx.fillStyle = '#8a7a6a';
        ctx.fillRect(item.x - 15, item.y - 20, 30, 40);
    } else if (item.type === 'chair') {
        ctx.fillRect(item.x - 15, item.y - 10, 30, 20);
        ctx.fillRect(item.x - 15, item.y - 30, 5, 20);
        ctx.fillRect(item.x - 15, item.y + 10, 5, 15);
        ctx.fillRect(item.x + 10, item.y + 10, 5, 15);
    }

    // Book on item
    ctx.fillStyle = '#d4a574';
    ctx.fillRect(item.x - 6, item.y - 8, 12, 10);
    ctx.strokeStyle = '#8a6a3a';
    ctx.strokeRect(item.x - 6, item.y - 8, 12, 10);
}

// Draw interaction hint
function drawInteractionHint(x, y, text) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(x - 60, y - 15, 120, 25);
    ctx.fillStyle = '#fff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y + 3);
}

// Draw player
function renderPlayer() {
    const characterColors = {
        knight: '#4a7c9e',
        plagueDoctor: '#3a3a3a',
        jester: '#9e4a7c'
    };

    const color = characterColors[gameState.selectedCharacter] || '#5a5a5a';

    // Body
    ctx.fillStyle = color;
    ctx.fillRect(
        gameState.player.x - CONFIG.PLAYER_SIZE / 2,
        gameState.player.y - CONFIG.PLAYER_SIZE / 2,
        CONFIG.PLAYER_SIZE,
        CONFIG.PLAYER_SIZE
    );

    // Head
    ctx.fillStyle = '#f4c4a4';
    ctx.beginPath();
    ctx.arc(gameState.player.x, gameState.player.y - CONFIG.PLAYER_SIZE / 2 - 8, 8, 0, Math.PI * 2);
    ctx.fill();

    // Character-specific details
    if (gameState.selectedCharacter === 'knight') {
        // Helmet
        ctx.fillStyle = '#6a6a6a';
        ctx.fillRect(gameState.player.x - 6, gameState.player.y - CONFIG.PLAYER_SIZE / 2 - 12, 12, 8);
    } else if (gameState.selectedCharacter === 'plagueDoctor') {
        // Mask beak
        ctx.fillStyle = '#2a2a2a';
        ctx.beginPath();
        ctx.moveTo(gameState.player.x, gameState.player.y - CONFIG.PLAYER_SIZE / 2 - 8);
        ctx.lineTo(gameState.player.x + 8, gameState.player.y - CONFIG.PLAYER_SIZE / 2 - 6);
        ctx.lineTo(gameState.player.x, gameState.player.y - CONFIG.PLAYER_SIZE / 2 - 4);
        ctx.fill();
    } else if (gameState.selectedCharacter === 'jester') {
        // Hat
        ctx.fillStyle = '#9e4a7c';
        ctx.beginPath();
        ctx.moveTo(gameState.player.x - 8, gameState.player.y - CONFIG.PLAYER_SIZE / 2 - 10);
        ctx.lineTo(gameState.player.x, gameState.player.y - CONFIG.PLAYER_SIZE / 2 - 20);
        ctx.lineTo(gameState.player.x + 8, gameState.player.y - CONFIG.PLAYER_SIZE / 2 - 10);
        ctx.fill();
    }
}

// Spawn ghost at opposite end of room
function spawnGhost() {
    gameState.ghost.active = true;
    // Spawn ghost at opposite end from player (top of room)
    gameState.ghost.x = CONFIG.CANVAS_WIDTH / 2;
    gameState.ghost.y = 100;
}

// Update ghost position
function updateGhost() {
    if (!gameState.ghost.active || gameState.currentLocation === 'field') {
        return;
    }

    // Calculate direction toward player
    const dx = gameState.player.x - gameState.ghost.x;
    const dy = gameState.player.y - gameState.ghost.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Normalize and apply speed
    if (distance > 5) {
        const moveX = (dx / distance) * CONFIG.GHOST_SPEED;
        const moveY = (dy / distance) * CONFIG.GHOST_SPEED;

        gameState.ghost.x += moveX;
        gameState.ghost.y += moveY;
    }
}

// Check collision between player and ghost
function checkGhostCollision() {
    if (!gameState.ghost.active || gameState.currentLocation === 'field') {
        return;
    }

    const dx = gameState.player.x - gameState.ghost.x;
    const dy = gameState.player.y - gameState.ghost.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const collisionDistance = (CONFIG.PLAYER_SIZE + CONFIG.GHOST_SIZE) / 2;

    if (distance < collisionDistance) {
        handleGhostCaught();
    }
}

// Handle player being caught by ghost
function handleGhostCaught() {
    // Set persisted location so player returns to same location
    gameState.persistedLocation = gameState.currentLocation;

    // Return items to location (remove from inventory)
    gameState.inventory = [];
    gameState.itemsCollectedThisVisit = 0;

    // Deactivate ghost
    gameState.ghost.active = false;

    // Return player to field
    gameState.currentLocation = 'field';
    gameState.player.x = CONFIG.CANVAS_WIDTH / 2;
    gameState.player.y = 150;
    gameState.locationItems = [];

    updateInventoryCount();
    updateLocationIndicator();

    // Show message
    alert('The ghost caught you! You\'ve been sent back to the field. Return to the same location to try again!');
}

// Render ghost
function renderGhost() {
    if (!gameState.ghost.active || gameState.currentLocation === 'field') {
        return;
    }

    // Ghost body (semi-transparent white/gray)
    ctx.fillStyle = 'rgba(200, 200, 220, 0.7)';
    ctx.beginPath();
    ctx.arc(gameState.ghost.x, gameState.ghost.y, CONFIG.GHOST_SIZE / 2, 0, Math.PI * 2);
    ctx.fill();

    // Ghost tail effect
    ctx.fillStyle = 'rgba(180, 180, 200, 0.5)';
    ctx.beginPath();
    ctx.ellipse(gameState.ghost.x, gameState.ghost.y + 10, CONFIG.GHOST_SIZE / 2 - 5, CONFIG.GHOST_SIZE / 2 + 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(gameState.ghost.x - 8, gameState.ghost.y - 3, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(gameState.ghost.x + 8, gameState.ghost.y - 3, 3, 0, Math.PI * 2);
    ctx.fill();

    // Spooky aura
    ctx.strokeStyle = 'rgba(150, 150, 200, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(gameState.ghost.x, gameState.ghost.y, CONFIG.GHOST_SIZE / 2 + 5, 0, Math.PI * 2);
    ctx.stroke();
}

// Game loop
function gameLoop() {
    updatePlayer();
    updateGhost();
    checkGhostCollision();
    render();
    requestAnimationFrame(gameLoop);
}

// Save game
function saveGame() {
    const saveData = {
        selectedCharacter: gameState.selectedCharacter,
        collectedWritings: gameState.collectedWritings,
        pedestals: gameState.pedestals.map(p => ({
            filled: p.filled,
            writingId: p.writingId
        }))
    };
    localStorage.setItem('historicalWritingsGame', JSON.stringify(saveData));
}

// Load game
function loadGame() {
    const saveData = localStorage.getItem('historicalWritingsGame');
    if (saveData) {
        try {
            const data = JSON.parse(saveData);
            gameState.selectedCharacter = data.selectedCharacter;
            gameState.collectedWritings = data.collectedWritings || [];

            // Restore pedestal states
            if (data.pedestals) {
                data.pedestals.forEach((savedPedestal, index) => {
                    if (gameState.pedestals[index]) {
                        gameState.pedestals[index].filled = savedPedestal.filled;
                        gameState.pedestals[index].writingId = savedPedestal.writingId;
                    }
                });
            }

            updateInventoryCount();
            updatePedestalsCount();
            updateLocationIndicator();
        } catch (error) {
            console.error('Error loading save:', error);
        }
    }
}

// Reset game
function resetGame() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        localStorage.removeItem('historicalWritingsGame');
        location.reload();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
