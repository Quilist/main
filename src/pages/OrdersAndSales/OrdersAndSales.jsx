import * as React from "react";
import { useNavigate } from 'react-router-dom'

import API from '@/api/api';

import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import {useDocumentTitle} from "@/hooks/useDocumentTitle";

export default function EnhancedTable() {
  const [items, setItems] = React.useState([])
  const navigate = useNavigate()
  const api = new API();

  useDocumentTitle("Заказы и продажи");

  const typeOptions = {
    sale: 'Продажа',
    order: 'Заказ'
  };

  React.useEffect(() => {
    const queryParams = { type: 'sell' }
    api.all('buySell', queryParams).then(data => {
      if (data.status === "error") alert(data.message)
      else setItems(data.message.items)
    })
    // eslint-disable-next-line
  }, [])


  const fetchMoreData = () => {
    console.log('ok')
    // if (staticList.items.length >= 500) {
    //   setStaticList({ hasMore: false });
    //   return;
    // }
    //
    // setTimeout(() => {
    //   setStaticList({
    //     items: staticList.items.concat(Array.from({ length: 20 }))
    //   });
    // }, 1500);

  };

  const goToEdit = (item) => {
    //(item.type == 'sell') {
      navigate(`/sell/${item.id}`)
    //}
  };

  const tableHeader = [
    {
      name: "Номер"
    },
    {
      name: "Дата"
    },
    {
      name: "Вид документа"
    },
    {
      name: "Покупатель"
    },
    {
      name: "Склад"
    },
    {
      name: "Сумма"
    },
    {
      name: "Заметки"
    }
  ];

  const getType = (type) => {
    return typeOptions[type];
  };

  const formattedDate = (milliseconds) => {
    const date = new Date(+milliseconds);
    const formatDate = date.toISOString().split('T')[0]
    return formatDate;
  };

  return (
    <>
      <section className="home-section">
        <div className="wrapper" >
          <div className="wrapper__filters">
            <a href="#!" className="wrapper__filter">
              <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="0.941177" width="5.64706" height="0.941176" rx="0.470588" fill="#7096FF" />
                <rect x="16" y="6.58824" width="5.64706" height="0.941176" rx="0.470588"
                      transform="rotate(-180 16 6.58824)" fill="#7096FF" />
                <rect y="10.353" width="5.64706" height="0.941176" rx="0.470588" fill="#7096FF" />
                <rect x="7.52942" y="0.941177" width="8.47059" height="0.941176" rx="0.470588" fill="#7096FF" />
                <rect x="8.47058" y="6.58824" width="8.47059" height="0.941176" rx="0.470588"
                      transform="rotate(-180 8.47058 6.58824)" fill="#7096FF" />
                <rect x="7.52942" y="10.353" width="8.47059" height="0.941176" rx="0.470588" fill="#7096FF" />
                <circle cx="5.17645" cy="1.41176" r="1.16176" fill="white" stroke="#7096FF" stroke-width="0.5" />
                <circle cx="10.8235" cy="6.11765" r="1.16176" transform="rotate(-180 10.8235 6.11765)" fill="white"
                        stroke="#7096FF" stroke-width="0.5" />
                <circle cx="5.17645" cy="10.8235" r="1.16176" fill="white" stroke="#7096FF" stroke-width="0.5" />
              </svg>
              Фильтр
            </a>
          </div>

          <div className="table">
            <div className="table__head">
              {tableHeader.map((th) => {
                return (
                  <p>{th.name}</p>
                );
              })}
            </div>

            <InfiniteScroll
              dataLength={items.length}
              next={fetchMoreData}
              hasMore={true}
              loader={<h4></h4>}
              height={600}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  { items.paginations && <b>Всего записей: {items.paginations.total}</b> }
                </p>
              }
            >
              {items.map((item, index) => {
                return (
                  <div className="table__item"
                       onClick={() => {
                         goToEdit(item)
                       }}
                  >
                    <div className="table__figure">

                    </div>
                    <div className="table__mob">
                      <p>
                        {item.client.name}
                      </p>
                      <p>
                        {item.storehouse.name}
                      </p>
                    </div>
                    <div className="table__mob table__summury">
                      <p>
                        {item.sum} {item.currency.name}
                      </p>
                    </div>
                    <div className="table__data">
                      <p>
                        {item.number}
                      </p>
                    </div>
                    <div className="table__paysend">
                      <p>
                        {formattedDate(item.created_at)}
                      </p>
                    </div>
                    <div className="table__paysend">
                      <p>
                        {getType(item.status)}
                      </p>
                    </div>
                    <div className="table__paysend">
                      <p>
                        {item.client.name}
                      </p>
                    </div>
                    <div className="table__paysend">
                      <p>
                        {item.storehouse.name}
                      </p>
                    </div>
                    <div className="table__paysend">
                      <p>
                        {item.sum} {item.currency.name}
                      </p>
                    </div>
                    <div className="table__paysend">
                      <p>
                        {item.note}
                      </p>
                    </div>
                  </div>
                );
              })}
            </InfiniteScroll>

          </div>

        </div>


      </section>


    </>
  );
}