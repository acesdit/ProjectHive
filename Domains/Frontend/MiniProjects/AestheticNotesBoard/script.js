// Elements
const board = document.getElementById('board');
const emptyState = document.getElementById('emptyState');
const colorBtns = document.querySelectorAll('.color-btn');
const sparklesContainer = document.getElementById('sparkles');
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

// State
let notes = {};
let draggedNote = null;
let offset = { x: 0, y: 0 };
let noteIdCounter = 0;

// Custom cursor
let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

function animateCursorRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    
    requestAnimationFrame(animateCursorRing);
}
animateCursorRing();

// Hover effects for cursor
document.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('color-btn') || 
        e.target.classList.contains('delete-btn') ||
        e.target.classList.contains('sticky-note')) {
        document.body.classList.add('cursor-hover');
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('color-btn') || 
        e.target.classList.contains('delete-btn') ||
        e.target.classList.contains('sticky-note')) {
        document.body.classList.remove('cursor-hover');
    }
});

// Create floating sparkles
function createSparkles() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 3 + 's';
            sparklesContainer.appendChild(sparkle);
        }, i * 200);
    }
}
createSparkles();

// Load notes from memory (using in-memory storage)
function loadNotes() {
    // Notes are already in memory as the 'notes' object
    // In a real app, you could load from localStorage here
    renderNotes();
}

// Save note to memory
function saveNote(id, data) {
    notes[id] = data;
}

// Delete note from memory
function deleteNote(id) {
    delete notes[id];
    renderNotes();
}

// Create new note
function createNote(color) {
    const id = `note_${noteIdCounter++}`;
    const boardRect = board.getBoundingClientRect();
    
    // Random position within board bounds
    const maxX = boardRect.width - 260;
    const maxY = boardRect.height - 260;
    
    const note = {
        id: id,
        color: color,
        text: '',
        x: Math.max(20, Math.random() * maxX),
        y: Math.max(20, Math.random() * maxY),
        timestamp: formatTimestamp(new Date())
    };
    
    saveNote(id, note);
    renderNotes();
}

// Format timestamp
function formatTimestamp(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    return `${hours}:${minutes} • ${month} ${day}`;
}

// Render all notes
function renderNotes() {
    const existingNotes = board.querySelectorAll('.sticky-note');
    existingNotes.forEach(note => note.remove());
    
    const hasNotes = Object.keys(notes).length > 0;
    emptyState.style.display = hasNotes ? 'none' : 'block';
    
    Object.values(notes).forEach(note => {
        const noteEl = createNoteElement(note);
        board.appendChild(noteEl);
    });
}

// Create note element
function createNoteElement(note) {
    const noteEl = document.createElement('div');
    noteEl.className = `sticky-note ${note.color}`;
    noteEl.style.left = note.x + 'px';
    noteEl.style.top = note.y + 'px';
    noteEl.dataset.id = note.id;
    
    noteEl.innerHTML = `
        <div class="note-header">
            <span class="note-time">${note.timestamp}</span>
            <button class="delete-btn" title="Delete note">×</button>
        </div>
        <textarea class="note-textarea" placeholder="Write your thoughts...">${note.text}</textarea>
    `;
    
    // Delete button
    const deleteBtn = noteEl.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        noteEl.style.animation = 'noteAppear 0.3s reverse';
        setTimeout(() => deleteNote(note.id), 300);
    });
    
    // Textarea auto-save
    const textarea = noteEl.querySelector('.note-textarea');
    textarea.addEventListener('input', (e) => {
        notes[note.id].text = e.target.value;
        saveNote(note.id, notes[note.id]);
    });
    
    // Prevent drag when typing
    textarea.addEventListener('mousedown', (e) => {
        e.stopPropagation();
    });
    
    // Drag functionality
    noteEl.addEventListener('mousedown', startDrag);
    noteEl.addEventListener('touchstart', startDrag);
    
    return noteEl;
}

// Drag functions
function startDrag(e) {
    if (e.target.classList.contains('note-textarea') || 
        e.target.classList.contains('delete-btn')) {
        return;
    }
    
    draggedNote = e.currentTarget;
    draggedNote.classList.add('dragging');
    draggedNote.style.zIndex = '1000';
    
    const rect = draggedNote.getBoundingClientRect();
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    
    offset.x = clientX - rect.left;
    offset.y = clientY - rect.top;
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('touchend', stopDrag);
}

function drag(e) {
    if (!draggedNote) return;
    
    e.preventDefault();
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    
    const boardRect = board.getBoundingClientRect();
    let x = clientX - boardRect.left - offset.x;
    let y = clientY - boardRect.top - offset.y;
    
    // Keep note within bounds
    x = Math.max(0, Math.min(x, boardRect.width - draggedNote.offsetWidth));
    y = Math.max(0, Math.min(y, boardRect.height - draggedNote.offsetHeight));
    
    draggedNote.style.left = x + 'px';
    draggedNote.style.top = y + 'px';
}

function stopDrag() {
    if (draggedNote) {
        draggedNote.classList.remove('dragging');
        draggedNote.style.zIndex = '1';
        
        const id = draggedNote.dataset.id;
        notes[id].x = parseInt(draggedNote.style.left);
        notes[id].y = parseInt(draggedNote.style.top);
        saveNote(id, notes[id]);
        
        draggedNote = null;
    }
    
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('touchend', stopDrag);
}

// Color button click handlers
colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const color = btn.dataset.color;
        createNote(color);
        
        // Add ripple effect
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 200);
    });
});

// Initialize app
loadNotes();

// Add some starter notes for demo (optional - remove in production)
if (Object.keys(notes).length === 0) {
    setTimeout(() => createNote('lavender'), 300);
    setTimeout(() => {
        const welcomeNote = notes[`note_${noteIdCounter - 1}`];
        welcomeNote.text = 'Welcome to your aesthetic notes! ✨';
        welcomeNote.x = 100;
        welcomeNote.y = 100;
        renderNotes();
    }, 400);
}