import DocumentTitle from "react-document-title";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Order from "../order/Order";

const PageOrder = () => {
  return (
    <DocumentTitle title="B-Fin: Заказы">
      <div>
        <Sidebar />
        <Order />
      </div>
    </DocumentTitle>
  );
};
export default PageOrder;