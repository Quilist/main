import DocumentTitle from 'react-document-title'
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import FinancialResult from "@/pages/Reports/linksOfReports/FinancialResult";


const PageFinancialResult = () => {
  return (
    <DocumentTitle title='B-Fin: Финансовые результаты'>
      <div >
        <Sidebar />
        <FinancialResult />
      </div>
    </DocumentTitle>
  )
}
export default PageFinancialResult;