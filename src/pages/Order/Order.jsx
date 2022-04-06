import * as React from "react";
import {useDocumentTitle} from "@/hooks/useDocumentTitle";

function Order() {
  useDocumentTitle("Заказы");

  return <>
    <section className="home-section">
      <div className="home-content">
        Заказы
      </div>
    </section>
  </>
}

export default Order;