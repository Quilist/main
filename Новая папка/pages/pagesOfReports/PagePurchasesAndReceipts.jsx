import DocumentTitle from 'react-document-title'
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import PurchasesAndReceipts from "@/pages/Reports/linksOfReports/PurchasesAndReceipts";


const PagePurchasesAndReceipts = () => {
  return (
    <DocumentTitle title='B-Fin: Закупки и приходы'>
      <div >
        <Sidebar />
        <PurchasesAndReceipts />
      </div>
    </DocumentTitle>
  )
}
export default PagePurchasesAndReceipts;