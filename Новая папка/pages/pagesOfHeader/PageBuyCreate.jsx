import DocumentTitle from 'react-document-title'
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import BuyCreate from "@/components/layout/Header/headersButtons/BuyCreate";


const PageBuy = () => {
  return (
    <DocumentTitle title='B-Fin: Купить'>
      <div >
        <Sidebar />
        <BuyCreate />
      </div>
    </DocumentTitle>
  )
}
export default PageBuy;