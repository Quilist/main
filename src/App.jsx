

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Landing layouts
import Landing from '@/pages/Landing/Landing';

//Auth layouts
import Auth from '@/pages/Auth/Auth';
import AuthPasswordRecovery from '@/pages/Auth/AuthPasswordRecovery';

//App layouts
import Dashboard from '@/pages/Dashboard/Dashboard';
import Clients from '@/pages/Clients/Clients';

import AllMoves from '@/pages/AllMoves/AllMoves';
import OrdersAndSales from '@/pages/OrdersAndSales/OrdersAndSales';
import Money from '@/pages/Money/MoneyNew';
import PurchasesAndStorage from '@/pages/PurchasesAndStorage/PurchasesAndStorage';
import Reports from '@/pages/Reports/Reports';
import Cost from '@/pages/Reports/linksOfReports/Costs';
import Debt from '@/pages/Reports/linksOfReports/Debts';
import FinancialResult from '@/pages/Reports/linksOfReports/FinancialResult';
import PurchaseAndReceipt from '@/pages/Reports/linksOfReports/PurchasesAndReceipts';
import ReportMoney from '@/pages/Reports/linksOfReports/ReportMoney';
import SaleAndOrder from '@/pages/Reports/linksOfReports/SalesAndOrders';
import History from '@/pages/History/History';
import Settings from '@/pages/Settings/Settings';
import Accept from '@/pages/pagesOfHeader/PageAccept';
import Buy from '@/pages/pagesOfHeader/buy/Buy';
import BuyCreate from '@/pages/pagesOfHeader/buy/BuyCreate';
import Inventory from '@/pages/pagesOfHeader/PageInventory';
import Retrieve from '@/pages/pagesOfHeader/PageRetrieve';
import LegalEntityEditing from '@/pages/Directory/LegalEntity/Edit/LegalEntitesEditing'

import Sell from '@/pages/pagesOfHeader/sell/PageSell';
import PolitikaKonfidentsialnostiFacebook from '@/pages/Low/PagePolitikaKonfidentsialnostiFacebook'
import InstructionsForDeletingUserData from '@/pages/Low/InstructionsForDeletingUserData';

import Product from '@/pages/Product/Product';
import ProductHandle from '@/pages/Product/ProductHandle';
import ProductMoving from '@/pages/Product/Moving/Moving';
import ProductWriteOff from '@/pages/Product/WriteOff/WriteOff';
import ProductPosting from '@/pages/Product/Posting/Posting';

import ImportOfGoods from '@/pages/Product/Import/Import';
import Revaluation from '@/pages/Product/Revaluation';
import SavePriceList from '@/pages/Product/SavePriceList';

import ReturnSell from '@/pages/pagesOfHeader/sell/PageSellReturn';
import ReturnBuy from '@/pages/pagesOfHeader/buy/BuyCreateReturn';

//Производство
import Manufacture from '@/pages/Manufacture/Manufacture';
import ManufactureHandle from '@/pages/Manufacture/ManufactureHandle';

// справочник
import DirectoryCategory from '@/pages/Directory/DirectoryCategory/DirectoryCategory'
import LegalEntity from '@/pages/Directory/LegalEntity/LegalEntity'
import CashAndAccount from '@/pages/Directory/CashAndAccount/CashAndAccount';
import Employee from '@/pages/Directory/Employee/Employee'
import Measure from '@/pages/Directory/Measure/Measure'
import Storehouse from '@/pages/Directory/Storehouse/Storehouse'
import Supplier from '@/pages/Directory/Supplier/Supplier'
import TypePrice from '@/pages/Directory/TypePrice/TypePrice'
import BanksDetail from '@/pages/Directory/BankDetail/BankDetail'
import BankDetailCreate from '@/pages/Directory/BankDetail/BankDetailCreate'
import BankDetailEdit from '@/pages/Directory/BankDetail/BankDetailEdit'
import IncomeItem from '@/pages/Directory/IncomeItem/IncomeItem'
import Expenditure from '@/pages/Directory/Expenditure/Expenditure'
import ProductGroup from "@/pages/Directory/ProductGroup/ProductGroup";

