import DocumentTitle from 'react-document-title'
import Sidebar from "../../sidebar/Sidebar";
import Accept from "../../header/headersButtons/Accept";


const PageAccept = () => {
  return (
    <DocumentTitle title='B-Fin: Принять оплату'>
      <div >
        <Sidebar />
        <Accept />
      </div>
    </DocumentTitle>

  )
}
export default PageAccept;