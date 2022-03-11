import DocumentTitle from 'react-document-title'
import Sidebar from "../sidebar/Sidebar";
import Settings from '../settings/Settings';


const PageSettings = () => {
   return (
      <DocumentTitle title='B-Fin: Настройки'>
         <div >
            <Sidebar />
            <Settings />
         </div>
      </DocumentTitle>
   )
}
export default PageSettings;