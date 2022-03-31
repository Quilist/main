import DocumentTitle from 'react-document-title'
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Buy from "@/components/layout/Header/headersButtons/Buy";


const PageBuy = () => {
  return (
    <DocumentTitle title='B-Fin: Купить'>
      <div >
        <Sidebar />
        <Buy />
      </div>
    </DocumentTitle>
  )
}
export default PageBuy;