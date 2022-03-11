import DocumentTitle from 'react-document-title'
import Sidebar from "../sidebar/Sidebar";
import OrdersAndSales from '../ordersAndSales/OrdersAndSales';

const PageOrdersAndSales = () => {
  return (
    <DocumentTitle title='B-Fin: Заказы и продажи'>
      <div >
        <Sidebar />
        <OrdersAndSales />
      </div>
    </DocumentTitle>
  )
}
export default PageOrdersAndSales;