import * as React from "react";

function OrdersAndSales() {
  React.useEffect(() => {
    document.title = "B-Fin: Заказы и продажи"
    // eslint-disable-next-line
  }, [])

  return <>
    <section className="home-section">
      <div className="home-content">
        Заказы и продажи
      </div>
    </section>
  </>
}

export default OrdersAndSales;