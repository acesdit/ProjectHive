import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
import datetime
import os

# Add these imports for PDF export
import io
try:
    import pdfkit
except ImportError:
    pdfkit = None

# Optional: Uncomment if you want to use OpenAI for dynamic chat responses
# import openai

# ---------------------------------------
# 🌐 PAGE CONFIG
# ---------------------------------------
st.set_page_config(
    page_title="Faculty Effectiveness Analyzer",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# ---------------------------------------
# 👩‍🏫 FACULTY DATA (with manual add section)
# ---------------------------------------
def save_faculty_profiles(profiles):
    pd.DataFrame(profiles).to_json("faculty_profiles.json")

def load_faculty_profiles():
    if os.path.exists("faculty_profiles.json"):
        return pd.read_json("faculty_profiles.json", typ='dict')
    else:
        return None

profiles_from_file = load_faculty_profiles()
if profiles_from_file:
    faculty_profiles = profiles_from_file
else:
    faculty_profiles = {
        "Dr. John Doe": {
            "image": "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            "rating": "4.8 / 5",
            "experience": "12 Years",
            "designation": "Associate Professor",
            "department": "Computer Engineering",
            "institution": "ABC Institute of Technology",
            "about": "Passionate about building real-world technical skills and improving student outcomes through interactive learning.",
            "expertise": ["Machine Learning", "HCI", "Operating Systems"],
            "email": "johndoe@abc.edu",
            "id": "CSE-1023",
            "achievements": [
                "Best Teacher Award 2022",
                "Published 10+ research papers",
                "Invited Speaker at MLConf 2024"
            ]
        },
        "Prof. Meera Sharma": {
            "image": "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
            "rating": "4.5 / 5",
            "experience": "8 Years",
            "designation": "Assistant Professor",
            "department": "Information Technology",
            "institution": "XYZ College of Engineering",
            "about": "Focused on student engagement and improving conceptual understanding.",
            "expertise": ["Cloud Computing", "IoT", "Networking"],
            "email": "meerasharma@xyz.edu",
            "id": "IT-1122",
            "achievements": [
                "Young Researcher Award 2021",
                "Organized IoT Symposium 2023"
            ]
        },
        "Dr. A. Sharma": {
            "image": "https://cdn-icons-png.flaticon.com/512/4140/4140037.png",
            "rating": "4.9 / 5",
            "experience": "15 Years",
            "designation": "Professor",
            "department": "AI & Data Science",
            "institution": "Global Tech University",
            "about": "Known for delivering complex topics with clarity and adaptive teaching methods.",
            "expertise": ["AI", "Data Science", "Deep Learning"],
            "email": "asharma@gtu.edu",
            "id": "AIDS-1007",
            "achievements": [
                "AI Excellence Award 2023",
                "Published 20+ journal articles"
            ]
        }
    }

# ---------------------------------------
# SIDEBAR: Manual Faculty Add Section
# ---------------------------------------
st.sidebar.markdown("### ➕ Add New Faculty Profile")
with st.sidebar.form("add_faculty_form"):
    new_name = st.text_input("Full Name")
    new_email = st.text_input("Email")
    new_id = st.text_input("Faculty ID")
    new_designation = st.text_input("Designation")
    new_department = st.text_input("Department")
    new_institution = st.text_input("Institution")
    new_experience = st.text_input("Experience (e.g. 5 Years)")
    new_rating = st.text_input("Rating (e.g. 4.5 / 5)")
    new_about = st.text_area("About")
    new_expertise = st.text_input("Expertise (comma separated)")
    new_image = st.text_input("Image URL (optional)", value="https://cdn-icons-png.flaticon.com/512/3135/3135715.png")
    new_achievements = st.text_area("Achievements (one per line)")
    add_faculty_btn = st.form_submit_button("Add Faculty")

    if add_faculty_btn and new_name:
        faculty_profiles[new_name] = {
            "image": new_image,
            "rating": new_rating,
            "experience": new_experience,
            "designation": new_designation,
            "department": new_department,
            "institution": new_institution,
            "about": new_about,
            "expertise": [e.strip() for e in new_expertise.split(",") if e.strip()],
            "email": new_email,
            "id": new_id,
            "achievements": [a.strip() for a in new_achievements.split("\n") if a.strip()]
        }
        save_faculty_profiles(faculty_profiles)
        st.sidebar.success(f"Faculty '{new_name}' added! Please refresh to see in the list.")

selected_faculty = st.sidebar.selectbox("👩‍🏫 Select Faculty", list(faculty_profiles.keys()))
faculty = faculty_profiles[selected_faculty]

# ---------------------------------------
# 🧠 SIMULATED DATA GENERATION (PER FACULTY)
# ---------------------------------------
def generate_day(seed):
    np.random.seed(seed)
    activities = ['Instruction', 'Research', 'Admin', 'Email', 'Prep', 'Meeting', 'Break', 'Mentoring']
    hours = np.random.choice(range(9, 18), 10)
    return pd.DataFrame({
        'timestamp': [f"{h:02d}:00:00" for h in hours],
        'activity_type': np.random.choice(activities, 10),
        'duration_minutes': np.random.randint(15, 120, 10),
        'tcl_score': np.random.randint(10, 100, 10),
        'context_switch_flag': np.random.choice([0, 1], 10)
    })

base_date = datetime.date(2025, 10, 13)
faculty_data = {f: {base_date - datetime.timedelta(days=i): generate_day(i+idx*10) for i in range(30)}
                for idx, f in enumerate(faculty_profiles.keys())}

# ---------------------------------------
# 📄 FACULTY PROFILE (Sliding Panel)
# ---------------------------------------
with st.expander(f"👨‍🏫 Faculty Profile: {selected_faculty}", expanded=True):
    colA, colB = st.columns([1, 2])
    with colA:
        st.image(faculty['image'], width=140)
        st.metric("⭐ Rating", faculty['rating'])
        st.metric("🏫 Experience", faculty['experience'])
    with colB:
        st.write(f"**Designation:** {faculty['designation']}")
        st.write(f"**Department:** {faculty['department']}")
        st.write(f"**Institution:** {faculty['institution']}")
        st.write(f"**Email:** {faculty['email']}  |  **Faculty ID:** {faculty['id']}")
        st.write(f"**Expertise:** {', '.join(faculty['expertise'])}")
        st.write(f"📝 {faculty['about']}")
        # Achievements Section
        if "achievements" in faculty:
            st.markdown("**🏆 Achievements:**")
            for ach in faculty["achievements"]:
                st.markdown(f"- {ach}")

# ---------------------------------------
# 🗓 PERIOD SELECTION
# ---------------------------------------
st.title("📊 Advanced Faculty Effectiveness & Workload Analytics Dashboard")
period = st.radio("Select Analysis Period:", ["Daily", "Weekly", "Monthly"], horizontal=True)

if period == "Daily":
    selected_date = st.date_input("Select Date", base_date)
    df = faculty_data[selected_faculty].get(selected_date, pd.DataFrame())
elif period == "Weekly":
    dates = sorted(faculty_data[selected_faculty].keys())[:7]
    df = pd.concat([faculty_data[selected_faculty][d] for d in dates], keys=dates).reset_index(level=1, drop=True).rename_axis('date').reset_index()
else:
    dates = sorted(faculty_data[selected_faculty].keys())
    df = pd.concat([faculty_data[selected_faculty][d] for d in dates], keys=dates).reset_index(level=1, drop=True).rename_axis('date').reset_index()

if df.empty:
    st.warning("No data found.")
    st.stop()

# ---------------------------------------
# 🧮 METRICS COMPUTATION
# ---------------------------------------
df['hour'] = pd.to_datetime(df['timestamp']).dt.hour
time_allocation = df.groupby('activity_type')['duration_minutes'].sum()
wasted_time = df['context_switch_flag'].sum() * 5
high_load_time = df[df['tcl_score'] > 70]['duration_minutes'].sum()
avg_tcl = df['tcl_score'].mean()
peak_hour = df.groupby('hour')['tcl_score'].mean().idxmax()

# Work-Life Balance Indicator
break_time = df[df['activity_type'] == 'Break']['duration_minutes'].sum()
work_time = df['duration_minutes'].sum()
balance_score = (break_time / work_time) * 100 if work_time else 0

# ---------------------------------------
# Utility: Save manual entries to CSV for persistent storage
# ---------------------------------------
def save_manual_entries(faculty_name, manual_entries):
    df_manual = pd.DataFrame(manual_entries)
    filename = f"{faculty_name.replace(' ', '_')}_manual_entries.csv"
    df_manual.to_csv(filename, index=False)
    return filename

def load_manual_entries(faculty_name):
    filename = f"{faculty_name.replace(' ', '_')}_manual_entries.csv"
    try:
        return pd.read_csv(filename).to_dict('records')
    except Exception:
        return []

# ---------------------------------------
# ⏱ GAUGE CHART FOR TCL
# ---------------------------------------
fig_gauge = go.Figure(go.Indicator(
    mode="gauge+number",
    value=avg_tcl,
    title={'text': "Real-Time TCL"},
    gauge={'axis': {'range': [0, 100]},
           'bar': {'color': "red" if avg_tcl > 70 else "green"},
           'steps': [
               {'range': [0, 50], 'color': "lightgreen"},
               {'range': [50, 80], 'color': "orange"},
               {'range': [80, 100], 'color': "red"}]}
))
st.plotly_chart(fig_gauge, use_container_width=True)

# ---------------------------------------
# 🧭 KEY INDICATORS
# ---------------------------------------
k1, k2, k3, k4, k5 = st.columns(5)
k1.metric("🧠 Average TCL", f"{avg_tcl:.1f}/100")
k2.metric("⏳ Context Switch Time Wasted", f"{wasted_time} min")
k3.metric("🔥 High Load Duration", f"{high_load_time} min")
k4.metric("🕒 Peak Load Hour", f"{peak_hour}:00")
k5.metric("⚖️ Work-Life Balance", f"{balance_score:.1f}%")

st.markdown("---")

# ---------------------------------------
# 📊 TABS STRUCTURE
# ---------------------------------------
tab1, tab2, tab3, tab4, tab5, tab6, tab7, tab8 = st.tabs([
    "📌 Activity Overview",
    "📈 Trends & Graphs",
    "🤖 AI Insights",
    "📊 Advanced Analytics",
    "📥 Reports",
    "🧑‍💻 Virtual Assistant",
    "✍️ Manual Entry",
    "🔬 Data Science & ML"
])

# ---------------------------------------
# 📌 TAB 1: ACTIVITY OVERVIEW
# ---------------------------------------
with tab1:
    col1, col2 = st.columns(2)
    with col1:
        fig = px.pie(values=time_allocation.values, names=time_allocation.index,
                     hole=0.4, color_discrete_sequence=px.colors.sequential.Viridis,
                     title="🕒 Time Allocation by Activity")
        fig.update_traces(textinfo='percent+label')
        st.plotly_chart(fig, use_container_width=True)

    with col2:
        df_treemap = df.groupby('activity_type')['tcl_score'].mean().reset_index()
        fig_tree = px.treemap(df_treemap, path=['activity_type'], values='tcl_score',
                              color='tcl_score', color_continuous_scale='Blues',
                              title="🌳 Activity Cognitive Load Tree")
        st.plotly_chart(fig_tree, use_container_width=True)

# ---------------------------------------
# 📈 TAB 2: TRENDS & GRAPHS
# ---------------------------------------
with tab2:
    if period == "Daily":
        hourly_avg = df.groupby('hour')['tcl_score'].mean().reset_index()
        st.subheader("📅 Hourly Cognitive Load Trend")
        st.plotly_chart(px.line(hourly_avg, x='hour', y='tcl_score', markers=True, title="Hourly TCL Curve"), use_container_width=True)
    else:
        st.subheader(f"📆 {period} Trends")
        trend_tcl = df.groupby('date')['tcl_score'].mean().reset_index()
        trend_time = df.groupby('date')['duration_minutes'].sum().reset_index()
        c1, c2 = st.columns(2)
        with c1:
            st.plotly_chart(px.line(trend_tcl, x='date', y='tcl_score', title="📈 Avg TCL over time", markers=True), use_container_width=True)
        with c2:
            st.plotly_chart(px.bar(trend_time, x='date', y='duration_minutes', title="⏳ Total Workload per Day"), use_container_width=True)

# ---------------------------------------
# 🧠 TAB 3: AI INSIGHTS
# ---------------------------------------
with tab3:
    st.subheader("🤖 AI-Powered Efficiency Insights")
    insights = []
    if wasted_time > 30:
        insights.append(f"⚠️ High context switching detected: {wasted_time} minutes wasted. Batch administrative work at the end of the day.")
    if high_load_time > 120:
        insights.append("🔥 High cognitive load period exceeded 2 hours. Introduce structured breaks.")
    if avg_tcl < 40:
        insights.append("📉 TCL below expected average. Increase interactive sessions.")
    if avg_tcl > 80:
        insights.append("🧠 Exceptional focus periods detected. Schedule complex lectures during these hours.")
    if balance_score < 5:
        insights.append("⚖️ Work-life balance is low. Encourage more breaks.")
    if not insights:
        st.success("🎉 Excellent balance detected. No major issues found.")
    else:
        for ins in insights:
            st.info(ins)

# ---------------------------------------
# 📊 TAB 4: ADVANCED ANALYTICS
# ---------------------------------------
with tab4:
    st.subheader("📊 Activity vs Cognitive Load Scatter Analysis")
    fig_scatter = px.scatter(
        df, x='duration_minutes', y='tcl_score', color='activity_type',
        size='duration_minutes', hover_data=['timestamp'],
        title="⏳ Duration vs 🧠 TCL Score Scatter"
    )
    st.plotly_chart(fig_scatter, use_container_width=True)

    st.subheader("🔸 Load Distribution Heatmap")
    df_heat = df.pivot_table(index='activity_type', columns='hour', values='tcl_score', aggfunc='mean')
    fig_heat = go.Figure(data=go.Heatmap(z=df_heat.values, x=df_heat.columns, y=df_heat.index, colorscale='Reds'))
    fig_heat.update_layout(title="Heatmap of Cognitive Load by Hour & Activity", xaxis_nticks=12)
    st.plotly_chart(fig_heat, use_container_width=True)

# ---------------------------------------
# 📥 TAB 5: REPORTS
# ---------------------------------------
with tab5:
    st.subheader("📤 Generate & Download Report")
    st.dataframe(df)
    total_duration = df['duration_minutes'].sum() / 60
    st.markdown(f"🕒 **Total Hours Worked:** {total_duration:.2f} hrs")
    st.markdown(f"📌 **Distinct Activities:** {df['activity_type'].nunique()}")
    st.download_button(
        label="📥 Download CSV Report",
        data=df.to_csv(index=False).encode('utf-8'),
        file_name=f"{selected_faculty}_{period.lower()}_report.csv",
        mime='text/csv'
    )
    # PDF Export Option
    if pdfkit:
        html = df.to_html(index=False)
        pdf_bytes = pdfkit.from_string(html, False)
        st.download_button(
            label="📄 Download PDF Report",
            data=pdf_bytes,
            file_name=f"{selected_faculty}_{period.lower()}_report.pdf",
            mime='application/pdf'
        )
    else:
        st.info("PDF export requires `pdfkit` and `wkhtmltopdf` installed. Run `pip install pdfkit` and download wkhtmltopdf from https://wkhtmltopdf.org/downloads.html")

# ---------------------------------------
# 🧑‍💻 TAB 6: VIRTUAL ASSISTANT (Dynamic Chat)
# ---------------------------------------
with tab6:
    st.markdown("## 💬 Faculty Virtual Assistant")
    st.write("Ask about your schedule, workload, breaks, or cognitive load. Example: *How busy am I today?*")

    if "chat_history" not in st.session_state:
        st.session_state.chat_history = []

    user_query = st.chat_input("Type your question here...")

    def get_dynamic_response(query):
        context = (
            f"Faculty: {selected_faculty}\n"
            f"Total work time: {work_time:.1f} minutes\n"
            f"Break time: {break_time:.1f} minutes\n"
            f"Work-life balance score: {balance_score:.1f}%\n"
            f"Average TCL: {avg_tcl:.1f}/100\n"
            f"High load duration: {high_load_time} minutes\n"
            f"Context switch time wasted: {wasted_time} minutes\n"
            f"Peak busy hour: {peak_hour}:00\n"
            f"Distinct activities: {df['activity_type'].nunique()}\n"
        )
        prompt = (
            f"You are a helpful assistant for faculty workload analytics. "
            f"Here is the faculty's current dashboard data:\n{context}\n"
            f"User question: {query}\n"
            f"Answer in a friendly, concise way using the data above."
        )
        # Uncomment below to use OpenAI
        # try:
        #     response = openai.ChatCompletion.create(
        #         model="gpt-3.5-turbo",
        #         messages=[
        #             {"role": "system", "content": "You are a helpful assistant for faculty workload analytics."},
        #             {"role": "user", "content": prompt}
        #         ],
        #         max_tokens=150
        #     )
        #     return response.choices[0].message.content.strip()
        # except Exception as e:
        #     return f"Sorry, I couldn't fetch a response. ({e})"
        # --- Fallback: Static rule-based response ---
        query = query.lower()
        if "busy" in query or "schedule" in query:
            return f"You have worked a total of {work_time:.1f} minutes today. Peak busy hour: {peak_hour}:00."
        elif "break" in query or "rest" in query:
            return f"You took {break_time:.1f} minutes of break today. Work-life balance score: {balance_score:.1f}%."
        elif "tcl" in query or "load" in query:
            return f"Your average TCL is {avg_tcl:.1f}/100. High load duration: {high_load_time} minutes."
        elif "context switch" in query or "distraction" in query:
            return f"Context switching wasted {wasted_time} minutes today. Try batching similar tasks."
        elif "activities" in query:
            return f"Distinct activities performed: {df['activity_type'].nunique()}."
        elif "report" in query or "download" in query:
            return "You can download your report from the 'Reports' tab."
        else:
            return "I'm here to help! Ask about your workload, schedule, breaks, or cognitive load."

    if user_query:
        st.session_state.chat_history.append(("user", user_query))
        response = get_dynamic_response(user_query)
        st.session_state.chat_history.append(("assistant", response))

    for role, msg in st.session_state.chat_history:
        st.chat_message(role).write(msg)

# ---------------------------------------
# ✍️ TAB 7: MANUAL ENTRY (with persistent storage)
# ---------------------------------------
with tab7:
    st.subheader("✍️ Add Your Own Experience Data")
    st.write("Manually log your activities, workload, or notes for today. Entries will be saved and used for analytics.")

    if "manual_entries" not in st.session_state:
        st.session_state.manual_entries = load_manual_entries(selected_faculty)

    with st.form("manual_entry_form"):
        activity = st.selectbox("Activity Type", ['Instruction', 'Research', 'Admin', 'Email', 'Prep', 'Meeting', 'Break', 'Mentoring', 'Other'])
        duration = st.number_input("Duration (minutes)", min_value=1, max_value=480, value=60)
        tcl = st.slider("TCL Score (1-100)", min_value=1, max_value=100, value=50)
        notes = st.text_area("Notes (optional)")
        submitted = st.form_submit_button("Add Entry")
        if submitted:
            entry = {
                "activity_type": activity,
                "duration_minutes": duration,
                "tcl_score": tcl,
                "notes": notes,
                "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            }
            st.session_state.manual_entries.append(entry)
            save_manual_entries(selected_faculty, st.session_state.manual_entries)
            st.success("Entry added and saved!")

    if st.session_state.manual_entries:
        manual_df = pd.DataFrame(st.session_state.manual_entries)
        st.write("Your Manual Entries:")
        st.dataframe(manual_df)

# ---------------------------------------
# 🔬 TAB 8: DATA SCIENCE & MACHINE LEARNING ANALYSIS
# ---------------------------------------
with tab8:
    st.subheader("🔬 Data Science & Machine Learning Analysis")
    st.write("Analyze your activity data using clustering and regression.")

    # Combine simulated and manual data for analysis
    combined_df = pd.concat([df, pd.DataFrame(st.session_state.manual_entries)], ignore_index=True, sort=False)
    combined_df = combined_df.dropna(subset=['activity_type', 'duration_minutes', 'tcl_score'])

    # Clustering: Group activities by TCL and duration
    from sklearn.cluster import KMeans
    X = combined_df[['duration_minutes', 'tcl_score']]
    if len(X) >= 3:
        kmeans = KMeans(n_clusters=3, random_state=42)
        combined_df['cluster'] = kmeans.fit_predict(X)
        st.write("Activity Clusters (based on duration & TCL):")
        st.dataframe(combined_df[['activity_type', 'duration_minutes', 'tcl_score', 'cluster']])
        fig_cluster = px.scatter(combined_df, x='duration_minutes', y='tcl_score', color='cluster', hover_data=['activity_type'])
        st.plotly_chart(fig_cluster, use_container_width=True)
    else:
        st.info("Add more manual entries for clustering analysis.")

    # Regression: Predict TCL from duration (manual regression line, no statsmodels needed)
    from sklearn.linear_model import LinearRegression
    if len(X) >= 3:
        reg = LinearRegression()
        reg.fit(X[['duration_minutes']], X['tcl_score'])
        combined_df['predicted_tcl'] = reg.predict(X[['duration_minutes']])
        st.write("Regression: Predict TCL from Duration")
        st.dataframe(combined_df[['duration_minutes', 'tcl_score', 'predicted_tcl']])

        scatter = go.Scatter(
            x=combined_df['duration_minutes'],
            y=combined_df['tcl_score'],
            mode='markers',
            name='Actual TCL'
        )
        line = go.Scatter(
            x=combined_df['duration_minutes'],
            y=combined_df['predicted_tcl'],
            mode='lines',
            name='Regression Line'
        )
        fig_reg = go.Figure([scatter, line])
        fig_reg.update_layout(title="TCL vs Duration Regression",
                             xaxis_title="Duration (minutes)",
                             yaxis_title="TCL Score")
        st.plotly_chart(fig_reg, use_container_width=True)
    else:
        st.info("Add more manual entries for regression analysis.")

st.markdown("---")
st.caption("© 2025 Advanced Faculty Effectiveness Dashboard | Built with ❤️ Streamlit + Plotly")