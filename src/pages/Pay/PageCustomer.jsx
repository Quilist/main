import DocumentTitle from 'react-document-title'
import Sidebar from "../sidebar/Sidebar";
import AllMoves from '../allMoves/AllMoves';


const PageAllMoves = () => {
  return (
    <DocumentTitle title='B-Fin: Все движения'>
      <div >
        <Sidebar />
        <AllMoves />
      </div>
    </DocumentTitle>
  )
}
export default PageAllMoves;