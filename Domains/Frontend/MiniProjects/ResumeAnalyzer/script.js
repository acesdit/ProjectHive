// DOM Elements
const uploadSection = document.getElementById('uploadSection');
const analyzingSection = document.getElementById('analyzingSection');
const analysisSection = document.getElementById('analysisSection');
const fileInput = document.getElementById('fileInput');

// Sample analysis data
const analysisData = {
    content: {
        score: 82,
        feedback: "Strong action verbs and quantifiable achievements. Consider adding more specific metrics."
    },
    format: {
        score: 75,
        feedback: "Good structure and readability. Could improve spacing and use consistent formatting."
    },
    experience: {
        score: 88,
        feedback: "Excellent work history with clear progression. Well-detailed responsibilities and achievements."
    },
    education: {
        score: 90,
        feedback: "Education section is comprehensive and well-organized. Relevant certifications included."
    },
    skills: {
        score: 78,
        feedback: "Good mix of technical and soft skills. Consider categorizing skills for better readability."
    },
    keywords: {
        score: 70,
        feedback: "Resume is moderately ATS-friendly. Add more industry-specific keywords for better optimization."
    }
};

// Drag and drop event handlers
uploadSection.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadSection.classList.add('dragover');
});

uploadSection.addEventListener('dragleave', () => {
    uploadSection.classList.remove('dragover');
});

uploadSection.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadSection.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
});

uploadSection.addEventListener('click', (e) => {
    if (e.target !== fileInput) {
        fileInput.click();
    }
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
});

// Handle file upload
function handleFile(file) {
    document.getElementById('fileName').textContent = file.name;
    document.getElementById('fileSize').textContent = formatFileSize(file.size);
    
    uploadSection.style.display = 'none';
    analyzingSection.style.display = 'block';

    // Simulate analysis time
    setTimeout(() => {
        analyzeResume();
    }, 2000);
}

// Analyze resume and show results
function analyzeResume() {
    analyzingSection.style.display = 'none';
    analysisSection.style.display = 'block';

    // Calculate overall score
    const overall = Math.round((
        analysisData.content.score +
        analysisData.format.score +
        analysisData.experience.score +
        analysisData.education.score +
        analysisData.skills.score +
        analysisData.keywords.score
    ) / 6);

    // Animate overall score
    animateScore('overallScore', overall);

    // Animate each rating with delay
    setTimeout(() => animateRating('content', analysisData.content), 200);
    setTimeout(() => animateRating('format', analysisData.format), 400);
    setTimeout(() => animateRating('experience', analysisData.experience), 600);
    setTimeout(() => animateRating('education', analysisData.education), 800);
    setTimeout(() => animateRating('skills', analysisData.skills), 1000);
    setTimeout(() => animateRating('keywords', analysisData.keywords), 1200);
}

// Animate score counter
function animateScore(elementId, target) {
    const element = document.getElementById(elementId);
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, 20);
}

// Animate rating bar and display feedback
function animateRating(name, data) {
    document.getElementById(`${name}Score`).textContent = data.score;
    document.getElementById(`${name}Bar`).style.width = data.score + '%';
    document.getElementById(`${name}Feedback`).textContent = data.feedback;
}

// Reset analyzer to initial state
function resetAnalyzer() {
    analysisSection.style.display = 'none';
    uploadSection.style.display = 'block';
    fileInput.value = '';
    
    // Reset all bars to 0
    document.querySelectorAll('.rating-bar-fill').forEach(bar => {
        bar.style.width = '0';
    });
}

// Format file size for display
function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
}