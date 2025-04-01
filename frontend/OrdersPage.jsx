import React, { useContext, useEffect, useRef, useState } from "react";
import Page from "../components/Page";
import {
  cancelKitchenOrder,
  completeKitchenOrder,
  getCompleteOrderPaymentSummary,
  getOrders,
  getOrdersInit,
  payAndCompleteKitchenOrder,
  updateKitchenOrderItemStatus,
} from "../controllers/orders.controller";
import { toast } from "react-hot-toast";
import {
  IconArmchair,
  IconBoxSeam,
  IconCash,
  IconCheck,
  IconChecks,
  IconClock,
  IconDotsVertical,
  IconReceipt,
  IconRefresh,
  IconX,
} from "@tabler/icons-react";
import { VITE_BACKEND_SOCKET_IO, iconStroke } from "../config/config";
import { CURRENCIES } from "../config/currencies.config";
import { PAYMENT_ICONS } from "../config/payment_icons";
import { setDetailsForReceiptPrint } from "../helpers/ReceiptHelper";

import { SocketContext } from "../contexts/SocketContext";
import { initSocket } from "../utils/socket";
import { textToSpeech } from "../utils/textToSpeech";
import { getUserDetailsInLocalStorage } from "../helpers/UserDetails";

export default function OrdersPage() {
  const printReceiptRef = useRef();
  const user = getUserDetailsInLocalStorage();
  const { socket, isSocketConnected } = useContext(SocketContext);

  const [state, setState] = useState({
    kitchenOrders: [],
    printSettings: null,
    storeSettings: null,
    paymentTypes: [],
    isLoading: true,

    cancelOrderIds: [],
    completeOrderIds: [],
    completeTokenIds: "",

    currency: null,

    summaryNetTotal: 0,
    summaryTaxTotal: 0,
    summaryDiscount:0,
    summaryTotal: 0,
    summaryOrders: [],
    order: null,

    selectedPaymentType: null,
  });

  useEffect(() => {
    _init();
    _initSocket();
  }, []);

  const {
    kitchenOrders,
    printSettings,
    storeSettings,
    paymentTypes,
    isLoading,
    currency,
  } = state;

  const _init = async () => {
    try {
      const [ordersResponse, ordersInitResponse] = await Promise.all([
        getOrders(),
        getOrdersInit(),
      ]);

      if (ordersResponse.status == 200 && ordersInitResponse.status == 200) {
        const orders = ordersResponse?.data || [];
        const ordersInit = ordersInitResponse.data;

        const currency = CURRENCIES.find(
          (c) => c.cc == ordersInit?.storeSettings?.currency
        );

        setState({
          ...state,
          kitchenOrders: orders,
          printSettings: ordersInit.printSettings || {},
          storeSettings: ordersInit.storeSettings || {},
          paymentTypes: ordersInit.paymentTypes || {},
          currency: currency?.symbol,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Error loading orders! Please try later!");

      setState({
        ...state,
        isLoading: false,
      });
    }
  };

  const refreshOrders = async () => {
    try {
      toast.loading("Please wait...");
      const res = await getOrders();
      toast.dismiss();
      if (res.status == 200) {
        toast.success("Orders Loaded!");
        setState({
          ...state,
          kitchenOrders: res.data,
          isLoading: false,
        });
      }
    } catch (error) {
      const message =
        error.response.data.message ||
        "Error loading orders! Please try later!";
      console.error(error);
      toast.dismiss();
      toast.error(message);
      setState({
        ...state,
        isLoading: false,
      });
    }
  };

  const _initSocket = () => {
    const audio = new Audio("/new_order_sound.mp3");
    if (isSocketConnected) {
      socket.emit("authenticate", user.tenant_id);
      socket.on("new_order", (payload) => {
        console.log(payload);
        // textToSpeech(`New order received, token number: ${payload}`)
        audio.play();
        refreshOrders();
      });

      socket.on("order_update", () => {
        console.log("Order update");
        refreshOrders();
      });
    } else {
      initSocket();
      socket.emit("authenticate", user.tenant_id);
      socket.on("new_order", (payload) => {
        console.log(payload);
        // textToSpeech(`New order received, token number: ${payload}`);
        audio.play();
        refreshOrders();
      });

      socket.on("order_update", () => {
        console.log("Order update");
        refreshOrders();
      });
    }
  };

  const sendOrderUpdateEvent = () => {
    const user = getUserDetailsInLocalStorage();

    if (isSocketConnected) {
      socket.emit("order_update_backend", {}, user.tenant_id);
    } else {
      // Handle disconnected state (optional)
      initSocket();
      socket.emit("order_update_backend", {}, user.tenant_id);
    }
  };

  if (state.isLoading) {
    return <Page>Please wait...</Page>;
  }

  const btnChangeOrderItemStatus = async (orderItemId, status) => {
    try {
      toast.loading("Please wait...");
      const res = await updateKitchenOrderItemStatus(orderItemId, status);
      toast.dismiss();
      if (res.status == 200) {
        sendOrderUpdateEvent();
        await refreshOrders();
        toast.success(res.data.message);
        document.getElementById("modal-order-item-status-update").showModal();
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Error processing your request, Please try later!";
      toast.dismiss();
      console.error(error);
      toast.error(message);
    }
  };

  const btnShowCancelOrderModal = (orderIds) => {
    setState({
      ...state,
      cancelOrderIds: orderIds,
    });
    document.getElementById("modal-order-cancel").showModal();
  };
  const btnCancelOrder = async () => {
    try {
      toast.loading("Please wait...");
      const res = await cancelKitchenOrder(state.cancelOrderIds);
      toast.dismiss();
      if (res.status == 200) {
        sendOrderUpdateEvent();
        await refreshOrders();
        toast.success(res.data.message);
        document.getElementById("modal-order-cancel").close();
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Error processing your request, Please try later!";
      toast.dismiss();
      console.error(error);
      toast.error(message);
    }
  };

  const btnShowCompleteOrderModal = (orderIds) => {
    setState({
      ...state,
      completeOrderIds: orderIds,
    });
    document.getElementById("modal-order-complete").showModal();
  };
  const btnCompleteOrder = async () => {
    try {
      toast.loading("Please wait...");
      const res = await completeKitchenOrder(state.completeOrderIds);
      toast.dismiss();
      if (res.status == 200) {
        sendOrderUpdateEvent();
        await refreshOrders();
        toast.success(res.data.message);
        document.getElementById("modal-order-complete").close();
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Error processing your request, Please try later!";
      toast.dismiss();
      console.error(error);
      toast.error(message);
    }
  };

  const btnShowPayAndComplete = async (orderIds, order) => {
    try {
      toast.loading("Please wait...");
      const res = await getCompleteOrderPaymentSummary(orderIds);
      toast.dismiss();

      if (res.status == 200) {
        const { subtotal, taxTotal, discount, total, orders } = res.data;


        const tokenNoArray = orders.map(o=>o.token_no);
        const tokens = tokenNoArray.join(",");

        setState({
          ...state,
          summaryNetTotal: subtotal,
          summaryTaxTotal: taxTotal,
          summaryDiscount : discount,
          summaryTotal: total,
          summaryOrders: orders,
          completeOrderIds: orderIds,
          completeTokenIds: tokens,
          order: order,
        });

        document.getElementById("modal-order-summary-complete").showModal();
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Error processing your request, Please try later!";
      toast.dismiss();
      console.error(error);
      toast.error(message);
    }
  };
  const btnPayAndComplete = async () => {
    const isPrintReceipt = printReceiptRef.current.checked || false;

    try {
      toast.loading("Please wait...");
      const res = await payAndCompleteKitchenOrder(
        state.completeOrderIds,
        state.summaryNetTotal,
        state.summaryTaxTotal,
        state.summaryDiscount,
        state.summaryTotal,
        state.selectedPaymentType,
      );
      toast.dismiss();
      if (res.status == 200) {
        sendOrderUpdateEvent();
        await refreshOrders();
        toast.success(res.data.message);
        document.getElementById("modal-order-summary-complete").close();

        if (isPrintReceipt) {
          const { table_id, table_title, floor } = state.order;

          const orders = [];
          const orderIds = state.completeOrderIds.join(", ");

          for (const o of state.summaryOrders) {
            const items = o.items;
            items.forEach((i) => {
              const variant = i.variant_id
                ? {
                    id: i.variant_id,
                    title: i.variant_title,
                    price: i.variant_price,
                  }
                : null;
              orders.push({
                ...i,
                title: i.item_title,
                addons_ids:
                  i?.addons?.length > 0 ? i?.addons?.map((a) => a.id) : [],
                variant: variant,
              });
            });
          }

          const {
            customer_id,
            customer_type,
            customer_name,
            date,
            delivery_type,
          } = state.summaryOrders[0];

          const paymentType = paymentTypes.find((v)=>v.id == state.selectedPaymentType);
          let paymentMethodText;
          if(paymentType) {
            paymentMethodText = paymentType.title;
          }

          setDetailsForReceiptPrint({
            cartItems: orders,
            deliveryType: delivery_type,
            customerType: customer_type,
            customer: { id: customer_id, name: customer_name },
            tableId: table_id,
            currency,
            storeSettings,
            printSettings,
            itemsTotal: state.summaryNetTotal,
            taxTotal: state.summaryTaxTotal,
            discount: state.summaryDiscount,
            payableTotal: state.summaryTotal,
            tokenNo: state.completeTokenIds,
            orderId: orderIds,
            paymentMethod: paymentMethodText
          });

          setState((prev)=>({...prev, selectedPaymentType: null}));

          const receiptWindow = window.open(
            "/print-receipt",
            "_blank",
            "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400"
          );
          receiptWindow.onload = (e) => {
            setTimeout(() => {
              receiptWindow.print();
            }, 400);
          };
        }
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Error processing your request, Please try later!";
      toast.dismiss();
      console.error(error);
      toast.error(message);
    }
  };

  const btnPrintReceipt = async (orderIdsArr, tokens) => {
    try {
      toast.loading("Please wait...");
      const res = await getCompleteOrderPaymentSummary(orderIdsArr);
      toast.dismiss();

      if (res.status == 200) {
        const { subtotal, taxTotal, discount, total, orders: ordersArr } = res.data;

        const orders = [];
        const orderIds = orderIdsArr.join(", ");

        for (const o of ordersArr) {
          const items = o.items;
          items.forEach((i) => {
            const variant = i.variant_id
              ? {
                  id: i.variant_id,
                  title: i.variant_title,
                  price: i.variant_price,
                }
              : null;
            orders.push({
              ...i,
              title: i.item_title,
              addons_ids:
                i?.addons?.length > 0 ? i?.addons?.map((a) => a.id) : [],
              variant: variant,
            });
          });
        }

        const {
          customer_id,
          customer_type,
          customer_name,
          date,
          delivery_type,
        } = ordersArr;

        setDetailsForReceiptPrint({
          cartItems: orders,
          deliveryType: delivery_type,
          customerType: customer_type,
          customer: { id: customer_id, name: customer_name },
          tableId: null,
          currency,
          storeSettings,
          printSettings,
          itemsTotal: subtotal,
          taxTotal: taxTotal,
          discount: discount,
          payableTotal: total,
          tokenNo: tokens,
          orderId: orderIds,
        });

        const receiptWindow = window.open(
          "/print-receipt",
          "_blank",
          "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400"
        );
        receiptWindow.onload = (e) => {
          setTimeout(() => {
            receiptWindow.print();
          }, 400);
        };
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Error processing your request, Please try later!";
      toast.dismiss();
      console.error(error);
      toast.error(message);
    }
  };

  return (
    <Page>
      <div className="flex items-center gap-6">
        <h3 className="text-3xl font-light">Orders</h3>
        <button
          onClick={refreshOrders}
          className="rounded-lg border bg-gray-50 hover:bg-gray-100 transition active:scale-95 hover:shadow-lg text-gray-500 px-2 py-1 flex items-center gap-1"
        >
          <IconRefresh size={22} stroke={iconStroke} /> Refresh
        </button>
      </div>

      {kitchenOrders?.length == 0 && (
        <div className="w-full h-[calc(100vh-15vh)] flex gap-4 flex-col items-center justify-center">
          <img
            src="/assets/illustrations/kitchen.svg"
            alt="no orders"
            className="w-full md:w-60"
          />
          <p className="text-gray-400">No Orders Pending!</p>
        </div>
      )}

      {kitchenOrders?.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {kitchenOrders.map((order, index) => {
            const { table_id, table_title, floor, orders, order_ids } = order;

            const tokenNoArray = orders.map(o=>o.token_no);
            const tokens = tokenNoArray.join(",")

            const isPaid = orders.every((o)=>o.payment_status=='paid');

            return (
              <div
                key={index}
                className="border border-salespos-border-green-light rounded-2xl px-4 py-5 flex flex-col divide-y divide-dashed"
              >
                <div className="flex items-center flex-col md:flex-row md:justify-between text-center gap-2 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex w-12 h-12 rounded-full items-center justify-center bg-gray-100 text-gray-400">
                      {table_id ? (
                        <IconArmchair size={24} stroke={iconStroke} />
                      ) : (
                        <IconReceipt size={24} stroke={iconStroke} />
                      )}
                    </div>
                    <div>
                      <p className="font-bold">
                        {table_id ? `${table_title}` : "Dine Out / Delivery"}
                      </p>
                      {floor && <p className="text-sm">{floor}</p>}
                    </div>
                  </div>
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-sm btn-circle bg-transparent border-none shadow-none m-1"
                    >
                      <IconDotsVertical size={18} stroke={iconStroke} />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <button
                          className="flex items-center gap-2 bg-transparent border-none shadow-none "
                          onClick={() => {
                            btnPrintReceipt(order_ids, tokens);
                          }}
                        >
                          <IconReceipt size={18} stroke={iconStroke} /> Print
                          Receipt
                        </button>
                      </li>
                      <li>
                        <button
                          className="flex items-center gap-2 bg-transparent border-none shadow-none text-red-500"
                          onClick={() => {
                            btnShowCancelOrderModal(order_ids);
                          }}
                        >
                          <IconX size={18} stroke={iconStroke} /> Cancel
                        </button>
                      </li>
                      <li>
                        <button
                          className="flex items-center gap-2 bg-transparent border-none shadow-none text-red-500"
                          onClick={() => {
                            if(isPaid == false) {
                              toast.error("Action cannot be processed because payment has not been collected. Please use the 'Pay & Complete' option instead.")
                              return;
                            }
                            btnShowCompleteOrderModal(order_ids);
                          }}
                        >
                          <IconCheck size={18} stroke={iconStroke} /> Complete
                        </button>
                      </li>
                      <li>
                        <button
                          className="flex items-center gap-2 bg-transparent border-none shadow-none "
                          onClick={() => {
                            if(isPaid == true) {
                              toast.error("Action cannot be processed because payment has already been collected. Please use the 'Complete' option instead.")
                              return;
                            }
                            btnShowPayAndComplete(order_ids, order);
                          }}
                        >
                          <IconCash size={18} stroke={iconStroke} /> Pay &
                          Complete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                {orders.map((o, i) => {
                  const {
                    id,
                    date,
                    delivery_type,
                    customer_type,
                    customer_id,
                    customer_name,
                    status,
                    payment_status,
                    token_no,
                    items,
                  } = o;

                  return (
                    <div className="py-2 bg-gray-50 px-2 mt-2 mb-2 rounded-xl">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center justify-center flex-col text-center">
                          <p>Token:</p>
                          <div className="w-12 h-12 flex items-center justify-center font-bold rounded-full bg-slate-700 text-white">
                            {token_no}
                          </div>
                        </div>
                        <div className="text-end">
                          <p>
                            {new Intl.DateTimeFormat("en-US", {
                              timeStyle: "short",
                            }).format(new Date(date))}
                          </p>
                          <p className="flex gap-2 items-center text-sm text-gray-500">
                            {" "}
                            <IconCash stroke={iconStroke} size={18} />{" "}
                            {payment_status}
                          </p>
                        </div>
                      </div>

                      {/* order items */}
                      <div className="mt-4 flex flex-col divide-y">
                        {items.map((item, index) => {
                          const {
                            id: orderItemId,
                            order_id,
                            item_id,
                            item_title,
                            variant_id,
                            variant_title,
                            quantity,
                            status,
                            date,
                            addons,
                            notes,
                          } = item;

                          const addonsText =
                            addons?.length > 0
                              ? addons?.map((a) => a.title)?.join(", ")
                              : null;

                          return (
                            <div
                              key={index}
                              className="flex items-center gap-2 py-2"
                            >
                              {/* status */}
                              {status == "preparing" && (
                                <IconClock
                                  stroke={iconStroke}
                                  className="text-amber-500"
                                />
                              )}
                              {status == "completed" && (
                                <IconCheck
                                  stroke={iconStroke}
                                  className="text-red-500"
                                />
                              )}
                              {status == "cancelled" && (
                                <IconX
                                  stroke={iconStroke}
                                  className="text-red-500"
                                />
                              )}
                              {status == "delivered" && (
                                <IconChecks
                                  stroke={iconStroke}
                                  className="text-red-500"
                                />
                              )}
                              {/* status */}

                              {/* item title */}
                              <div className="flex-1">
                                <p>
                                  {item_title} {variant_title} x {quantity}
                                </p>
                                {addonsText && (
                                  <p className="text-sm text-gray-700">
                                    Addons: {addonsText}
                                  </p>
                                )}
                                {notes && (
                                  <p className="text-sm text-gray-700">
                                    Notes: {notes}
                                  </p>
                                )}
                              </div>
                              {/* item title */}

                              {/* action */}
                              <div className="dropdown dropdown-left">
                                <div
                                  tabIndex={0}
                                  role="button"
                                  className="btn btn-sm btn-circle bg-transparent border-none shadow-none m-1"
                                >
                                  <IconDotsVertical
                                    size={18}
                                    stroke={iconStroke}
                                  />
                                </div>
                                <ul
                                  tabIndex={0}
                                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                                >
                                  <li>
                                    <button
                                      className="flex items-center gap-2 bg-transparent border-none shadow-none text-amber-500"
                                      onClick={() => {
                                        btnChangeOrderItemStatus(
                                          orderItemId,
                                          "preparing"
                                        );
                                      }}
                                    >
                                      <IconClock
                                        size={18}
                                        stroke={iconStroke}
                                      />{" "}
                                      Preparing
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      className="flex items-center gap-2 bg-transparent border-none shadow-none text-salespos-green"
                                      onClick={() => {
                                        btnChangeOrderItemStatus(
                                          orderItemId,
                                          "completed"
                                        );
                                      }}
                                    >
                                      <IconCheck
                                        size={18}
                                        stroke={iconStroke}
                                      />{" "}
                                      Complete
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      className="flex items-center gap-2 bg-transparent border-none shadow-none "
                                      onClick={() => {
                                        btnChangeOrderItemStatus(
                                          orderItemId,
                                          "delivered"
                                        );
                                      }}
                                    >
                                      <IconChecks
                                        size={18}
                                        stroke={iconStroke}
                                      />{" "}
                                      Delivered
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      className="flex items-center gap-2 bg-transparent border-none shadow-none text-red-500"
                                      onClick={() => {
                                        btnChangeOrderItemStatus(
                                          orderItemId,
                                          "cancelled"
                                        );
                                      }}
                                    >
                                      <IconX size={18} stroke={iconStroke} />{" "}
                                      Cancel
                                    </button>
                                  </li>
                                </ul>
                              </div>
                              {/* action */}
                            </div>
                          );
                        })}
                      </div>
                      {/* order items */}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}

      {/* dialog: successful order item status update */}
      <dialog id="modal-order-item-status-update" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Success!</h3>
          <p className="py-4">Order Item status successfully updated!</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      {/* dialog: successful order item status update */}

      {/* dialog: cancel order */}
      <dialog id="modal-order-cancel" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Alert!</h3>
          <p className="py-4">
            Are you sure, you are cancelling the order! This process is not
            reversible. 🛑✋
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Dismiss</button>
              <button
                onClick={() => {
                  btnCancelOrder();
                }}
                className="ml-2 btn hover:bg-red-700 bg-red-500 text-white"
              >
                Yes Confirm!
              </button>
            </form>
          </div>
        </div>
      </dialog>
      {/* dialog: cancel order */}

      {/* dialog: complete order */}
      <dialog id="modal-order-complete" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Alert!</h3>
          <p className="py-4">
            Are you sure, you are completing the order! 🛑✋
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Dismiss</button>
              <button
                onClick={() => {
                  btnCompleteOrder();
                }}
                className="ml-2 btn hover:bg-salespos-green-dark bg-salespos-green text-white"
              >
                Yes Confirm!
              </button>
            </form>
          </div>
        </div>
      </dialog>
      {/* dialog: complete order */}

      {/* dialog: complete order & payment summary */}
      <dialog id="modal-order-summary-complete" className="modal">
        <div className="modal-box">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Pay & Complete Order!</h3>
            <form method='dialog'>
              <button className="hover:bg-red-100 border-none transition active:scale-95 bg-red-50 text-red-500 btn btn-sm btn-circle"><IconX size={18} stroke={iconStroke} /></button>
            </form>
          </div>
          
          
          <div className="my-6">

            <div className="flex w-full items-center divide-x gap-x-4">
              <div className="flex-1 text-center">
                <p>Subtotal</p>
                <p className="text-2xl">
                  {currency}
                  {Number(state.summaryNetTotal).toFixed(2)}
                </p>
              </div>

              <div className="flex-1 text-center">
                <p>Tax</p>
                <p className="text-2xl">
                  {currency}
                  {Number(state.summaryTaxTotal).toFixed(2)}
                </p>
              </div>

              <div className="flex-1 text-center">
                <p>Total</p>
                <p className="text-2xl text-salespos-green font-bold">
                  {currency}
                  {Number(state.summaryTotal).toFixed(2)}
                </p>
              </div>
              <div className="flex-1 text-center">
                <p>Discount</p>
                <p className="text-2xl text-salespos-green font-bold">
                  {currency}
                  {Number(state.summaryDiscount).toFixed(2)}
                </p>
              </div>
            </div>

            <label
              htmlFor="print_receipt"
              className="mt-4 w-full flex justify-end items-center gap-2 "
            >
              <input
                type="checkbox"
                className="checkbox"
                id="print_receipt"
                ref={printReceiptRef}
              />{" "}
              Print Receipt?
            </label>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {paymentTypes.map((paymentType, i)=>{
              return <label key={i} className=''>
                <input 
                checked={state?.selectedPaymentType == paymentType?.id}
                onChange={e=>{
                  setState({
                    ...state,
                    selectedPaymentType: e.target.value,
                  });
                }} type="radio" name="payment_type" id={paymentType?.icon} value={paymentType?.id} className='peer hidden' />
                <label htmlFor={paymentType?.icon} className='border rounded-2xl flex items-center justify-center gap-1 flex-col px-4 py-3 text-gray-500 peer-checked:border-salespos-green peer-checked:text-salespos-green peer-checked:font-bold cursor-pointer transition'>
                  {paymentType?.icon ? <div>{PAYMENT_ICONS[paymentType?.icon]}</div>:<></>}
                  <p className='text-xs'>{paymentType.title}</p>
                </label>
              </label>
            })}
          </div>

          <div className="modal-action">
            <form method="dialog" className="w-full">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if(!state?.selectedPaymentType){
                    toast.error("Please select a payment option");
                    return;
                  }
                  btnPayAndComplete();
                }}
                className="w-full btn hover:bg-salespos-green-dark bg-salespos-green text-white"
              >
                Pay & Complete Order
              </button>
            </form>
          </div>
        </div>
      </dialog>
      {/* dialog: complete order & payment summary */}
    </Page>
  );
}
