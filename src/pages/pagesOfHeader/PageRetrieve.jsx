import DocumentTitle from 'react-document-title'
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Retrieve from "@/components/layout/Header/headersButtons/Retrieve";


const PageRetrieve = () => {
  return (
    <DocumentTitle title='B-Fin: Возврат'>
      <div >
        <Sidebar />
        <Retrieve />
      </div>
    </DocumentTitle>
  )
}
export default PageRetrieve;