**Contributor:** AbhinavPundir18

Wellness Score Algorithm
A Python script to calculate a "Wellness Score" for a support group based on screen time, workout, and goal completion.

Features
Metric-Based Scoring: Converts raw data (minutes, counts) into 0-100 scores.

Weighted Average: Calculates a final score based on customizable weights for each metric.

Human-Readable Ratings: Assigns friendly ratings like "Excellent" or "Good" to scores.

Group Ranking: Automatically sorts the support group from highest to lowest score.

Easy to Customize: Scoring logic and weights are in simple, editable functions.

Usage
Save the code as a Python file (e.g., wellness_score.py).

Edit the support_group list in the file to add your user data:

Python

support_group = [
    {
        'id': 1,
        'name': "Alice",
        'data': {'screen': 110, 'workout': 45, 'completed': 5, 'total': 5}
    },
    {
        'id': 2,
        'name': "Bob",
        'data': {'screen': 300, 'workout': 30, 'completed': 3, 'total': 4}
    }
    # ... add more users
]
Run the script from your terminal:
python wellness_score.py