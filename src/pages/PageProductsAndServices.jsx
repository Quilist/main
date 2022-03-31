import DocumentTitle from 'react-document-title'
import Sidebar from "../sidebar/Sidebar";
import ProductsAndServices from '../productsAndServices/ProductsAndServices';


const PageProductsAndServices = () => {
  return (
    <DocumentTitle title='Товары и услуги'>
      <div >
        <Sidebar />
        <ProductsAndServices />
      </div>
    </DocumentTitle>
  )
}
export default PageProductsAndServices;