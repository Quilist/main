import DocumentTitle from 'react-document-title'
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Storehouse from '../../directory-components/directory/Storehouse/Storehouse';


const PageStorehouse = () => {
   return (
      <DocumentTitle title='B-Fin: Справочник'>
         <div >
            <Sidebar />
            <Storehouse />
         </div>
      </DocumentTitle>
   )
}
export default PageStorehouse;