import * as React from "react";

function History() {
  React.useEffect(() => {
    document.title = "B-Fin: История изменений"
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <section className="home-section">
        <div className="home-content">
          История
        </div>
      </section>
    </>
    
  )
}

export default History;