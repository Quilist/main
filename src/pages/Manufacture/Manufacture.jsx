import * as React from "react";
import { useNavigate } from 'react-router-dom'

import API from '@/api/api';

import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';

import { Link } from "react-router-dom";
import moment from 'moment';
import {useDocumentTitle} from "@/hooks/useDocumentTitle";
import { useSelector } from "react-redux";

export default function Manufacture() {
  // eslint-disable-next-line
  const [items, setItems] = React.useState([])

  const [queryParams, setQueryParams] = useState({ date_from: moment().startOf('day').valueOf(), date_to: moment().endOf('day').valueOf() });
  const navigate = useNavigate()
  const api = new API();

  useDocumentTitle("Производство");

  const [dateState, setDateState] = useState({
    startDate: moment(),
    endDate: moment(),
  });

  const getAll = () => {
    api.all('manufacture', queryParams).then(data => {
      if (data.status === "error") console.log(data.message)
      else setItems(data.message.items)
    })
  };

  const search = useSelector((state) => state);

  React.useEffect(() => {
    searchData(search.searchReducer);
    // eslint-disable-next-line
  }, [search])

  React.useEffect(() => {
    getAll();
    // eslint-disable-next-line
  }, [queryParams])

  const goToCreate = (e) => {
    navigate(`/manufacture/create`)
  }

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
    navigate(`/manufacture/${item.id}`)
  };


  const tableHeader = [
    {
      name: "Номер"
    },
    {
      name: "Дата"
    },
    {
      name: "Изделие"
    },
    {
      name: "Количество"
    },
    {
      name: "Склад"
    },
    {
      name: "Заметки"
    }
  ];

  const formattedDate = (milliseconds) => {
    const date = new Date(+milliseconds);
    const formatDate = date.toISOString().split('T')[0]
    return formatDate;
  };

  const searchData = (search) => {
    if(search) {
      setQueryParams(prevItem => ({
        ...prevItem,
        search: search,
      }));
    } else {
      let state = {...queryParams};
      delete state.search;
      setQueryParams(state);
    }
  };

  const { startDate, endDate } = dateState;
  const handleDateRangePickerCallback = (startDate, endDate) => {
    setQueryParams(prevItem => ({
      ...prevItem,
      date_from: startDate.valueOf(),
      date_to: endDate.valueOf()
    }));
    setDateState({ startDate, endDate });
  };

  const dateRange = startDate.format('MMMM D, YYYY');

  return (
    <>
      <section className="home-section">
        <div className="wrapper" >
          <div className="wrapper__filters">
            <a href="#!" className="wrapper__create" onClick={goToCreate}>
              Создать
            </a>
            <div className="wrapper__mounth">
              <a href="#!">

              </a>
              <DateRangePicker
                initialSettings={{
                  startDate: startDate.toDate(),
                  endDate: endDate.toDate(),
                  ranges: {
                    'Сегодня': [moment().toDate(), moment().toDate()],
                    'Вчера': [
                      moment().subtract(1, 'days').toDate(),
                      moment().subtract(1, 'days').toDate(),
                    ],
                    'Последние 7 Дней': [
                      moment().subtract(6, 'days').toDate(),
                      moment().toDate(),
                    ],
                    'Последние 30 Дней': [
                      moment().subtract(29, 'days').toDate(),
                      moment().toDate(),
                    ],
                    'Текущий месяц': [
                      moment().startOf('month').toDate(),
                      moment().endOf('month').toDate(),
                    ],
                    'Прошлый месяц': [
                      moment().subtract(1, 'month').startOf('month').toDate(),
                      moment().subtract(1, 'month').endOf('month').toDate(),
                    ],
                  },
                }}
                onCallback={handleDateRangePickerCallback}
              >
                <p style={{ cursor: 'pointer'}}>
                  {dateState.startDate.format('MMMM D, YYYY')} - {dateState.endDate.format('MMMM D, YYYY')}
                </p>
              </DateRangePicker>
              <a href="#!">

              </a>
            </div>
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
              loader={<b><i>Нету данных</i></b>}
              height={470}
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
                        {item.id}
                      </p>
                      <p>
                        {item.id}
                      </p>
                    </div>
                    <div className="table__data">
                      <p>
                        {formattedDate(item.created_at)}
                        {item.number && <span>.#.№{item.number}</span> }
                      </p>
                      <p>

                      </p>
                    </div>
                    <div className="table__paysend">
                      <p>
                        {item.id}
                      </p>
                    </div>
                    <div className="table__account">
                      <p>
                        {item.id}
                      </p>
                    </div>
                    <div className="table__counterparty">
                      {item.id}
                    </div>
                    <div className="table__summury">
                      <p>
                        {item.id}
                      </p>
                    </div>
                    <div className="table__comment">
                      {item.note}
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
