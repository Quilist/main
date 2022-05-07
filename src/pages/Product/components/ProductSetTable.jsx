import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import TextField from "@mui/material/TextField";


export default function ProductSetTable({item, setItem, subItem, setSubItem, openColorSizeModal, setColorSizeModal}) {


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
      name: "Ед. Изм."
    },
    {
      name: ""
    }
  ];

  const formatField = (value) => {
    let n;
    let h = parseInt(value);
    if(!isNaN(h)) {
      n = h;
    } else {
      n = value;
    }
    return n;
  };

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

  const updateSetData = (e, index) => {
    const { name, value } = e.target;
    let v = formatField(value);

    const list = [...item.childs];
    list[index][name] = v;
    setItem(prevItem => ({
      ...prevItem,
      childs: list
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
                <div className="table__mob" >
                  {
                    (item.name)
                      ? <p> {item.name} </p>
                      : <p> {item.product_child?.name} </p>
                  }
                </div>
                <div className="table__data" >
                  {
                    (item.name)
                      ? <p> {item.name} </p>
                      : <p> {item.product_child?.name} </p>
                  }
                </div>
                <div className="table__data" >
                  <input type="text"
                         value={item.qnt}
                         className="short-input"
                         name="qnt"
                         onChange={(e) => updateSetData(e, index)}
                  />
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