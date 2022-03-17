import FormAuth from './form-auth/FormAuth';
import Landing from './landing/Landing';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageClients from './pages/PageClients';
import PageDashboard from './pages/PageDashboard';
import PageAllMoves from './pages/PageAllMoves';
import PageProductsAndServices from './pages/PageProductsAndServices';
import PageOrdersAndSales from './pages/PageOrdersAndSales';
import PageMoney from './pages/PageMoney';
import PagePurchasesAndStorage from './pages/PagePurchasesAndStorage';
import PageReports from './pages/PageReports';
import PageCosts from './pages/pagesOfReports/PageCosts';
import PageDebts from './pages/pagesOfReports/PageDebts';
import PageFinancialResult from './pages/pagesOfReports/PageFinancialResult';
import PageIncome from './pages/pagesOfReports/PageIncome';
import PagePriceList from './pages/pagesOfReports/PagePriceList';
import PageProducts from './pages/pagesOfReports/PageProducts';
import PagePurchasesAndReceipts from './pages/pagesOfReports/PagePurchasesAndReceipts';
import PageReconciliationActs from './pages/pagesOfReports/PageReconciliationActs';
import PageReportMoney from './pages/pagesOfReports/PageReportMoney';
import PageSalesAndOrders from './pages/pagesOfReports/PageSalesAndOrders';
import PageHistory from './pages/PageHistory';
import PageSettings from './pages/PageSettings';
import PageAccept from './pages/pagesOfHeader/PageAccept';
import PageBuy from './pages/pagesOfHeader/PageBuy';
import PageInventory from './pages/pagesOfHeader/PageInventory';
import PagePay from './pages/pagesOfHeader/PagePay';
import PageRetrieve from './pages/pagesOfHeader/PageRetrieve';
import PageLegalEntitesEditing from './pages/directory/PageLegalEntitesEditing'

import PageSell from './pages/pagesOfHeader/PageSell';
import PagePolitikaKonfidentsialnostiFacebook from './pages/low/PagePolitikaKonfidentsialnostiFacebook'
import InstructionsForDeletingUserData from './pages/low/InstructionsForDeletingUserData';



import PageAddProduct from './pages/pagesProductsEditing/PageAddProduct';
import PageImportOfGoods from './pages/pagesProductsEditing/PageImportOfGoods';
import PageRevaluation from './pages/pagesProductsEditing/PageRevaluation';
import PageSavePriceList from './pages/pagesProductsEditing/PageSavePriceList';

// справочник
import PageDirectory from './pages/directory/PageDirectory'
import PageLegalEntities from './pages/directory/PageLegalEntities'
import PageСashAndAccounts from './pages/directory/PageСashAndAccounts';
import PageEmployees from './pages/directory/PageEmployees'
import PageMeasure from './pages/directory/PageMeasure'
import PageStorehouse from './pages/directory/PageStorehouse'
import PageSuppliers from './pages/directory/PageSuppliers'
import PageTypePrice from './pages/directory/PageTypePrice'
import PageBanksDetails from './pages/directory/PageBanksDetails'
import PageBankDetailCreate from './directory-components/directory/BankDetail/BankDetailCreate'
import PageBankDetailEdit from './directory-components/directory/BankDetail/BankDetailEdit'
import PageIncomeItems from './pages/directory/PageIncomeItems'
import PageExpenditure from './pages/directory/PageExpenditure'


import PageEmployeesEditing from './pages/directory/PageEmployeesEditing';

import PageСurrencies from './pages/directory/PageСurrencies'

import Pay from "./pages/Pay/Pay";


import PageInvoice from './pages/PageInvoice';
import PageOrder from './pages/PageOrder';
import PageImportClients from './pages/PageImportClients';
import PageUserEditing from './pages/PageUserEditing';
import PageSupplierEditing from './pages/directory/PageSupplierEditing'
import './App.css';
import FormpPasswordRecovery from './form-auth/FormpPasswordRecovery';

import { UserIdProvider } from './providers/UserIdProvider';
import { EmployeeIdProvider } from './providers/EmployeeIdProvider';


