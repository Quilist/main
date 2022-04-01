import * as React from "react";

function Order() {
  React.useEffect(() => {
    document.title = "B-Fin: Заказы"
    // eslint-disable-next-line
  }, [])

  return <>
    <section className="home-section">
      <div className="home-content">
        Заказы
      </div>
    </section>
  </>
}

export default Order;