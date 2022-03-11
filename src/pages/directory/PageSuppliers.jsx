import DocumentTitle from 'react-document-title'
import Sidebar from "../../sidebar/Sidebar";
import Suppliers from '../../directory-components/directory/Suppliers';


const PageSuppliers = () => {
   return (
      <DocumentTitle title='B-Fin: Поставщики'>
         <div >
            <Sidebar />
            <Suppliers />
         </div>
      </DocumentTitle>
   )
}
export default PageSuppliers;