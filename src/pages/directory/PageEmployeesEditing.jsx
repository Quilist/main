import DocumentTitle from 'react-document-title'
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import EmployeeEditing from '../../employeeEditing/EmployeeEditing';  

const PageLegalEntities = () => { 
   return (
      <DocumentTitle title='B-Fin: Изменить сотрудника'>
         <div >
            <Sidebar />
            <EmployeeEditing /> 
         </div>
      </DocumentTitle>
   )
}
export default PageLegalEntities;