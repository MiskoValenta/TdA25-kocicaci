// Mock gender and grade data from MongoDB
const user = {
    gender: 'Male',  // Example: 'Male' or 'Female'
    grade: '1st'  // Example: '1st', '2nd', '3rd', '4th'
};

const criteria = {
    Male: {
        '100m': { '1st': [14.9, 15.9, 17.6, 19], '2nd': [14.3, 15.7, 16.6, 18], '3rd': [14.3, 15.7, 16.6, 18], '4th': [14.3, 15.7, 16.6, 18] },
        '1500m': { '1st': [420, 450, 480, 510], '2nd': [390, 420, 450, 480], '3rd': [390, 420, 450, 480], '4th': [390, 420, 450, 480] },
        'Granát': { '1st': [35, 31, 27, 23], '2nd': [38, 34, 30, 26], '3rd': ['/', '/', '/', '/'], '4th': ['/', '/', '/', '/'] },
        'Koule': { '3rd': [8.5, 7.5, 6.5, 5.5], '4th': [8.5, 7.5, 6.5, 5.5] }
    },
    Female: {
        '100m': { '1st': [17.4, 18.2, 19, 19.8], '2nd': [16.8, 18, 19, 19.6], '3rd': [16.8, 18, 19, 19.8], '4th': [17.4, 18.2, 19, 19.8] },
        '800m': { '1st': [260, 290, 320, 350], '2nd': [230, 260, 290, 320], '3rd': [230, 260, 290, 320], '4th': [260, 290, 320, 350] },
        'Granát': { '1st': [23, 18, 13, 10], '2nd': [24, 19, 14, 11], '3rd': ['/', '/', '/', '/'], '4th': ['/', '/', '/', '/'] },
        'Koule': { '3rd': [7.5, 6.5, 5.1, 4.5], '4th': [7, 6, 5, 4] }
    }
};

// Convert time in mm:ss format to seconds
function timeToSeconds(time) {
    const timeParts = time.split(':');
    if (timeParts.length !== 2) return null; // Invalid format
    const minutes = parseFloat(timeParts[0]);
    const seconds = parseFloat(timeParts[1]);

    // Validate that both minutes and seconds are numbers
    if (isNaN(minutes) || isNaN(seconds)) return null;

    return minutes * 60 + seconds;
}

// Normalize performance value for consistent comparison (dot for decimal, handles comma)
function normalizeInput(value) {
    return value.replace(',', '.'); // Replace commas with periods for consistency
}

// Calculate mark based on activity and performance
function calculateMark(activity, performance) {
    let userCriteria = criteria[user.gender][activity] && criteria[user.gender][activity][user.grade];
    if (!userCriteria) return 'N/A';

    // Handle 1500m and 800m time-based activities
    if (activity === '1500m' || activity === '800m') {
        const normalizedPerformance = normalizeInput(performance);
        const parsedPerformance = timeToSeconds(normalizedPerformance); // Convert to seconds

        if (parsedPerformance === null) {
            return 'N/A'; // Return N/A if the time format is invalid
        }

        for (let i = 0; i < userCriteria.length; i++) {
            if (parsedPerformance <= userCriteria[i]) {
                return i + 1;  // Lower times = better grade
            }
        }
        return 5;  // Default to 5 if worse
    }

    // Handle Granát (reverse grading: higher performance = better)
    if (activity === 'Granát') {
        const parsedPerformance = parseFloat(normalizeInput(performance));
        for (let i = 0; i < userCriteria.length; i++) {
            if (parsedPerformance >= userCriteria[i]) {
                return i + 1;  // Higher performance = better grade
            }
        }
        return 5;  // Default to 5 if worse
    }

    // For other activities: standard grading (lower values = better grade)
    for (let i = 0; i < userCriteria.length; i++) {
        const parsedPerformance = parseFloat(normalizeInput(performance));
        if (parsedPerformance <= userCriteria[i]) {
            return i + 1;
        }
    }
    return 5; // Default to 5 if worse
}

function addEntryToTable(activity, performance, mark) {
    const table = document.getElementById('performanceTable').querySelector('tbody');
    const row = document.createElement('tr');
    const date = new Date().toLocaleDateString();

    row.innerHTML = `
        <td>${activity}</td>
        <td>${performance}</td>
        <td>${mark}</td>
        <td>${date}</td>
        <td><button class="deleteBtn">Delete</button></td>
    `;

    row.querySelector('.deleteBtn').addEventListener('click', () => {
        row.remove();
    });

    table.appendChild(row);
}

// Handle "Other" activity input
document.getElementById('activity').addEventListener('change', (e) => {
    const otherActivityInput = document.getElementById('otherActivity');
    const performanceInput = document.getElementById('performance');
    
    // If "Other" is selected, show the input for other activity
    if (e.target.value === 'Other') {
        otherActivityInput.style.display = 'block';
    } else {
        otherActivityInput.style.display = 'none';
        performanceInput.value = ''; // Reset performance input when switching activity
    }
});

document.getElementById('savePerformance').addEventListener('click', () => {
    const form = document.getElementById('performanceForm');
    let activity = form.activity.value;
    let performance = form.performance.value;
    let otherActivity = form.otherActivity.value;

    if (!activity || !performance) {
        alert('Please fill in all fields');
        return;
    }

    // If activity is "Other", use the input text and performance entered
    if (activity === 'Other') {
        if (!otherActivity) {
            alert('Please enter the name of the other activity.');
            return;
        }
        activity = otherActivity; // Set activity to the other activity name
    }

    // Add the entry to the table
    const mark = calculateMark(activity, performance);
    addEntryToTable(activity, performance, mark);

    form.reset();
    document.getElementById('otherActivity').style.display = 'none'; // Hide the 'other activity' input after submission
});
