# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the **Historical Writings Adventure** project - an educational website featuring an interactive pixel-art style game where players collect and learn about 50 influential historical writings throughout human history.

## Project Structure

```
AI-Week-11/
├── index.html              # Landing page with features and instructions
├── game.html               # Main game interface with canvas
├── collection.html         # Collection viewer and progress tracker
├── styles.css              # All styling with pixel-art aesthetic
├── game.js                 # Game logic, rendering, and mechanics
├── collection.js           # Collection page functionality
├── historical-data.js      # Database of 50 historical writings
├── README.md               # Comprehensive documentation
└── CLAUDE.md              # This file
```

## Development Commands

### Setup
No build process or dependencies required. This is a pure HTML/CSS/JavaScript project.

### Running the Project
1. Open `index.html` in any modern web browser
2. Or use a local server:
   ```bash
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

### Testing
- Manual testing in browser
- Test in Chrome, Firefox, Safari, and Edge
- Check LocalStorage functionality
- Verify Canvas rendering
- Test keyboard controls (WASD, Arrow keys, E, ESC)

### Building
No build step required - static files can be deployed directly to any web host.

## Architecture

### Frontend Architecture
- **Pure Vanilla JavaScript**: No frameworks or libraries
- **HTML5 Canvas**: For game rendering with pixel-art style
- **LocalStorage API**: For save/load functionality
- **CSS3**: For responsive design and styling

### Game Architecture
```
Game Loop (requestAnimationFrame)
├── Update Player Position
├── Check Collisions
├── Handle Interactions
└── Render Current Scene
    ├── Field Scene (50 pedestals + cave entrance)
    └── Location Scenes (Temple, Ballroom, Church)
        └── 5 Interactive Items per location
```

### Data Flow
1. Player selects character → Save to localStorage
2. Player enters cave → Random location selected
3. Items generated based on uncollected writings
4. Player collects items → Added to inventory
5. Player places on pedestal → Show summary, save progress
6. Collection page reads from localStorage

## Key Conventions

### Code Style
- Use camelCase for variables and functions
- Use UPPER_CASE for constants
- Prefix game state with `gameState.`
- Keep rendering functions separate from logic

### File Organization
- `historical-data.js`: Pure data, no logic
- `game.js`: Game mechanics and canvas rendering
- `collection.js`: Collection page specific logic
- `styles.css`: All styling in one file

### Game Constants
Located in `CONFIG` object in `game.js`:
- Canvas dimensions: 1200x700
- Player speed, size, interaction distance
- All configurable for easy tweaking

### Historical Data Structure
Each writing has:
- id, title, author, year
- location (temple/ballroom/church)
- summary, description
- keyConcepts (array)
- significance

## Notes for Claude Code

### When Working on This Project
- **Game Logic**: Located in `game.js` - handles all canvas rendering and game mechanics
- **Historical Content**: Modify `historical-data.js` to add/edit writings
- **Styling**: All CSS in `styles.css` with pixel-art aesthetic
- **Save System**: Uses localStorage with key `historicalWritingsGame`

### Common Tasks
- **Add More Writings**: Edit `HISTORICAL_WRITINGS` array in `historical-data.js`
- **Adjust Gameplay**: Modify `CONFIG` object in `game.js`
- **Change Visuals**: Update render functions in `game.js` or styles in `styles.css`
- **Fix Bugs**: Check browser console for errors

### Known Features
- 50 historical writings distributed across 3 locations
- Character selection (Knight, Plague Doctor, Jester)
- Inventory system (5 items max)
- 50 pedestals in open field
- Automatic save/load with localStorage
- Responsive design for various screen sizes

### Testing Checklist
- [ ] Character selection works
- [ ] Cave entrance/exit functional
- [ ] Items collectible in all 3 locations
- [ ] Inventory doesn't exceed 5 items
- [ ] Pedestals accept items correctly
- [ ] Summaries display properly
- [ ] Collection page shows progress
- [ ] Save/load persists across sessions
- [ ] Reset button clears everything
- [ ] Responsive on mobile screens

### Future Enhancement Ideas
- Sound effects and music
- Character-specific abilities
- Achievement system
- Quiz mode
- Better mobile controls
- Multiplayer features
