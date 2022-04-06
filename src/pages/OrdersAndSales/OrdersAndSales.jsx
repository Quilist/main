import * as React from "react";
import {useDocumentTitle} from "@/hooks/useDocumentTitle";

function OrdersAndSales() {
  useDocumentTitle("Заказы и продажи");

  return <>
    <section className="home-section">
      <div className="home-content">
        Заказы и продажи
      </div>
    </section>
  </>
}

export default OrdersAndSales;