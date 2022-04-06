import * as React from "react";
import {useDocumentTitle} from "@/hooks/useDocumentTitle";

function DirectoryCategory() {
   useDocumentTitle("Категории");

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