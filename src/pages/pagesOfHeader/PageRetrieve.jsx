import DocumentTitle from 'react-document-title'
import Sidebar from "../../sidebar/Sidebar";
import Retrieve from "../../header/headersButtons/Retrieve";


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