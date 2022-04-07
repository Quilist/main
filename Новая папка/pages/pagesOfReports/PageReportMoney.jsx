import DocumentTitle from 'react-document-title'
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import ReportMoney from "@/pages/Reports/linksOfReports/ReportMoney";


const PageReportMoney = () => {
  return (
    <DocumentTitle title='B-Fin: Отчеты Деньги'>
      <div >
        <Sidebar />
        <ReportMoney />
      </div>
    </DocumentTitle>
  )
}
export default PageReportMoney;