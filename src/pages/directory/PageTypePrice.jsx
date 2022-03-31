import DocumentTitle from 'react-document-title'
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import TypePrice from '../../directory-components/directory/TypePrice/TypePrice';


const PageTypePrice = () => {
   return (
      <DocumentTitle title='B-Fin: Справочник'>
         <div >
            <Sidebar />
            <TypePrice />
         </div>
      </DocumentTitle>
   )
}
export default PageTypePrice;