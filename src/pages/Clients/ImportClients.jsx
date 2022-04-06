import * as React from "react";
import {useDocumentTitle} from "@/hooks/useDocumentTitle";

function ImportClients() {
  useDocumentTitle("Импортировать клиентов")

  return <>
    <section className="home-section">
      <div className="home-content">
        Импортировать клиентов
      </div>
    </section>
  </>
}

export default ImportClients;