function App() {

  return (
    <UserIdProvider>
      <EmployeeIdProvider>
        <div>
          <Router>
            <Routes>
              {/* Лендинг для рекламы */}
              <Route path="/" element={<Landing />} />

              {/* Страницы категорий меню */}
              <Route path="/dashboard" element={<PageDashboard />} />
              <Route path="/allMoves" element={<PageAllMoves />} />
              <Route path="/productsAndService" element={<PageProductsAndServices />} />
              <Route path="/clients" element={<PageClients />} />
              <Route path="/ordersAndSales" element={<PageOrdersAndSales />} />
              <Route path="/reports" element={<PageReports />} />
              <Route path="/money" element={<PageMoney />} />
              <Route path="/purchasesAndStorage" element={<PagePurchasesAndStorage />} />
              <Route path="/reports" element={<PageReports />} />
              <Route path="/history" element={<PageHistory />} />
              <Route path="/settings" element={<PageSettings />} />
              <Route path="/directory" element={<PageDirectory />} />

              {/* Регистрация */}
              <Route path="/registration" element={<FormAuth />} />
              <Route path="/password-recovery" element={<FormpPasswordRecovery />} />


              {/* Отчеты  */}
              <Route path="/costs" element={<PageCosts />} />
              <Route path="/debts" element={<PageDebts />} />
              <Route path="/financial-result" element={<PageFinancialResult />} />
              <Route path="/income" element={<PageIncome />} />
              <Route path="/price-list" element={<PagePriceList />} />
              <Route path="/products" element={<PageProducts />} />
              <Route path="/purchases-and-receipts" element={<PagePurchasesAndReceipts />} />
              <Route path="/reconciliation-acts" element={<PageReconciliationActs />} />
              <Route path="/report-money" element={<PageReportMoney />} />
              <Route path="/sales-and-orders" element={<PageSalesAndOrders />} />

              {/*Обработка товаров и услуг*/}
              <Route path="/add_product" element={<PageAddProduct />} />
              <Route path="/revaluation" element={<PageRevaluation />} />
              <Route path="/import_products" element={<PageImportOfGoods />} />
              <Route path="/save_price_list" element={<PageSavePriceList />} />

              {/* Обработка клиентов */}
              <Route path="/editing" element={<PageUserEditing />} />
              <Route path="/import_clients" element={<PageImportClients />} />

              {/* Обработка поставщиков */}
              <Route path="/editing_supplier" element={<PageSupplierEditing />} />

              {/* Обработка сотрудников  */}
              <Route path="/employees_editing" element={<PageEmployeesEditing />} />

              {/* Обработка моих юрлиц */}
              <Route path="/editing_legal_entities" element={<PageLegalEntitesEditing />} />




              {/* Действия  */}
              <Route path="/accept" element={<PageAccept />} />
              <Route path="/buy" element={<PageBuy />} />
              <Route path="/inventory" element={<PageInventory />} />
              <Route path="/pay" element={<PagePay />} />
              <Route path="/retrieve" element={<PageRetrieve />} />
              <Route path="/sell" element={<PageSell />} />
              <Route path="/invoice" element={<PageInvoice />} />
              <Route path="/order" element={<PageOrder />} />

              {/* Оплата  */}
              <Route path="/pay_supplier" element={<Pay />} />
              <Route path="/pay_customer" element={<Pay />} />
              <Route path="/expend" element={<Pay />} />
              <Route path="/salary" element={<Pay />} />
              <Route path="/pay_owner" element={<Pay />} />

              <Route path="/receive_customer" element={<Pay />} />
              <Route path="/receive_supplier" element={<Pay />} />
              <Route path="/receive_income" element={<Pay />} />
              <Route path="/receive_owner" element={<Pay />} />
              <Route path="/receive_balance" element={<Pay />} />

              {/* Справочник  */}
              <Route path="/cash_accounts" element={<PageСashAndAccounts />} />
              <Route path="/banks_details" element={<PageBanksDetails />} />
              <Route path="/banks_details/create" element={<PageBankDetailCreate />} />
              <Route path="/banks_details/:id" element={<PageBankDetailEdit />} />
              <Route path="/legal_entities" element={<PageLegalEntities />} />
              <Route path="/storehouse" element={<PageStorehouse />} />
              <Route path="/suppliers" element={<PageSuppliers />} />
              <Route path="/employees" element={<PageEmployees />} />
              <Route path="/measure" element={<PageMeasure />} />
              <Route path="/income_items" element={<PageIncomeItems />} />
              <Route path="/expenditure" element={<PageExpenditure />} />
              <Route path="/currencies" element={<PageСurrencies />} />
              <Route path="/type_price" element={<PageTypePrice />} />

              {/* Политика безопасности */}
              <Route path="/politika_konfidentsialnosti_dlya_facebook_com" element={<PagePolitikaKonfidentsialnostiFacebook />} />
              <Route path="/instructions-for-deleting-user-data" element={<InstructionsForDeletingUserData />} />


            </Routes>
          </Router>
        </div>
      </EmployeeIdProvider>
    </UserIdProvider>
  );
}
export default App;
