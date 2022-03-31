import * as React from "react";

function Dashboard() {
  React.useEffect(() => {
    document.title = "Показатели"
  }, [])

  return (
    <>
      <section className="home-section">
        <div className="home-content">
          Показатели
        </div>
      </section>
    </>
  )
}

export default Dashboard;