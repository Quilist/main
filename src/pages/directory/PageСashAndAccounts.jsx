import DocumentTitle from 'react-document-title'
import Sidebar from "../../sidebar/Sidebar";
import СashAndAccounts from '../../directory-components/directory/CashAndAccounts/СashAndAccounts';


const PageСashAndAccounts = () => {
   return (
      <DocumentTitle title='B-Fin: Кассы и счета'>
         <div >
            <Sidebar />
            <СashAndAccounts />
         </div>
      </DocumentTitle>
   )
}
export default PageСashAndAccounts;