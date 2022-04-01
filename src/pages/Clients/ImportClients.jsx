import * as React from "react";

function ImportClients() {
  React.useEffect(() => {
    document.title = "B-Fin: Импортировать клиентов"
    // eslint-disable-next-line
  }, [])

  return <>
    <section className="home-section">
      <div className="home-content">
        Импортировать клиентов
      </div>
    </section>
  </>
}

export default ImportClients;