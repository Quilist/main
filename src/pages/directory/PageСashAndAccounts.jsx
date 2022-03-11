import DocumentTitle from 'react-document-title'
import Sidebar from "../../sidebar/Sidebar";
import СashAndAccounts from '../../directory-components/directory/СashAndAccounts';


const PageСashAndAccounts = () => {
   return (
      <DocumentTitle title='B-Fin: Справочник'>
         <div >
            <Sidebar />
            <СashAndAccounts />
         </div>
      </DocumentTitle>
   )
}
export default PageСashAndAccounts;