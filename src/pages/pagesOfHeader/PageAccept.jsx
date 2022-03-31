import DocumentTitle from 'react-document-title'
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Accept from "@/components/layout/Header/headersButtons/Accept";


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