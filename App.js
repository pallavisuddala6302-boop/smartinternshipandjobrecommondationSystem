import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell
} from "recharts";

function App() {

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    passion: "",
    studies: ""
  });

  const [skills, setSkills] = useState([]);
  const [jobs, setJobs] = useState([]);

  const techSkills = [
    "Python","React","JavaScript","Machine Learning",
    "SQL","Node.js","HTML","CSS","Java","C++"
  ];

  const softSkills = [
    "Communication","Teamwork","Problem Solving","Leadership",
    "Time Management","Critical Thinking","Adaptability",
    "Creativity","Public Speaking","Decision Making"
  ];

  const skillOptions = [...techSkills, ...softSkills];

  const resumeTips = [
    "Use clean format",
    "Highlight key skills",
    "Add real projects",
    "Keep resume short",
    "Customize for each job"
  ];

  const handleSkillChange = (skill, checked) => {
    if (checked) {
      if (softSkills.includes(skill)) {
        const selectedSoft = skills.filter(s => softSkills.includes(s));
        if (selectedSoft.length >= 3) {
          alert("Max 3 soft skills allowed ⚠️");
          return;
        }
      }
      setSkills([...skills, skill]);
    } else {
      setSkills(skills.filter(s => s !== skill));
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ skills })
      });

      const data = await res.json();
      setJobs(data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ display: "flex", fontFamily: "Arial" }}>

      {/* SIDEBAR */}
      <div style={{
        width: "220px",
        background: "#1e293b",
        color: "white",
        padding: "20px",
        height: "100vh"
      }}>
        <h2>🚀 CareerAI</h2>
        <p>{userInfo.name || "User"}</p>
        <p>{userInfo.email || "Email"}</p>
        <hr />
        <p>Dashboard</p>
        <p>Profile</p>
        <p>Applications</p>
      </div>

      {/* MAIN */}
      <div style={{
        flex: 2,
        padding: "20px",
        background: "#f4f6f8"
      }}>

        <h1>🎓 Career Dashboard</h1>

        <div style={boxStyle}>
          <input placeholder="Name"
            onChange={(e)=>setUserInfo({...userInfo,name:e.target.value})}
          /><br/><br/>

          <input placeholder="Email"
            onChange={(e)=>setUserInfo({...userInfo,email:e.target.value})}
          /><br/><br/>

          <input placeholder="Passion"
            onChange={(e)=>setUserInfo({...userInfo,passion:e.target.value})}
          /><br/><br/>

          <input placeholder="Studies"
            onChange={(e)=>setUserInfo({...userInfo,studies:e.target.value})}
          /><br/><br/>

          <h3>Select Skills</h3>

          {skillOptions.map((skill,i)=>(
            <label key={i} style={{margin:"10px",display:"inline-block"}}>
              <input
                type="checkbox"
                onChange={(e)=>handleSkillChange(skill,e.target.checked)}
              />
              {skill}
            </label>
          ))}

          <br/><br/>

          <button onClick={handleSubmit} style={btnStyle}>
            Get Recommendations
          </button>
        </div>

        {/* INFO */}
        {jobs.length > 0 && (
          <h3>Choose from top {jobs.length} recommendations</h3>
        )}

        {/* TOP MATCH */}
        {jobs.length > 0 && (
          <h2 style={{color:"green"}}>
            🏆 Top Match: {jobs[0].title} ({jobs[0].matchScore}%)
          </h2>
        )}

        {/* JOBS */}
        <div style={{display:"flex",flexWrap:"wrap"}}>
          {jobs.map((job,index)=>(
            <div key={index} style={cardStyle}>
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <p>{job.matchScore}% Match</p>
            </div>
          ))}
        </div>

      </div>

      {/* RIGHT PANEL */}
      <div style={{
        width:"300px",
        padding:"20px",
        background:"#ffffff"
      }}>

        <h3>📄 Resume Tips</h3>
        <ul>
          {resumeTips.map((tip,i)=>(
            <li key={i}>{tip}</li>
          ))}
        </ul>

        <h3 style={{marginTop:"20px"}}>📊 Insights</h3>

        {jobs.length > 0 ? (
          <BarChart width={250} height={250} data={jobs}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" hide />
            <YAxis domain={[0,100]} />
            <Tooltip />
            <Bar dataKey="matchScore">
              {jobs.map((entry,index)=>(
                <Cell key={index}
                  fill={
                    entry.matchScore >= 80 ? "#22c55e" :
                    entry.matchScore >= 50 ? "#3b82f6" :
                    "#ef4444"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        ) : (
          <p>No data yet</p>
        )}

      </div>

    </div>
  );
}

// STYLES
const cardStyle = {
  background: "white",
  padding: "15px",
  borderRadius: "10px",
  margin: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
};

const boxStyle = {
  background: "white",
  padding: "15px",
  borderRadius: "10px"
};

const btnStyle = {
  padding: "10px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "5px"
};

export default App;