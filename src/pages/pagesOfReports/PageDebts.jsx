import DocumentTitle from 'react-document-title'
import Sidebar from "../../sidebar/Sidebar";
import Debts from "../../reports/linksOfReports/Debts";


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