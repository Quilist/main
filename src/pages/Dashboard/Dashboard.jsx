import * as React from "react";
import {useDocumentTitle} from "@/hooks/useDocumentTitle";

function Dashboard() {
  useDocumentTitle("Показатели");

  return (
    <>
      <section className="home-section">
        <div className="home-content">
          Показатели
        </div>
      </section>
    </>
  )
}

export default Dashboard;