import DocumentTitle from 'react-document-title'
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import SalesAndOrders from "@/pages/Reports/linksOfReports/SalesAndOrders";


const PageSalesAndOrders = () => {
  return (
    <DocumentTitle title='B-Fin: Продажи и заказы'>
      <div >
        <Sidebar />
        <SalesAndOrders />
      </div>
    </DocumentTitle>
  )
}
export default PageSalesAndOrders;