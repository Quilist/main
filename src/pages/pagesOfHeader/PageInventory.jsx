import DocumentTitle from 'react-document-title'
import Sidebar from "../../sidebar/Sidebar";
import Inventory from "../../header/headersButtons/Inventory";


const PageInventory = () => {
  return (
    <DocumentTitle title='B-Fin: Инвентаризация'>
      <div >
        <Sidebar />
        <Inventory />
      </div>
    </DocumentTitle>
  )
}
export default PageInventory;