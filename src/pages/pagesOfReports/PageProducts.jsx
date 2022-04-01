import DocumentTitle from 'react-document-title'
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Products from "@/pages/Reports/linksOfReports/Products";


const PageProducts = () => {
  return (
    <DocumentTitle title='B-Fin: Товары'>
      <div >
        <Sidebar />
        <Products />
      </div>
    </DocumentTitle>
  )
}
export default PageProducts;