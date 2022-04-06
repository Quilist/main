import * as React from "react";
import {useDocumentTitle} from "@/hooks/useDocumentTitle";

function History() {
  useDocumentTitle("История изменений");

  return (
    <>
      <section className="home-section">
        <div className="home-content">
          История
        </div>
      </section>
    </>

  )
}

export default History;