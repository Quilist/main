import * as React from "react";

function Dashboard() {
  React.useEffect(() => {
    document.title = "B-Fin: Показатели"
    // eslint-disable-next-line
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