
import AddProduct from "../../productsAndServices/productsEditing/AddProduct"
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import DocumentTitle from 'react-document-title'

function PageAddProduct() {
  return (
    <DocumentTitle title='B-Fin: Изменить товар'><div>
      <Sidebar />
      <AddProduct/>
    </div></DocumentTitle>

  )
}

export default PageAddProduct;