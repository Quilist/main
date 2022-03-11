import SupplierEditing from "./supplierEditing/SupplierEditing";
import DocumentTitle from 'react-document-title'

function PageUserEditing() {
   return (
      <DocumentTitle title='B-Fin: Изменить поставщика'><div>
         <SupplierEditing />
      </div></DocumentTitle>

   )
}

export default PageUserEditing;