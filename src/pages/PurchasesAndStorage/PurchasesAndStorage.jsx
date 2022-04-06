import * as React from "react";
import {useDocumentTitle} from "@/hooks/useDocumentTitle";

function PurchasesAndStorage() {
  useDocumentTitle("Закупки и склад");

  return <>
    <section className="home-section">
      <div className="home-content">
        Закупки и склад
      </div>
    </section>
  </>
}

export default PurchasesAndStorage;


