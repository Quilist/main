import * as React from "react";

function DirectoryCategory() {
  React.useEffect(() => {
    document.title = "B-Fin: Справочник"
    // eslint-disable-next-line
  }, [])

   return (
      <>
         <section className="home-section">
            <div className="home-content">
               Справочник в виде категорий
            </div>
         </section>
      </>
   )
}

export default DirectoryCategory;