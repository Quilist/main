import * as React from "react";

function AllMoves() {
  React.useEffect(() => {
    document.title = "B-Fin: Все движения"
    // eslint-disable-next-line
  }, [])

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