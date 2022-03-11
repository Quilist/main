import DocumentTitle from 'react-document-title'
import Sidebar from "../../sidebar/Sidebar";
import Currencies from '../../directory-components/directory/Currency/Currency';


const PageDirectory = () => {
   return (
      <DocumentTitle title='B-Fin: Справочник'>
         <div >
            <Sidebar />
            <Currencies />
         </div>
      </DocumentTitle>
   )
}
export default PageDirectory;