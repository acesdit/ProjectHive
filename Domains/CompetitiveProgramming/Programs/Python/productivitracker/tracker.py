import math


def get_screen_time_score(minutes):
    """
    Scores screen time. Lower is better.
    - 100 points for 2 hours (120 min) or less.
    - 0 points for 8 hours (480 min) or more.
    - A sliding scale in between.
    """
    max_good = 120  
    min_bad = 480   

    if minutes <= max_good:
        return 100
    if minutes >= min_bad:
        return 0

    
    range_val = min_bad - max_good
    excess_time = minutes - max_good
    score = 100 * (1 - (excess_time / range_val))
    return score

def get_workout_score(minutes):
    """
    Scores workout time. More is better.
    - 100 points for 30 minutes or more.
    - A sliding scale from 0 to 30 minutes.
    """
    target = 30 
    score = (minutes / target) * 100
    return min(100, score)  

def get_goals_score(completed, total):
    """
    Scores goal completion.
    """
    if total == 0:
        return 100  
    return (completed / total) * 100



def calculate_final_score(screen_time_mins, workout_mins, goals_completed, goals_total):
    """
    Calculates the final weighted "Mental Health Score".
    YOU CAN (and should) ADJUST THE WEIGHTS!
    """
   
    weights = {
        'screenTime': 0.20,  
        'workout': 0.40,     
        'goals': 0.40        
    }

    screen_score = get_screen_time_score(screen_time_mins)
    workout_score = get_workout_score(workout_mins)
    goals_score = get_goals_score(goals_completed, goals_total)

    final_score = (
        (screen_score * weights['screenTime']) +
        (workout_score * weights['workout']) +
        (goals_score * weights['goals'])
    )
    return final_score

def get_rating(score):
    """
    Converts a numerical score into a friendly rating.
    """
    if score >= 90:
        return "Excellent"
    if score >= 75:
        return "Great"
    if score >= 50:
        return "Good"
    if score >= 30:
        return "Needs Focus"
    return "Take Care"



def get_group_ranking(users):
    """
    Processes the list of users and returns a ranked list.
    """
    ranked_list = []
    for user in users:
        data = user['data']
        score = calculate_final_score(
            data['screen'],
            data['workout'],
            data['completed'],
            data['total']
        )
        rating = get_rating(score)

        ranked_list.append({
            'name': user['name'],
            'score': round(score, 1),  
            'rating': rating
        })

   
    ranked_list.sort(key=lambda x: x['score'], reverse=True)
    return ranked_list


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
    },
    {
        'id': 3,
        'name': "Charlie",
        'data': {'screen': 500, 'workout': 0, 'completed': 1, 'total': 3}
    },
    {
        'id': 4,
        'name': "David",
        'data': {'screen': 200, 'workout': 15, 'completed': 2, 'total': 2}
    }
]

# 2. Run the ranking!
leaderboard = get_group_ranking(support_group)
print(leaderboard)