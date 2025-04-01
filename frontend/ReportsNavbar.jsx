import React, { useState } from "react";
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
    IconLayoutDashboard,
    IconChevronDown,
    IconChevronUp
} from "@tabler/icons-react";
export default function RportsNavbar() {
    const [salesMenuOpen, setSalesMenuOpen] = useState(false);
    const [inventoryMenuOpen, setInventoryMenuOpen] = useState(false);
    const [ceoMenuOpen, setCeoMenuOpen] = useState(false);
    const { pathname } = useLocation();

    const items = [
        /* {
             icon: <IconInfoSquareRounded stroke={iconStroke} />,
             text: "Details",
             path: "/dashboard/reports",
         },*/
        {
            icon: <IconLayoutDashboard stroke={iconStroke} />,
            text: "Sales",
            path: "/dashboard/reports/sales",
            hasSubMenu: true,
            stateSetter: setSalesMenuOpen, 
            state: salesMenuOpen
        },
        {
            icon: <IconLayoutDashboard stroke={iconStroke} />,
            text: "Inventory",
            path: "/dashboard/reports/inventory",
            hasSubMenu: true, 
            stateSetter: setInventoryMenuOpen, 
            state: inventoryMenuOpen
        },
        {
            icon: <IconLayoutDashboard stroke={iconStroke} />,
            text: "CEO",
            path: "/dashboard/reports/ceo",
            hasSubMenu: true, 
            stateSetter: setCeoMenuOpen, 
            state: ceoMenuOpen 
        }
        
    ];
    const salesReports = [
        { 
            text: "Sale Report", 
            path: "/dashboard/reports/sales/sale-report"
         },
        { 
            text: "Item Sale Report", 
            path: "/dashboard/reports/sales/item-sale-report" 
        },
        { 
            text: "Sale Summary Report", 
            path: "/dashboard/reports/sales/sale-summary-report" 
        },
        { 
            text: "Sale Detailed Report", 
            path: "/dashboard/reports/sales/sale-detailed-report" 
        },
    ];
    const inventoryReports = [
        {
            text: "Purchase Report",
            path: "/dashboard/reports/purchase-report",
        },
        {
            
            text: "Stock Alert Report",
            path: "/dashboard/reports/stock-alert-report",
        },
        {
            icon: <IconLayoutDashboard stroke={iconStroke} />,
            text: "Work Period Report",
            path: "/dashboard/reports/work-period-report",
        },

        {
            icon: <IconLayoutDashboard stroke={iconStroke} />,
            text: "Attendance Report",
            path: "/dashboard/reports/attendance-report",
        }

    ]
    const ceoReports = [
        {
            icon: <IconLayoutDashboard stroke={iconStroke} />,
            text: "Expense Report",
            path: "/dashboard/reports/expense-report",
        },
        {
            icon: <IconLayoutDashboard stroke={iconStroke} />,
            text: "Customer Due Report",
            path: "/dashboard/reports/customer-due-report",
        },
        {
            icon: <IconLayoutDashboard stroke={iconStroke} />,
            text: "Supplier Due Report",
            path: "/dashboard/reports/supplier-due-report",
        },
        {
            icon: <IconLayoutDashboard stroke={iconStroke} />,
            text: "Employee Performance",
            path: "/dashboard/reports/employee-performance"
            
        }
    ];
    const subMenus = {
        "Sales": salesReports,
        "Inventory": inventoryReports,
        "CEO": ceoReports
    };


    return (
        <div className="w-20 md:w-60 h-screen overflow-y-auto border-r md:px-4 py-3 flex flex-col gap-1 md:gap-3">
            
            {items.map((item, index) => (
                <div key={index}>
                    {/* MAIN MENU ITEM */}
                    <Link
                        onClick={() => item.stateSetter(!item.state)}
                        to={item.path}
                        className={clsx(
                            "w-12 h-12 md:w-full md:h-auto md:min-w-fit flex items-center justify-center md:justify-normal gap-1 md:px-4 md:py-3 rounded-full transition hover:bg-salespos-border-green-light text-salespos-green-dark",
                            { "bg-salespos-border-green-light font-medium": item.path === pathname }
                        )}
                    >
                        <IconLayoutDashboard stroke={iconStroke} />
                        <p className="hidden md:block">{item.text}</p>
                        {item.hasSubMenu && (
                            <span className="hidden md:block ml-auto">
                                {item.state ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
                            </span>
                        )}
                    </Link>

                    {/* SUBMENU ITEMS */}
                    {item.hasSubMenu && item.state && (
                        <div className="ml-6 mt-2 flex flex-col gap-2">
                            {subMenus[item.text].map((subItem, subIndex) => (
                                <Link
                                    key={subIndex}
                                    to={subItem.path}
                                    className={clsx(
                                        "w-12 h-12 md:w-full md:h-auto md:min-w-fit flex items-center justify-center md:justify-normal gap-1 md:px-4 md:py-3 rounded-full transition hover:bg-salespos-border-green-light text-salespos-green-dark",
                                        { "bg-salespos-border-green-light font-medium": subItem.path === pathname }
                                    )}
                                >
                                    {subItem.text}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

