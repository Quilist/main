import DocumentTitle from 'react-document-title'
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import ReconciliationActs from "@/pages/Reports/linksOfReports/ReconciliationActs";


const PageReconciliationActs = () => {
  return (
    <DocumentTitle title='B-Fin: Акты сверки'>
      <div >
        <Sidebar />
        <ReconciliationActs />
      </div>
    </DocumentTitle>
  )
}
export default PageReconciliationActs;