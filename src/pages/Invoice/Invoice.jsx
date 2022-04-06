import * as React from "react";
import {useDocumentTitle} from "@/hooks/useDocumentTitle";

function Invoice() {
  useDocumentTitle("Счёт");

  return <>
    <section className="home-section">
      <div className="home-content">
        Счёт
      </div>
    </section>
  </>
}

export default Invoice;