import DocumentTitle from 'react-document-title'
import Sidebar from "../../sidebar/Sidebar";
import ReconciliationActs from "../../reports/linksOfReports/ReconciliationActs";


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