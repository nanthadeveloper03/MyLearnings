import { useState } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Collapse } from "react-bootstrap";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="side-navbar">
      <ul className="sidebar-menu">
        <li className="active menuitem">
          <Link href="/dashboard">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.33203 9.99967V16.6663H7.91536V11.6663H12.082V16.6663H16.6654V9.99967L9.9987 3.33301L3.33203 9.99967Z"
                fill="#929AA5"
              />
            </svg>
            Dashboard
          </Link>
        </li>

        {/* Account Accordion */}
        <li>
          <div
            onClick={() => setOpenAccount(!openAccount)}
            aria-controls="account-collapse"
            aria-expanded={openAccount}
            className="collapse_menu"
          >
            <span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.332 3.66634C10.332 4.5504 9.98084 5.39824 9.35572 6.02336C8.7306 6.64849 7.88275 6.99967 6.9987 6.99967C6.11464 6.99967 5.2668 6.64849 4.64167 6.02336C4.01655 5.39824 3.66536 4.5504 3.66536 3.66634C3.66536 2.78229 4.01655 1.93444 4.64167 1.30932C5.2668 0.684197 6.11464 0.333008 6.9987 0.333008C7.88275 0.333008 8.7306 0.684197 9.35572 1.30932C9.98084 1.93444 10.332 2.78229 10.332 3.66634ZM3.66536 8.66634C2.78131 8.66634 1.93346 9.01753 1.30834 9.64265C0.683221 10.2678 0.332031 11.1156 0.332031 11.9997V13.6663H13.6654V11.9997C13.6654 11.1156 13.3142 10.2678 12.6891 9.64265C12.0639 9.01753 11.2161 8.66634 10.332 8.66634H3.66536Z"
                  fill="#929AA5"
                />
              </svg>
              Accounts
            </span>
            <span>
              <svg
                width="10"
                height="8"
                viewBox="0 0 10 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.09224 4.14875L8.33391 0.90625L9.80724 2.37958L5.09307 7.09375L3.61974 5.62042L0.378906 2.37958L1.85224 0.90625L5.09307 4.14792L5.09224 4.14875Z"
                  fill="#929AA5"
                />
              </svg>
            </span>
          </div>
          <Collapse in={openAccount}>
            <ul id="account-collapse">
              <li>
                <Link href="/account/profile">Profile</Link>
              </li>
              <li>
                <Link href="/account/settings">Settings</Link>
              </li>
            </ul>
          </Collapse>
        </li>

        <li>
          <div
            onClick={() => setOpenOrders(!openOrders)}
            aria-controls="orders-collapse"
            aria-expanded={openOrders}
            className="collapse_menu"
          >
            <span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_905_17195)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10 7.08366C10 7.85721 9.69271 8.59907 9.14573 9.14605C8.59875 9.69303 7.85688 10.0003 7.08333 10.0003C6.30979 10.0003 5.56792 9.69303 5.02094 9.14605C4.47396 8.59907 4.16667 7.85721 4.16667 7.08366C4.16667 6.31011 4.47396 5.56825 5.02094 5.02126C5.56792 4.47428 6.30979 4.16699 7.08333 4.16699C7.85688 4.16699 8.59875 4.47428 9.14573 5.02126C9.69271 5.56825 10 6.31011 10 7.08366ZM2.5 14.167C2.5 13.504 2.76339 12.8681 3.23223 12.3992C3.70107 11.9304 4.33696 11.667 5 11.667H9.16667C9.82971 11.667 10.4656 11.9304 10.9344 12.3992C11.4033 12.8681 11.6667 13.504 11.6667 14.167V16.667H2.5V14.167ZM17.5 4.16699H13.3333V6.66699H17.5V4.16699ZM17.5 8.33533H13.3333V10.8353H17.5V8.33533ZM13.3333 12.5037H17.5V15.0037H13.3333V12.5037Z"
                    fill="#929AA5"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_905_17195">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Orders
            </span>
            <span>
              <svg
                width="10"
                height="8"
                viewBox="0 0 10 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.09224 4.14875L8.33391 0.90625L9.80724 2.37958L5.09307 7.09375L3.61974 5.62042L0.378906 2.37958L1.85224 0.90625L5.09307 4.14792L5.09224 4.14875Z"
                  fill="#929AA5"
                />
              </svg>
            </span>
          </div>
          <Collapse in={openOrders}>
            <ul id="orders-collapse">
              <li>
                <Link href="/orders/current">Current Orders</Link>
              </li>
              <li>
                <Link href="/orders/history">Order History</Link>
              </li>
            </ul>
          </Collapse>
        </li>

        <li>
          <Link href="/referral">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.16797 7.08366C9.16797 7.85721 8.86068 8.59907 8.3137 9.14605C7.76672 9.69303 7.02485 10.0003 6.2513 10.0003C5.47775 10.0003 4.73589 9.69303 4.18891 9.14605C3.64193 8.59907 3.33464 7.85721 3.33464 7.08366C3.33464 6.31011 3.64193 5.56825 4.18891 5.02126C4.73589 4.47428 5.47775 4.16699 6.2513 4.16699C7.02485 4.16699 7.76672 4.47428 8.3137 5.02126C8.86068 5.56825 9.16797 6.31011 9.16797 7.08366ZM1.66797 14.167C1.66797 13.504 1.93136 12.8681 2.4002 12.3992C2.86904 11.9304 3.50493 11.667 4.16797 11.667H8.33463C8.99768 11.667 9.63356 11.9304 10.1024 12.3992C10.5712 12.8681 10.8346 13.504 10.8346 14.167V16.667H1.66797V14.167ZM13.7513 13.3337V10.8337H11.2513V8.33366H13.7513V5.83366H16.2513V8.33366H18.7513V10.8337H16.2513V13.3337H13.7513Z"
                fill="#929AA5"
              />
            </svg>
            Referral
          </Link>
        </li>
        <li>
          <Link href="/rewards">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.5 4.16699H17.5V7.50033C16.837 7.50033 16.2011 7.76372 15.7322 8.23256C15.2634 8.7014 15 9.33728 15 10.0003C15 10.6634 15.2634 11.2993 15.7322 11.7681C16.2011 12.2369 16.837 12.5003 17.5 12.5003V15.8337H2.5V12.5003C3.16304 12.5003 3.79893 12.2369 4.26777 11.7681C4.73661 11.2993 5 10.6634 5 10.0003C5 9.33728 4.73661 8.7014 4.26777 8.23256C3.79893 7.76372 3.16304 7.50033 2.5 7.50033V4.16699ZM12.9167 6.25033H10.8333V13.7503H12.9167V6.25033Z"
                fill="#929AA5"
              />
            </svg>
            My Rewards
          </Link>
        </li>
        <li>
          <Link href="/settings">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.5 2.5H8.5V4.18917C7.95 4.33083 7.42917 4.54833 6.95167 4.83083L5.75833 3.63583L3.63583 5.75833L4.83083 6.9525C4.54513 7.43584 4.32911 7.95709 4.18917 8.50083H2.5V11.5008H4.18917C4.33083 12.0508 4.54833 12.5717 4.83083 13.0492L3.63583 14.2417L5.7575 16.3633L6.95167 15.1683C7.42917 15.4508 7.94917 15.6683 8.5 15.81V17.5H11.5V15.8108C12.0437 15.6709 12.565 15.4549 13.0483 15.1692L14.2425 16.3642L16.3642 14.2425L15.1692 13.0475C15.4548 12.5644 15.6708 12.0434 15.8108 11.5H17.5V8.5H15.8108C15.6709 7.95626 15.4549 7.43501 15.1692 6.95167L16.3642 5.7575L14.2425 3.63583L13.0475 4.83083C12.5644 4.54513 12.0432 4.32911 11.5 4.18917V2.5ZM10 7.50083C9.33696 7.50083 8.70107 7.76422 8.23223 8.23306C7.76339 8.7019 7.5 9.33779 7.5 10.0008C7.5 10.6638 7.76339 11.2997 8.23223 11.7686C8.70107 12.2374 9.33696 12.5008 10 12.5008C10.663 12.5008 11.2989 12.2374 11.7678 11.7686C12.2366 11.2997 12.5 10.6638 12.5 10.0008C12.5 9.33779 12.2366 8.7019 11.7678 8.23306C11.2989 7.76422 10.663 7.50083 10 7.50083Z"
                fill="#929AA5"
              />
            </svg>
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}
