import * as React from 'react';
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
   padding: theme.spacing(2),
   textAlign: 'center',
}));


export default function DirectoryCategory() {
   useDocumentTitle("Довідник");
   return (
      <section className="home-section">
         <div className="home-content" style={{ marginTop: "15px" }}>

            <Grid container spacing={1}>
               <Grid item xs={12} sm={12} style={{ marginBottom: "20px" }}>
                  <Item style={{ backgroundColor: "#f2f2f2", fontSize: "20px" }}><b>Категорії довідника</b></Item>
               </Grid>
               <Grid item xs={12} sm={4}>
                  <a href='/cash_accounts'> <Item>Рахунки</Item></a>
               </Grid>
               <Grid item xs={12} sm={4}>
                  <a href='/banks_details'> <Item>Банки та реквізити</Item></a>
               </Grid>
               <Grid item xs={12} sm={4}>
                  <a href='/legal_entities'> <Item>Мої юр. особи</Item></a>
               </Grid>
               <Grid item xs={12} sm={4}>
                  <a href='/storehouse'> <Item>Склади</Item></a>
               </Grid>
               <Grid item xs={12} sm={4}>
                  <a href='/suppliers'> <Item>Постачальники</Item></a>
               </Grid>
               <Grid item xs={12} sm={4}>
                  <a href='/employees'> <Item>Співробітники</Item></a>
               </Grid>
               <Grid item xs={12} sm={4}>
                  <a href='/measure'> <Item>Одиниці виміру</Item></a>
               </Grid>
               <Grid item xs={12} sm={4}>
                  <a href='/expenditure'> <Item>Статті витрат</Item></a>
               </Grid>
               <Grid item xs={12} sm={4}>
                  <a href='/income_items'> <Item>Статті доходів</Item></a>
               </Grid>
               <Grid item xs={12} sm={4}>
                  <a href='/currency'> <Item>Валюти</Item></a>
               </Grid>
               <Grid item xs={12} sm={4}>
                  <a href='/currency_exchange'> <Item>Валютні пари</Item></a>
               </Grid>
               <Grid item xs={12} sm={4}>
                  <a href='/type_price'> <Item>Типи цін</Item></a>
               </Grid>
               <Grid item xs={12} sm={12} style={{ marginBottom: "30px" }}>
                  <a href='/products_groups'> <Item >Группи товарів</Item></a>
               </Grid>
            </Grid>
         </div>
      </section >
   );
}
