import * as React from "react";

function Reports() {
  React.useEffect(() => {
    document.title = "B-Fin: Отчеты"
    // eslint-disable-next-line
  }, [])

  return <>
    <section className="home-section">
      <div className="home-content">
        Отчеты
      </div>
    </section>
  </>
}

export default Reports;

