

import * as React from 'react';
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
}));


export default function Reports() {
  useDocumentTitle("Звіти");
  return (
    <section className="home-section">
      <div className="home-content" style={{ marginTop: "15px" }}>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} style={{ marginBottom: "20px" }}>
            <Item style={{ backgroundColor: "#f2f2f2", fontSize: "20px" }}><b>Категорії звітів</b></Item>
          </Grid>
          <Grid item xs={12} sm={4}>
            <a href='/sales-and-orders'> <Item>Продажі та замовлення</Item></a>
          </Grid>
          <Grid item xs={12} sm={4}>
            <a href='/purchases-and-receipts'> <Item>Закупівлі та постачання</Item></a>
          </Grid>
          <Grid item xs={12} sm={4}>
            <a href='/#'> <Item>Залишки товарів</Item></a>
          </Grid>
          <Grid item xs={12} sm={4}>
            <a href='/debts'> <Item>Борги</Item></a>
          </Grid>
          <Grid item xs={12} sm={4}>
            <a href='/report-money'> <Item>Гроші (рух та залишки)</Item></a>
          </Grid>
          <Grid item xs={12} sm={4}>
            <a href='/costs'> <Item>Витрати</Item></a>
          </Grid>
          <Grid item xs={12} sm={12} style={{ marginBottom: "30px" }}>
            <a href='/products_groups'> <Item >Фінансові результати</Item></a>
          </Grid>
        </Grid>
      </div>
    </section >
  );
}
