import DocumentTitle from 'react-document-title'
import Sidebar from "../sidebar/Sidebar";
import PurchasesAndStorage from '../purchasesAndStorage/PurchasesAndStorage';


const PagePurchasesAndStorage = () => {
  return (
    <DocumentTitle title='B-Fin: Закупки и склад'>
      <div >
        <Sidebar />
        <PurchasesAndStorage />
      </div>
    </DocumentTitle>
  )
}
export default PagePurchasesAndStorage;