import EmployeesEditing from '@/pages/Directory/Employee/Edit/EmployeeEditing';

import Currency from '@/pages/Directory/Currency/Currency'
import CurrencyExchange from '@/pages/Directory/CurrencyExchange/CurrencyExchange'

import Pay from "@/pages/Pay/Pay";


import Invoice from '@/pages/Invoice/Invoice';
import Order from '@/pages/Order/Order';
import ImportClient from '@/pages/Clients/ImportClients';
import UserEditing from '@/pages/Clients/Edit/UserEditing';
import SupplierEditing from '@/pages/Directory/Supplier/Edit/SupplierEditing'

import { UserIdProvider } from './providers/UserIdProvider';
import { EmployeeIdProvider } from './providers/EmployeeIdProvider';

import Sidebar from "@/components/layout/Sidebar/Sidebar";

const AppLayout = ({ component }) => {
  return (
    <>
      <Sidebar />
      {component}
    </>
  )
}

const LandingLayout = ({ component }) => {
  return (
    <>
      {component}
    </>
  )
}


const AuthLayout = ({ component }) => {
  return (
    <>
      {component}
    </>
  )
}

function App() {

  return (
    <UserIdProvider>
      <EmployeeIdProvider>

        <Router>
          <Routes>
            {/* Лендинг для рекламы */}
            <Route path="/" element={<> <LandingLayout component={<Landing />} /> </>} />

            {/* Аутентификация */}
            <Route path="/registration" element={<> <AuthLayout component={<Auth />} /> </>} />
            <Route path="/password-recovery" element={<> <AuthLayout component={<AuthPasswordRecovery />} /> </>} />

            {/* Страницы категорий меню */}\
            <Route path="/dashboard" element={<> <AppLayout component={<Dashboard />} /> </>} />
            <Route path="/allMoves" element={<> <AppLayout component={<AllMoves />} /> </>} />

            <Route path="/clients" element={<> <AppLayout component={<Clients />} /> </>} />
            <Route path="/ordersAndSales" element={<> <AppLayout component={<OrdersAndSales />} /> </>} />
            <Route path="/reports" element={<> <AppLayout component={<Reports />} /> </>} />
            <Route path="/money" element={<> <AppLayout component={<Money />} /> </>} />

            <Route path="/purchasesAndStorage" element={<> <AppLayout component={<PurchasesAndStorage />} /> </>} />
            <Route path="/history" element={<> <AppLayout component={<History />} /> </>} />
            <Route path="/settings" element={<> <AppLayout component={<Settings />} /> </>} />
            <Route path="/directory" element={<> <AppLayout component={<DirectoryCategory />} /> </>} />

            {/*Обработка товаров и услуг*/}
            <Route path="/products" element={<> <AppLayout component={<Product />} /> </>} />
            <Route path="/products/create" element={<> <AppLayout component={<ProductHandle />} /> </>} />
            <Route path="/products/:id" element={<> <AppLayout component={<ProductHandle />} /> </>} />
            <Route path="/revaluation" element={<> <AppLayout component={<Revaluation />} /> </>} />
            <Route path="/products_moving" element={<> <AppLayout component={<ProductMoving />} /> </>} />
            <Route path="/products_moving/:id" element={<> <AppLayout component={<ProductMoving />} /> </>} />
            <Route path="/products_write_off" element={<> <AppLayout component={<ProductWriteOff />} /> </>} />
            <Route path="/products_write_off/:id" element={<> <AppLayout component={<ProductWriteOff />} /> </>} />
            <Route path="/products_posting" element={<> <AppLayout component={<ProductPosting />} /> </>} />
            <Route path="/products_posting/:id" element={<> <AppLayout component={<ProductPosting />} /> </>} />
            <Route path="/import_products" element={<> <AppLayout component={<ImportOfGoods />} /> </>} />
            <Route path="/import_products/:id" element={<> <AppLayout component={<ImportOfGoods />} /> </>} />
            <Route path="/save_price_list" element={<> <AppLayout component={<SavePriceList />} /> </>} />

            {/* Отчеты  */}
            <Route path="/costs" element={<> <AppLayout component={<Cost />} /> </>} />
            <Route path="/debts" element={<> <AppLayout component={<Debt />} /> </>} />
            <Route path="/financial-result" element={<> <AppLayout component={<FinancialResult />} /> </>} />
            <Route path="/purchases-and-receipts" element={<> <AppLayout component={<PurchaseAndReceipt />} /> </>} />
            <Route path="/report-money" element={<> <AppLayout component={<ReportMoney />} /> </>} />
            <Route path="/sales-and-orders" element={<> <AppLayout component={<SaleAndOrder />} /> </>} />



            {/* Обработка клиентов */}
            <Route path="/clients/create" element={<> <AppLayout component={<UserEditing />} /> </>} />
            <Route path="/clients/:id" element={<> <AppLayout component={<UserEditing />} /> </>} />
            <Route path="/import_clients" element={<> <AppLayout component={<ImportClient />} /> </>} />

            {/* Обработка поставщиков */}
            <Route path="/suppliers/create" element={<> <AppLayout component={<SupplierEditing />} /> </>} />
            <Route path="/suppliers/:id" element={<> <AppLayout component={<SupplierEditing />} /> </>} />

            {/* Обработка сотрудников  */}
            <Route path="/employees/create" element={<> <AppLayout component={<EmployeesEditing />} /> </>} />
            <Route path="/employees/:id" element={<> <AppLayout component={<EmployeesEditing />} /> </>} />

            {/* Обработка моих юрлиц */}
            <Route path="/editing_legal_entities" element={<> <AppLayout component={<LegalEntityEditing />} /> </>} />
            <Route path="/editing_legal_entities/:id" element={<> <AppLayout component={<LegalEntityEditing />} /> </>} />

            {/* Производство  */}
            <Route path="/manufacture" element={<> <AppLayout component={<Manufacture />} /> </>} />
            <Route path="/manufacture/create" element={<> <AppLayout component={<ManufactureHandle />} /> </>} />
            <Route path="/manufacture/:id" element={<> <AppLayout component={<ManufactureHandle />} /> </>} />


            {/* Действия  */}
            <Route path="/accept" element={<> <AppLayout component={<Accept />} /> </>} />
            <Route path="/buy" element={<> <AppLayout component={<BuyCreate />} /> </>} />
            <Route path="/buy/:id" element={<> <AppLayout component={<BuyCreate />} /> </>} />
            <Route path="/buy/create" element={<> <AppLayout component={<BuyCreate />} /> </>} />
            <Route path="/inventory" element={<> <AppLayout component={<Inventory />} /> </>} />
            <Route path="/pay" element={<> <AppLayout component={<Pay />} /> </>} />
            <Route path="/retrieve" element={<> <AppLayout component={<Retrieve />} /> </>} />
            <Route path="/sell" element={<> <AppLayout component={<Sell />} /> </>} />
            <Route path="/sell/:id" element={<> <AppLayout component={<Sell />} /> </>} />
            <Route path="/invoice" element={<> <AppLayout component={<Invoice />} /> </>} />
            <Route path="/order" element={<> <AppLayout component={<Order />} /> </>} />

            {/* Оплата  */}
            <Route path="/pay_supplier" element={<> <AppLayout component={<Pay />} /> </>} />
            <Route path="/pay_customer" element={<> <AppLayout component={<Pay />} /> </>} />
            <Route path="/pay_expend" element={<> <AppLayout component={<Pay />} /> </>} />
            <Route path="/pay_salary" element={<> <AppLayout component={<Pay />} /> </>} />
            <Route path="/pay_owner" element={<> <AppLayout component={<Pay />} /> </>} />
            <Route path="/pay_supplier/:id" element={<> <AppLayout component={<Pay />} /> </>} />
            <Route path="/pay_customer/:id" element={<> <AppLayout component={<Pay />} /> </>} />
            <Route path="/pay_expend/:id" element={<> <AppLayout component={<Pay />} /> </>} />
            <Route path="/pay_salary/:id" element={<> <AppLayout component={<Pay />} /> </>} />
            <Route path="/pay_owner/:id" element={<> <AppLayout component={<Pay />} /> </>} />

            <Route path="/receive_customer" element={<> <AppLayout component={<Pay />} /> </>} />
            <Route path="/receive_supplier" element={<> <AppLayout component={<Pay />} /> </>} />
            <Route path="/receive_income" element={<> <AppLayout component={<Pay />} /> </>} />
            <Route path="/receive_owner" element={<> <AppLayout component={<Pay />} /> </>} />
            <Route path="/receive_balance" element={<> <AppLayout component={<Pay />} /> </>} />
            <Route path="/receive_customer/:id" element={<> <AppLayout component={<Pay />} /> </>} />
            <Route path="/receive_supplier/:id" element={<> <AppLayout component={<Pay />} /> </>} />
            <Route path="/receive_income/:id" element={<> <AppLayout component={<Pay />} /> </>} />
            <Route path="/receive_owner/:id" element={<> <AppLayout component={<Pay />} /> </>} />
            <Route path="/receive_balance/:id" element={<> <AppLayout component={<Pay />} /> </>} />

            {/* Справочник  */}
            <Route path="/cash_accounts" element={<> <AppLayout component={<CashAndAccount />} /> </>} />
            <Route path="/banks_details" element={<> <AppLayout component={<BanksDetail />} /> </>} />
            <Route path="/banks_details/create" element={<> <AppLayout component={<BankDetailCreate />} /> </>} />
            <Route path="/banks_details/:id" element={<> <AppLayout component={<BankDetailEdit />} /> </>} />
            <Route path="/legal_entities" element={<> <AppLayout component={<LegalEntity />} /> </>} />
            <Route path="/storehouse" element={<> <AppLayout component={<Storehouse />} /> </>} />
            <Route path="/suppliers" element={<> <AppLayout component={<Supplier />} /> </>} />
            <Route path="/employees" element={<> <AppLayout component={<Employee />} /> </>} />
            <Route path="/measure" element={<> <AppLayout component={<Measure />} /> </>} />
            <Route path="/income_items" element={<> <AppLayout component={<IncomeItem />} /> </>} />
            <Route path="/expenditure" element={<> <AppLayout component={<Expenditure />} /> </>} />
            <Route path="/currency" element={<> <AppLayout component={<Currency />} /> </>} />
            <Route path="/currency_exchange" element={<> <AppLayout component={<CurrencyExchange />} /> </>} />
            <Route path="/type_price" element={<> <AppLayout component={<TypePrice />} /> </>} />
            <Route path="/products_groups" element={<> <AppLayout component={<ProductGroup />} /> </>} />

            {/* Политика безопасности */}
            <Route path="/politika_konfidentsialnosti_dlya_facebook_com" element={<> <AppLayout component={<PolitikaKonfidentsialnostiFacebook />} /> </>} />
            <Route path="/instructions-for-deleting-user-data" element={<> <AppLayout component={<InstructionsForDeletingUserData />} /> </>} />

            {/* Возврат */}
            <Route path="/return/sell" element={<> <AppLayout component={<ReturnSell />} /> </>} />
            <Route path="/return/sell/:id" element={<> <AppLayout component={<ReturnSell />} /> </>} />
            <Route path="/return/buy" element={<> <AppLayout component={<ReturnBuy />} /> </>} />
            <Route path="/return/buy/:id" element={<> <AppLayout component={<ReturnBuy />} /> </>} />

          </Routes>
        </Router>

      </EmployeeIdProvider>
    </UserIdProvider>
  );
}
export default App;
