import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Analyst Trainee</h4>
                <h5>Invact Metaversity</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Collected, cleaned, and analyzed datasets of 10,000+ records using SQL and Excel, 
              applying ETL processes to generate insights. Developed interactive Tableau dashboards 
              with KPI visualizations, enabling data-driven decisions across cross-functional teams.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>QA Tester & Release Manager</h4>
                <h5>eL Nova Labs</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Designed and executed 100+ test cases for web applications, ensuring good test coverage. 
              Identified and resolved 40+ issues within sprint timelines. Conducted regression testing 
              and managed release cycles for 5+ deployments, coordinating with cross-functional teams.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>MBA, Business Analytics</h4>
                <h5>Shri Ramswaroop Memorial Univ.</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Master of Business Administration in Business Analytics. Building a 
              strong foundation in data visualization, statistical analysis, and 
              segmentation models. Prev: B.A. (Hons), Public Administration (2016-2019).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
