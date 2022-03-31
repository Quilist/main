import DocumentTitle from 'react-document-title'
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Expenditure from '../../directory-components/directory/Expenditure/Expenditure';


const PageExpenditure = () => {
   return (
      <DocumentTitle title='B-Fin: Справочник'>
         <div >
            <Sidebar />
            <Expenditure />
         </div>
      </DocumentTitle>
   )
}
export default PageExpenditure;