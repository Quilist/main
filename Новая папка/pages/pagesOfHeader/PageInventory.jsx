import DocumentTitle from 'react-document-title'
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Inventory from "@/components/layout/Header/headersButtons/Inventory";


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