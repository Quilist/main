import * as React from "react";

function Invoice() {
  React.useEffect(() => {
    document.title = "B-Fin: Счёт"
    // eslint-disable-next-line
  }, [])

  return <>
    <section className="home-section">
      <div className="home-content">
        Счёт
      </div>
    </section>
  </>
}

export default Invoice;