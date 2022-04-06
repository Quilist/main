import * as React from "react";
import {useDocumentTitle} from "@/hooks/useDocumentTitle";

function Reports() {
  useDocumentTitle("Отчеты");

  return <>
    <section className="home-section">
      <div className="home-content">
        Отчеты
      </div>
    </section>
  </>
}

export default Reports;

