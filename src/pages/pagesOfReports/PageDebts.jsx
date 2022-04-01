import DocumentTitle from 'react-document-title'
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Debts from "@/pages/Reports/linksOfReports/Debts";


const PageDebts = () => {
  return (
    <DocumentTitle title='B-Fin: Долги'>
      <div >
        <Sidebar />
        <Debts />
      </div>
    </DocumentTitle>
  )
}
export default PageDebts;