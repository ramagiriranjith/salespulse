import React from "react";
import { iconStroke } from "../config/config";
import { Link, useLocation } from "react-router-dom";
import { clsx } from "clsx";
import {
  IconArmchair2,
  IconBook,
  IconCreditCard,
  IconDevices,
  IconInfoSquareRounded,
  IconLifebuoy,
  IconPrinter,
  IconReceiptTax,
} from "@tabler/icons-react";
export default function HRMNavbar() {
  const { pathname } = useLocation();

  const items = [
    {
      icon: <i className="fa-solid fa-user text-md ml-1 pr-1 "></i>,
      text: "Employee",
      path: "/dashboard/HRM/employee-list",
    },
    {
      icon: <IconLifebuoy stroke={iconStroke} />,
      text: "Feedback",
      path: "/dashboard/HRM/employee-feedback",
    }
  ];

  return (
    <div className="w-20 md:w-60 h-screen overflow-y-auto border-r md:px-4 py-3 flex items-center flex-col gap-1 md:gap-3">
      {items.map((item, index) => {
        return (
          <Link to={item.path} key={index} className={clsx("w-12 h-12 md:w-full md:h-auto md:min-w-fit flex items-center justify-center md:justify-normal gap-1 md:px-4 md:py-3 rounded-full transition hover:bg-salespos-border-green-light text-salespos-green-dark", {
            "bg-salespos-border-green-light font-medium": item.path == pathname,
          })}>
            {item.icon}
            <p className="hidden md:block">{item.text}</p>
          </Link>
        );
      })}
    </div>
  );
}
