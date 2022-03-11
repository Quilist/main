import DocumentTitle from 'react-document-title'
import Sidebar from "../sidebar/Sidebar";
import Reports from '../reports/Reports';


const PageReports = () => {
  return (
    <DocumentTitle title='B-Fin: Отчеты'>
      <div >
        <Sidebar />
        <Reports />
      </div>
    </DocumentTitle>
  )
}
export default PageReports;