import * as React from "react";
import {useDocumentTitle} from "@/hooks/useDocumentTitle";

function AllMoves() {
  useDocumentTitle("Показатели")

  return (
    <>
      <section className="home-section">
        <div className="home-content">
          все движения
        </div>
      </section>
    </>
  )
}

export default AllMoves;