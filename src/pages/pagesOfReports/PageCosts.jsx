import DocumentTitle from 'react-document-title'
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Costs from "@/pages/Reports/linksOfReports/Costs";


const PageCosts = () => {
  return (
    <DocumentTitle title='B-Fin: Расходы'>
      <div >
        <Sidebar />
        <Costs />
      </div>
    </DocumentTitle>
  )
}
export default PageCosts;