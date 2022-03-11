import DocumentTitle from 'react-document-title'
import Sidebar from "../../sidebar/Sidebar";
import Directory from '../../directory-components/directory/Directory';


const PageDirectory = () => {
   return (
      <DocumentTitle title='B-Fin: Справочник'>
         <div >
            <Sidebar />
            <Directory />
         </div>
      </DocumentTitle>
   )
}
export default PageDirectory;