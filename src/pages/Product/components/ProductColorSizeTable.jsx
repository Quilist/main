import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";


export default function ProductColorSizeTable({item, setItem, subItem, setSubItem, openColorSizeModal, setColorSizeModal}) {


  React.useEffect(() => {
    console.log(' item.childs',  item.childs)
    // eslint-disable-next-line
  })

  const tableHeader = [
    {
      name: "Товар"
    },
    {
      name: "Количество"
    },
    {
      name: ""
    }
  ];

  const fetchMoreData = () => {
    console.log('ok')
  };

  const goToEdit = (item) => {
    setSubItem(item);
    setColorSizeModal(true);
  };

  const formattedDate = (milliseconds) => {
    const date = new Date(+milliseconds);
    const formatDate = date.toISOString().split('T')[0]
    return formatDate;
  };

  const removeSubItem = (index) => {
    setItem(prevItem => ({
      ...prevItem,
      childs: item.childs.filter((o, i) => index !== i)
    }));
  };


  return (
    <>
      <div className="table">
        <div className="table__head">
          {tableHeader.map((th) => {
            return (
              <p>{th.name}</p>
            );
          })}
        </div>

        <InfiniteScroll
          dataLength={item.childs.length}
          next={fetchMoreData}
          hasMore={true}
          height={470}
          endMessage={
            <p style={{ textAlign: "center" }}>
              В
            </p>
          }
        >
          {item.childs.map((item, index) => {
            return (
              <div className="table__item">
                <div className="table__figure">

                </div>
                <div className="table__mob" onClick={() => {
                  goToEdit(item)
                }}>
                  <p>
                    {item.name}
                  </p>
                </div>
                <div className="table__data" onClick={() => {
                  goToEdit(item)
                }}>
                  <p>
                    {item.name}
                  </p>
                </div>
                <div className="table__data" onClick={() => {
                  goToEdit(item)
                }}>
                  <p>
                    {item.min_stock}
                  </p>
                </div>
                <div className="table__data">
                  <button  style={{marginTop: '15px'}} className={'MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButtonBase-root PayForm_button__YjScY css-1rwt2y5-MuiButtonBase-root-MuiButton-root'}
                           variant="outlined"
                           onClick={() => removeSubItem(index)}>
                    X
                  </button>
                </div>
              </div>
            );
          })}
        </InfiniteScroll>

      </div>
    </>
  );
}