import { IoIosArrowDown } from 'react-icons/io'
import { MdAccountBalance, MdDashboardCustomize, MdDoubleArrow, MdInventory } from "react-icons/md";
import { HiMiniUsers } from "react-icons/hi2";
import { TbReportSearch } from "react-icons/tb";
import { GrTransaction } from "react-icons/gr";
import { IoSettings } from "react-icons/io5";
import { GrDashboard } from 'react-icons/gr'
import logo from "../../assets/dashboard.png"
import { NavLink, useLocation } from 'react-router-dom'
import "./Style.css"


const Sidebar = () => {
  const URL = useLocation()

  return (
    <div className="sidebar">
      <div className="offcanvas offcanvas-start offcanvas_sidebar" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <NavLink to={"/"} className="d-flex align-items-center gap-2">
            <img src={logo} className='dashboard_logo_img' alt="logo" />
            <span className='dashboard_logo_text'>Inventory</span>
          </NavLink>
          <button type="button" className="btn-close offcanvas_close_btn" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="dropdown_item pb-5">

            <li className="dropdown_list">
              <NavLink to={"/"} className="dropdown_btn">
                <span className="dropdown_list_name"><MdDashboardCustomize className="dropdown_list_icon" />Dashboard</span>
              </NavLink>
            </li>

            <li className="dropdown_list">
              <NavLink to={"/users/table"} className="dropdown_btn">
                <span className="dropdown_list_name"><HiMiniUsers className="dropdown_list_icon" />Users</span>
              </NavLink>
            </li>

            <div className="accordion accordion-flush" id="accordionFlushExample">

              <li className="dropdown_list">
                <button className="dropdown_btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapsePaymenta" aria-expanded="false" aria-controls="flush-collapsePaymenta">
                  <span className="dropdown_list_name">
                    <MdAccountBalance className="dropdown_list_icon" />Accounts</span>
                  <IoIosArrowDown className="dropdown_icon" />
                </button>

                <div id="flush-collapsePaymenta" className={URL.pathname === "#" || URL.pathname === "#" || URL.pathname === "#" ? `accordion-collapse collapse show` : `accordion-collapse collapse hide`} aria-labelledby="flush-headingPaymenta" data-bs-parent="#accordionFlushExample">
                  <NavLink to={"#"} className="dropdown_link"><MdDoubleArrow />Chart of Accounts</NavLink>
                  <NavLink to={"#"} className="dropdown_link"><MdDoubleArrow />Account Statement</NavLink>
                </div>
              </li>

              <li className="dropdown_list">
                <button className="dropdown_btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseUser" aria-expanded="false" aria-controls="flush-collapseUser">
                  <span className="dropdown_list_name">
                    <GrDashboard className="dropdown_list_icon" />Users</span>
                  <IoIosArrowDown className="dropdown_icon" />
                </button>

                <div id="flush-collapseUser" className={URL.pathname === "#" || URL.pathname === "#" || URL.pathname === "#" ? `accordion-collapse collapse show` : `accordion-collapse collapse hide`} aria-labelledby="flush-headingUser" data-bs-parent="#accordionFlushExample">

                  <NavLink to={"#"} className="dropdown_link"><MdDoubleArrow />All User</NavLink>
                  <NavLink to={"#"} className="dropdown_link"><MdDoubleArrow />Sales Person List</NavLink>
                  <NavLink to={"#"} className="dropdown_link"><MdDoubleArrow />Suppliers</NavLink>
                  <NavLink to={"#"} className="dropdown_link"><MdDoubleArrow />Area Manager</NavLink>
                </div>
              </li>

              <li className="dropdown_list">
                <button className="dropdown_btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseInventory" aria-expanded="false" aria-controls="flush-collapseInventory">
                  <span className="dropdown_list_name">
                    <MdInventory className="dropdown_list_icon" />Inventory</span>
                  <IoIosArrowDown className="dropdown_icon" />
                </button>

                <div id="flush-collapseInventory" className={URL.pathname === "#" || URL.pathname === "#" || URL.pathname === "#" ? `accordion-collapse collapse show` : `accordion-collapse collapse hide`} aria-labelledby="flush-headingInventory" data-bs-parent="#accordionFlushExample">
                  <NavLink to={"#"} className="dropdown_link"><MdDoubleArrow />Raw item</NavLink>
                  <NavLink to={"#"} className="dropdown_link"><MdDoubleArrow />Product</NavLink>
                  <NavLink to={"#"} className="dropdown_link"><MdDoubleArrow />Pack size</NavLink>
                  <NavLink to={"#"} className="dropdown_link"><MdDoubleArrow />Stock Adjustment</NavLink>
                </div>
              </li>

              <li className="dropdown_list">
                <button className="dropdown_btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseInvoice" aria-expanded="false" aria-controls="flush-collapseInvoice">
                  <span className="dropdown_list_name">
                    <GrDashboard className="dropdown_list_icon" />Sales</span>
                  <IoIosArrowDown className="dropdown_icon" />
                </button>

                <div id="flush-collapseInvoice" className={URL.pathname === "#" || URL.pathname === "#" || URL.pathname === "#" ? `accordion-collapse collapse show` : `accordion-collapse collapse hide`} aria-labelledby="flush-headingInvoice" data-bs-parent="#accordionFlushExample">

                  <NavLink to={"#"} className="dropdown_link"><MdDoubleArrow />Invoice</NavLink>
                  <NavLink to={"#"} className="dropdown_link"><MdDoubleArrow />Return</NavLink>
                  <NavLink to={"#"} className="dropdown_link"><MdDoubleArrow />Refund</NavLink>
                  <NavLink to={"#"} className="dropdown_link"><MdDoubleArrow />Sample</NavLink>
                </div>
              </li>

              <li className="dropdown_list">
                <button className="dropdown_btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapsePayment2" aria-expanded="false" aria-controls="flush-collapsePayment2">
                  <span className="dropdown_list_name">
                    <GrTransaction className="dropdown_list_icon" />Transaction</span>
                  <IoIosArrowDown className="dropdown_icon" />
                </button>

                <div id="flush-collapsePayment2" className={URL.pathname === "#" || URL.pathname === "#" || URL.pathname === "#" ? `accordion-collapse collapse show` : `accordion-collapse collapse hide`} aria-labelledby="flush-headingPayment2" data-bs-parent="#accordionFlushExample">
                  <NavLink to={"#"} className="dropdown_link"><MdDoubleArrow />Pay to supplier</NavLink>
                  <NavLink to={"#"} className="dropdown_link"><MdDoubleArrow />Receive</NavLink>
                  <NavLink to={"#"} className="dropdown_link"><MdDoubleArrow />Transfer</NavLink>
                </div>
              </li>

              <li className="dropdown_list">
                <button className="dropdown_btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseReports" aria-expanded="false" aria-controls="flush-collapseReports">
                  <span className="dropdown_list_name">
                    <TbReportSearch className="dropdown_list_icon" />Reports</span>
                  <IoIosArrowDown className="dropdown_icon" />
                </button>

                <div id="flush-collapseReports" className={URL.pathname === "#" || URL.pathname === "#" || URL.pathname === "#" ? `accordion-collapse collapse show` : `accordion-collapse collapse hide`} aria-labelledby="flush-headingReports" data-bs-parent="#accordionFlushExample">

                  <NavLink to={"#"} className="dropdown_link"><MdDoubleArrow />Sales Reports</NavLink>
                  <NavLink to={"#"} className="dropdown_link"><MdDoubleArrow />Transfer Reports</NavLink>
                  <NavLink to={"#"} className="dropdown_link"><MdDoubleArrow />Expense Reports</NavLink>
                  <NavLink to={"#"} className="dropdown_link"><MdDoubleArrow />Return Reports</NavLink>
                  <NavLink to={"#"} className="dropdown_link"><MdDoubleArrow />Refund Reports</NavLink>
                  <NavLink to={"#"} className="dropdown_link"><MdDoubleArrow />Receive Reports</NavLink>
                  <NavLink to={"#"} className="dropdown_link"><MdDoubleArrow />Purchase Reports</NavLink>
                </div>
              </li>

              <li className="dropdown_list">
                <NavLink to={"#"} className="dropdown_btn">
                  <span className="dropdown_list_name">
                    <GrDashboard className="dropdown_list_icon" />Expense</span>
                </NavLink>
              </li>

              <li className="dropdown_list">
                <NavLink to={"#"} className="dropdown_btn">
                  <span className="dropdown_list_name">
                    <GrDashboard className="dropdown_list_icon" />Purchase</span>
                </NavLink>
              </li>

              <li className="dropdown_list">
                <NavLink to={"#"} className="dropdown_btn">
                  <span className="dropdown_list_name">
                    <GrDashboard className="dropdown_list_icon" />Work Order</span>
                </NavLink>
              </li>

              <li className="dropdown_list">
                <NavLink to={"#"} className="dropdown_btn">
                  <span className="dropdown_list_name">
                    <IoSettings className="dropdown_list_icon" />Settings</span>
                </NavLink>
              </li>

            </div>
          </ul>
        </div>
      </div >
    </div >
  )
}

export default Sidebar