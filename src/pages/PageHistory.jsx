import DocumentTitle from 'react-document-title'
import Sidebar from "../sidebar/Sidebar";
import History from '../history/History';


const PageHistory = () => {
   return (
      <DocumentTitle title='B-Fin: История изменений'>
         <div >
            <Sidebar />
            <History />
         </div>
      </DocumentTitle>
   )
}
export default PageHistory;