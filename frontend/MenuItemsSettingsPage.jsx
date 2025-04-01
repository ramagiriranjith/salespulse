import React, { useRef, useState } from "react";
import Page from "../../components/Page";
import { IconCarrot, IconPencil, IconPlus, IconTrash, IconSearch, IconFilter, IconFilterFilled } from "@tabler/icons-react";
import { iconStroke } from "../../config/config";
import { useCategories, useTaxes } from "../../controllers/settings.controller";
import toast from "react-hot-toast";
import { mutate } from "swr";
import { Link, useNavigate } from "react-router-dom";
import { addMenuItem, deleteMenuItem, useMenuItems } from "../../controllers/menu_item.controller";
import { useInventoryItems } from "../../controllers/inventory.controller";
import { getImageURL } from "../../helpers/ImageHelper";

export default function MenuItemsSettingsPage() {
  const navigate = useNavigate();
  const titleRef = useRef();
  const priceRef = useRef();
  const netPriceRef = useRef();
  const taxIdRef = useRef();
  const inventoryIdRef = useRef();
  const categoryIdRef = useRef();
  const categoryFilterDropdownRef = useRef(null);


  const [state, setState] = useState({
    //menuItems: [],
    searchQuery: "",
    selectedCategory: "all",
    selectedItemId: null,

  });
  const {
    APIURL: APIURLCategories,
    data: categories,
    error: errorCategories,
    isLoading: isLoadingCategories,
  } = useCategories();

  const { searchQuery, selectedCategory, selectedItemId } = state;
  const { APIURL: APIURLInventory, data: inventoryItems, error: errorInventory, isLoading: isLoadingInventory } = useInventoryItems();
  const { APIURL: APIURLTaxes, data: taxes, error: errorTaxes, isLoading: isLoadingTaxes } = useTaxes();

  const { APIURL, data: menuItems, error, isLoading } = useMenuItems();

  if (isLoadingCategories) {
    return <Page>Please wait...</Page>;
  }

  if (errorCategories) {
    return <Page>Error loading details! Please Try Later!</Page>;
  }

  if (isLoadingInventory) {
    return <Page>Please wait...</Page>;
  }

  if (errorInventory) {
    return <Page>Error loading details! Please Try Later!</Page>;
  }

  if (isLoadingTaxes) {
    return <Page>Please wait...</Page>
  }

  if (errorTaxes) {
    return <Page>Error loading details! Please Try Later!</Page>;
  }

  if (isLoading) {
    return <Page>Please wait...</Page>
  }

  if (error) {
    return <Page>Error loading details! Please Try Later!</Page>;
  }

  // category filter modal
  const btnOpenCategoryFilterModal = () => {
    categoryFilterDropdownRef.current.value = selectedCategory;
    document.getElementById('modal-categories').showModal()
  }
  const btnApplyCategoryFilter = () => {
    const selectedCategoryFromDropdown = categoryFilterDropdownRef.current.value || "";
    setState({
      ...state,
      selectedCategory: selectedCategoryFromDropdown
    })
  }
  const btnClearSelectedCategory = () => {
    setState({
      ...state,
      selectedCategory: "all"
    })
  };
  // category filter modal
  async function btnAdd() {
    const title = titleRef.current.value;
    const price = priceRef.current.value;
    const netPrice = netPriceRef.current.value || null;
    const categoryId = categoryIdRef.current.value || null;
    const inventoryId = inventoryIdRef.current.value || null;
    const taxId = taxIdRef.current.value || null;

    if (!title) {
      toast.error("Please enter title!");
      return;
    }

    if (price < 0) {
      toast.error("Please provide valid price!");
      return;
    }

    if (!inventoryId) {
      toast.error("Please select inventory item");
      return;
    }

    try {
      toast.loading("Please wait...");
      const res = await addMenuItem(title, price, netPrice, categoryId, taxId, inventoryId);

      if (res.status == 200) {
        titleRef.current.value = null;
        priceRef.current.value = null;
        netPriceRef.current.value = null;
        categoryIdRef.current.value = null;
        taxIdRef.current.value = null;
        inventoryIdRef.current.value = null;

        await mutate(APIURL);
        toast.dismiss();
        toast.success(res.data.message);
      }
    } catch (error) {
      const message = error.response.data.message || "Something went wrong!";
      console.error(error);
      toast.dismiss();
      toast.error(message);
    }
  }

  const btnDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure! This process is irreversible!");

    if (!isConfirm) {
      return;
    }

    try {
      toast.loading("Please wait...");
      const res = await deleteMenuItem(id);

      if (res.status == 200) {
        await mutate(APIURL);
        toast.dismiss();
        toast.success(res.data.message);
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong!";
      console.error(error);

      toast.dismiss();
      toast.error(message);
    }
  };

  const btnShowUpdate = (id) => {
    navigate(`/dashboard/settings/menu-items/${id}`);
  }

  return (
    <Page className="px-8 py-6">
      <div className="flex md:items-center flex-col md:flex-row gap-2">
        <h3 className="text-3xl font-light mr-6">Menu</h3>
        <button
          onClick={() => document.getElementById("modal-add").showModal()}
          className="rounded-lg border bg-gray-50 hover:bg-gray-100 transition active:scale-95 hover:shadow-lg text-gray-500 px-2 py-1 flex items-center gap-1 mr-4 w-fit"
        >
          <IconPlus size={22} stroke={iconStroke} /> New
        </button>
        <Link
          to="categories"
          className="w-fit rounded-lg border bg-gray-50 hover:bg-gray-100 transition active:scale-95 hover:shadow-lg text-gray-500 px-3 py-1"
        >
          Categories
        </Link>
        {/* categories, search */}
        <div className="flex gap-2 bg-white/40 backdrop-blur sticky top-0 w-full z-10 px-4 py-3 rounded-t-2xl">
          <button onClick={btnOpenCategoryFilterModal} className='bg-gray-100 hover:bg-gray-200 transition active:scale-95 text-gray-500 rounded-full w-10 h-10 flex items-center justify-center'>
            {selectedCategory != "all" ? <IconFilterFilled className='text-salespos-green' size={18} stroke={iconStroke} /> : <IconFilter size={18} stroke={iconStroke} />}
          </button>
          <label className="w-60 bg-gray-100 rounded-full px-3 py-2 text-gray-500 flex items-center gap-2">
            <IconSearch size={18} stroke={iconStroke} />  <input value={searchQuery} onChange={e => setState({ ...state, searchQuery: e.target.value })} type="search" placeholder='Search Item' className='w-full bg-transparent outline-none' />
          </label>
        </div>
      </div>

      <div className="mt-8 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {menuItems.filter((menuItem) => {
          if (selectedCategory == "all") {
            return true;
          }
          return selectedCategory == menuItem.category_id;
        }).filter((menuItem) => {
          if (!searchQuery) {
            return true;
          }
          return new String(menuItem.title).trim().toLowerCase().includes(searchQuery.trim().toLowerCase());
        }).map((menuItem, index) => {
          const { id, title, price, net_price, tax_id, category_id, category_title, addons, variants } = menuItem;

          return (
            <div
              key={id}
              className="border px-4 py-3 rounded-2xl flex flex-wrap items-center gap-2 text-sm"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 text-gray-400">
                <IconCarrot />
              </div>
              <div className="flex-1">
                <p>
                  {title} - {price}
                </p>
                <p className="text-gray-400 text-xs">
                  {category_title}
                </p>
                {variants.length > 0 && <p className="text-gray-400 text-xs">
                  {variants.length} Variants
                </p>}
              </div>
              <div className="flex gap-0">
                <button
                  onClick={() => {
                    btnShowUpdate(id);
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition active:scale-95"
                >
                  <IconPencil stroke={iconStroke} />
                </button>
                <button
                  onClick={() => {
                    btnDelete(id);
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-red-500 hover:bg-gray-100 transition active:scale-95"
                >
                  <IconTrash stroke={iconStroke} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* add dialog */}
      <dialog id="modal-add" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Item</h3>

          <div className="mt-4">
            <label htmlFor="title" className="mb-1 block text-gray-500 text-sm">
              Title
            </label>
            <input
              ref={titleRef}
              type="text"
              name="title"
              className="text-sm w-full border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
              placeholder="Enter Item Title"
            />
          </div>

          <div className="flex gap-4 w-full my-4">
            <div className="flex-1">
              <label
                htmlFor="price"
                className="mb-1 block text-gray-500 text-sm"
              >
                Price
              </label>
              <input
                ref={priceRef}
                type="number"
                name="price"
                className="text-sm w-full border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                placeholder="Enter Item Price"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="nprice"
                className="mb-1 block text-gray-500 text-sm"
              >
                Net Price
              </label>
              <input
                ref={netPriceRef}
                type="number"
                name="nprice"
                className="text-sm w-full border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                placeholder="Enter Item Net Price"
              />
            </div>
          </div>

          <div className="flex gap-4 w-full my-4">
            <div className="flex-1">
              <label
                htmlFor="category"
                className="mb-1 block text-gray-500 text-sm"
              >
                Category
              </label>
              <select
                ref={categoryIdRef}
                name="category"
                className="text-sm w-full border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                placeholder="Select Category"
              >
                <option value="">None</option>
                {
                  categories.map((category, index) => {
                    return <option value={category.id} key={category.id}>{category.title}</option>
                  })
                }
              </select>
            </div>
            <div className="flex-1">
              <label
                htmlFor="tax"
                className="mb-1 block text-gray-500 text-sm"
              >
                Tax
              </label>
              <select
                ref={taxIdRef}
                name="tax"
                className="text-sm w-full border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                placeholder="Select Tax"
              >
                <option value="">None</option>
                {
                  taxes.map((tax, index) => {
                    return <option value={tax.id} key={tax.id}>{tax.title} - {tax.rate}% ({tax.type})</option>
                  })
                }
              </select>
            </div>
          </div>
          
          <div>
            <div className="flex-1">
              <label
                htmlFor="tax"
                className="mb-1 block text-gray-500 text-sm"
              >
                Inventory Items
              </label>
              <select
                ref={inventoryIdRef}
                name="inventory"
                className="text-sm w-full border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                placeholder="Select Inventory Item"
              >
                <option value="">None</option>
                {
                  inventoryItems.map((item, index) => {
                    return <option value={item.id} key={item.id}>{item.title}</option>
                  })
                }
              </select>
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="rounded-lg hover:bg-gray-200 transition active:scale-95 hover:shadow-lg px-4 py-3 bg-gray-200 text-gray-500">
                Close
              </button>
              <button
                onClick={() => {
                  btnAdd();
                }}
                className="rounded-lg hover:bg-red-400 transition active:scale-95 hover:shadow-lg px-4 py-3 bg-salespos-green text-white ml-3"
              >
                Save
              </button>
            </form>
          </div>
          {/* dialog: category selection */}
          <dialog id="modal-categories" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Filters</h3>

              <div className="my-4">
                <label htmlFor="select_category" className="mb-1 block text-gray-500 text-sm">Select Category</label>
                <select ref={categoryFilterDropdownRef} type="text" name="select_category" id='select_category' className="text-sm w-full border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light" placeholder="Select Category..." >
                  <option value="all">All</option>
                  {
                    categories.map((category, index) => <option value={category.id} key={index}>{category.title}</option>)
                  }
                </select>
              </div>

              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button onClick={() => { btnClearSelectedCategory() }} className="rounded-lg hover:bg-gray-200 transition active:scale-95 hover:shadow-lg px-4 py-3 bg-gray-200 text-gray-500">Close</button>
                  <button onClick={() => { btnApplyCategoryFilter(); }} className="rounded-lg hover:bg-red-400 transition active:scale-95 hover:shadow-lg px-4 py-3 bg-salespos-green text-white ml-3">Apply</button>
                </form>
              </div>
            </div>
          </dialog>
          {/* dialog: category selection */}

        </div>
      </dialog>
      {/* add dialog */}
    </Page>
  );
}
