import DocumentTitle from 'react-document-title'
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import LegalEntities from '../../directory-components/directory/LegalEntities';



const PageLegalEntities = () => {
   return (
      <DocumentTitle title='B-Fin: Мои фирмы'>
         <div >
            <Sidebar />
            <LegalEntities />
         </div>
      </DocumentTitle>
   )
}
export default PageLegalEntities;