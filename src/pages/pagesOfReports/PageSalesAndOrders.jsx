import DocumentTitle from 'react-document-title'
import Sidebar from "../../sidebar/Sidebar";
import SalesAndOrders from "../../reports/linksOfReports/SalesAndOrders";


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