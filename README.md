# Historical Writings Adventure

An interactive educational website featuring a pixel-art style game where players explore historical locations to collect and learn about 50 influential writings from throughout human history.

## Overview

Historical Writings Adventure combines gaming with education, allowing players to discover important historical texts in an engaging, interactive environment. Players choose a character, explore three different historical locations, collect writings, and learn about each text's significance and impact on history.

## Features

### 🎮 Interactive Game
- **Character Selection**: Choose between a Knight, Plague Doctor, or Jester
- **Pixel-Art Graphics**: Retro-style visuals rendered on HTML5 Canvas
- **Keyboard Controls**: WASD or Arrow Keys for movement, E for interactions
- **Multiple Locations**: Explore an Ancient Greek Temple, Masquerade Ballroom, and Old Church

### 📚 Educational Content
- **50 Historical Writings**: Carefully curated influential texts from various time periods and cultures
- **Detailed Information**: Each writing includes:
  - Author and publication year
  - Brief summary
  - In-depth description
  - Key concepts
  - Historical significance
- **Diverse Collection**: Works from philosophy, literature, politics, religion, and more

### 🏛️ Game Mechanics
- **Open Field**: Central hub with 50 pedestals to display collected writings
- **Cave System**: Enter the cave to be randomly transported to one of three locations
- **Item Collection**: Find 5 writings per location visit in chests, tables, frames, and chairs
- **Inventory System**: Carry up to 5 writings at a time
- **Pedestal Placement**: Return to the field and place writings to learn about them
- **Progress Tracking**: Automatic save system tracks your collection progress

### 📖 Collection Page
- View all 50 writings (collected and undiscovered)
- Filter by location (Temple, Ballroom, Church)
- Detailed view for each collected writing
- Track your progress with statistics

## Project Structure

```
AI-Week-11/
├── index.html              # Landing page
├── game.html               # Main game interface
├── collection.html         # Collection viewer
├── styles.css              # All styling (pixel-art aesthetic)
├── game.js                 # Game logic and mechanics
├── collection.js           # Collection page functionality
├── historical-data.js      # Database of 50 historical writings
├── README.md               # This file
└── CLAUDE.md              # AI assistant guidance
```

## How to Play

### Getting Started
1. Open `index.html` in a web browser
2. Click "Start Adventure" to begin
3. Select your character (Knight, Plague Doctor, or Jester)

### Gameplay Loop
1. **Explore**: Start in the open field with 50 empty pedestals
2. **Enter Cave**: Walk to the cave entrance (top center) and press E
3. **Collect Items**: You'll be transported to a random location with 5 historical writings
4. **Find Writings**: Look for books in chests, on tables, picture frames, and chairs
5. **Pickup**: Approach items and press E to collect (max 5 per trip)
6. **Return**: Exit through the cave door to return to the field
7. **Place on Pedestals**: Approach empty pedestals and press E to place writings
8. **Learn**: Read the summary that appears for each writing
9. **Repeat**: Return to the cave to collect more writings until all 50 are found

### Controls
- **Movement**: Arrow Keys or WASD
- **Interact**: E key
- **Close Popups**: ESC key or click the X button

### Collection Page
- Click "Collection" from any page to view your progress
- Filter writings by location
- Click "View Details" on collected writings for in-depth information
- Track statistics: total collected and breakdown by location

## Technical Details

### Technologies Used
- **HTML5**: Structure and Canvas for game rendering
- **CSS3**: Pixel-art styling and responsive design
- **Vanilla JavaScript**: Game logic, no external dependencies
- **LocalStorage**: Automatic save/load functionality

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
Modern browsers with HTML5 Canvas and LocalStorage support required

### Performance
- Optimized Canvas rendering
- Efficient collision detection
- Smooth 60 FPS gameplay
- Responsive design for various screen sizes

## Educational Content

The 50 historical writings span:
- **Ancient Works**: Homer's Iliad/Odyssey, Plato's Republic, Aristotle's Ethics
- **Religious Texts**: The Bible, Qur'an, Bhagavad Gita, Torah
- **Philosophy**: Descartes, Kant, Nietzsche, Confucius, Laozi
- **Political Theory**: Machiavelli, Hobbes, Locke, Rousseau, Marx
- **Literature**: Shakespeare, Dante, Cervantes, Milton
- **And many more...**

Each text is categorized by location theme:
- **Greek Temple** (17): Ancient philosophy and classical works
- **Masquerade Ballroom** (17): Renaissance through Enlightenment texts
- **Old Church** (16): Religious and spiritual writings

## Features in Detail

### Character Selection
Each character is purely cosmetic but adds personality:
- **Knight**: Brave warrior seeking knowledge and honor
- **Plague Doctor**: Mysterious scholar studying ancient texts
- **Jester**: Clever entertainer with a love for wisdom

### Save System
- Automatically saves progress after each action
- Tracks collected writings
- Remembers pedestal placements
- Persists across browser sessions
- Reset button available to start over

### Visual Design
- Pixel-art aesthetic with hand-coded Canvas rendering
- Distinct visual themes for each location
- Color-coded UI elements
- Retro gaming feel with modern usability

## Development Notes

### Future Enhancements
Potential additions for future versions:
- Sound effects and background music
- Character-specific dialogue or abilities
- Achievement system
- Quiz mode to test knowledge
- More detailed animations
- Mobile touch controls
- Multiplayer features

### Customization
The modular design allows easy customization:
- Add more writings in `historical-data.js`
- Modify location layouts in `game.js`
- Adjust visual themes in `styles.css`
- Change game parameters in CONFIG object

## Credits

**Concept & Development**: Educational gaming meets historical literacy

**Historical Content**: Curated from influential works across human history, spanning Ancient Greece to the 20th century

**Design Philosophy**: Making history accessible and engaging through interactive gameplay

## License

This educational project is created for learning and non-commercial use.

## Getting Help

### Troubleshooting
- **Game won't load**: Ensure JavaScript is enabled in your browser
- **Progress not saving**: Check that LocalStorage is enabled
- **Visual issues**: Try a different browser or clear cache

### Tips
- Read the summaries carefully - they contain valuable historical context
- Try to collect all writings from each location systematically
- Use the Collection page to review what you've learned
- Take your time exploring each location

## Contact

For questions, suggestions, or issues, please refer to the repository documentation.

---

**Start your journey through history today! 📜⚔️🎭**
