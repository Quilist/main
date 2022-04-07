import * as React from "react";

function PurchasesAndStorage() {
  React.useEffect(() => {
    document.title = "B-Fin: Закупки и склад"
    // eslint-disable-next-line
  }, [])

  return <>
    <section className="home-section">
      <div className="home-content">
        Закупки и склад
      </div>
    </section>
  </>
}

export default PurchasesAndStorage;


