import DocumentTitle from 'react-document-title'
import Sidebar from "../../sidebar/Sidebar";
import Products from "../../reports/linksOfReports/Products";


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