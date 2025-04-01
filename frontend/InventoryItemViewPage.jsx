import React, { useRef } from "react";
import Page from "../../components/Page";
import { Link, useParams } from "react-router-dom";
import { addInventoryItem, removeInventoryItemPhoto, updateInventoryItem, uploadInventoryItemPhoto, useInventoryItem, useInventoryItems, deleteInventoryItem } from "../../controllers/inventory.controller";
import { useCategories, useTaxes } from "../../controllers/settings.controller";
import toast from "react-hot-toast";
import { mutate } from "swr";
import { IconCarrot, IconChevronDown, IconPencil, IconTrash, IconUpload } from "@tabler/icons-react";
import { iconStroke } from "../../config/config"
import imageCompression from "browser-image-compression";
import { getImageURL } from "../../helpers/ImageHelper";

export default function InventoryItemViewPage() {
    const params = useParams();
    const itemId = params.id;

    const titleRef = useRef();
    const quantityRef = useRef();
    const supplierNameRef = useRef();
    const categoryIdRef = useRef();
    const stockAlertQuantityRef = useRef();

    const {
        APIURL: APIURLCategories,
        data: categories,
        error: errorCategories,
        isLoading: isLoadingCategories,
    } = useCategories();

    const { APIURL, data: inventoryItem, error, isLoading } = useInventoryItem(itemId);

    if (isLoadingCategories) {
        return <Page>Please wait...</Page>;
    }

    if (errorCategories) {
        return <Page>Error loading details! Please Try Later!</Page>;
    }

    if (isLoading) {
        return <Page>Please wait...</Page>;
    }

    if (error) {
        return <Page>Error loading details! Please Try Later!</Page>;
    }

    const {
        id,
        title,
        category,
        quantity,
        supplierName,
        stockAlertQuantity,
        image
    } = inventoryItem || {};
    console.log(stockAlertQuantity);
    
    const imageURL = image ? getImageURL(image) : null;


    async function btnSave() {
        const title = titleRef.current.value;
        const quantity = quantityRef.current.value;
        const supplierName = supplierNameRef.current.value || null;
        const stockAlertQuantity = stockAlertQuantityRef.current.value;
        const categoryId = categoryIdRef.current.value || null;

        if (!title) {
            toast.error("Please enter title!");
            return;
        }

        if (quantity < 0) {
            toast.error("Please provide valid price!");
            return;
        }
        if (stockAlertQuantity < 0) {
            toast.error("Please provide valid quantity!");
            return;
        }

        try {
            toast.loading("Please wait...");
            const res = await updateInventoryItem(id, title, categoryId, quantity, supplierName, stockAlertQuantity);

            if (res.status == 200) {
                await mutate(APIURL);
                toast.dismiss();
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            const message = error.response.data.message || "Something went wrong!";
            toast.dismiss();
            toast.error(message);
        }
    }

    const handleFileChange = async (e) => {

        const file = e.target.files[0];

        if (!file) {
            return;
        }

        // compress image
        try {
            toast.loading("Please wait...");
            const compressedImage = await imageCompression(file, {
                maxSizeMB: 0.5,
                maxWidthOrHeight: 512,
                useWebWorker: true,
            })

            const formData = new FormData();
            formData.append("image", compressedImage);

            const res = await uploadInventoryItemPhoto(itemId, formData);
            if (res.status == 200) {
                toast.dismiss();
                toast.success(res.data.message);

                // update the image state
                const imagePath = res.data.imageURL;
                await mutate(APIURL);
                location.reload();
            }

        } catch (error) {
            console.error(error);
            toast.dismiss();
            const message = error?.response?.data?.message || "We're getting issue while processing your request, Please try later!";
            toast.error(message)
        }
    }

    

    const btnRemoveInventoryItemImage = async () => {
        const isConfirm = window.confirm("Are you sure! This operation is irreversible!");

        if (!isConfirm) {
            return;
        }

        try {
            toast.loading("Please wait...");

            const res = await removeInventoryItemPhoto(itemId);
            if (res.status == 200) {
                toast.dismiss();
                toast.success(res.data.message);
                await mutate(APIURL);
                location.reload();
            }

        } catch (error) {
            console.error(error);
            toast.dismiss();
            const message = error?.response?.data?.message || "We're getting issue while processing your request, Please try later!";
            toast.error(message)
        }
    }

    return (
        <Page className="px-4 md:px-8 py-3 md:py-6">
            <div className="text-sm breadcrumbs">
                <ul>
                    <li>
                        <Link to="/dashboard/settings">Settings</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/settings/inventory-items">Inventory</Link>
                    </li>
                    <li>{title}</li>
                </ul>
            </div>

            <div className="my-6 flex gap-6 flex-col lg:flex-row">
                <div className="">
                    <div className="relative w-32 h-32 md:w-64 md:h-64 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-600 text-2xl mb-4">

                        {
                            image ? <div className="w-full h-full relative top-0 left-0">
                                <img src={imageURL} alt={title} className="w-full h-full absolute top-0 left-0 rounded-2xl object-cover" />
                            </div> :
                                <p className="absolute"><IconCarrot stroke={iconStroke} /></p>
                        }


                        {/* upload image options */}
                        <div className="absolute bottom-2 md:bottom-auto md:top-4 md:right-4 flex items-center gap-2">
                            <label htmlFor="file" className="flex items-center justify-center w-9 h-9 rounded-full bg-white shadow hover:bg-slate-100 cursor-pointer transition active:scale-95">
                                <IconUpload stroke={iconStroke} size={18} />
                                <input onChange={handleFileChange} type="file" name="file" id="file" className="hidden" accept="image/*" />
                            </label>

                            <button onClick={btnRemoveInventoryItemImage} className="flex items-center justify-center w-9 h-9 rounded-full bg-white shadow hover:bg-slate-100 cursor-pointer transition active:scale-95 text-red-500">
                                <IconTrash stroke={iconStroke} size={18} />
                            </button>
                        </div>
                        {/* upload image options */}
                    </div>
                    <button onClick={btnSave} className="mt-6 text-white w-full bg-salespos-green transition hover:bg-salespos-green/80 active:scale-95 rounded-lg px-4 py-2 outline-salespos-border-green-light">Save</button>
                </div>
                <div className="flex-1">
                    <div className="">
                        <label htmlFor="title" className="mb-1 block text-gray-500 text-sm">
                            Title
                        </label>
                        <input
                            ref={titleRef}
                            defaultValue={title}
                            type="text"
                            name="title"
                            className="text-sm w-full border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                            placeholder="Enter Item Title"
                        />
                    </div>

                    <div className="flex gap-4 w-full my-4 flex-col lg:flex-row">
                        <div className="flex-1">
                            <label
                                htmlFor="price"
                                className="mb-1 block text-gray-500 text-sm"
                            >
                                Quantity
                            </label>
                            <input
                                ref={quantityRef}
                                defaultValue={quantity}
                                type="number"
                                name="quantity"
                                className="text-sm w-full border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                                placeholder="Enter Item Quantity"
                            />
                        </div>
                        <div className="flex-1">
                            <label
                                htmlFor="nprice"
                                className="mb-1 block text-gray-500 text-sm"
                            >
                                Supplier Name
                            </label>
                            <input
                                ref={supplierNameRef}
                                type="text"
                                name="suppliername"
                                defaultValue={supplierName}
                                className="text-sm w-full border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                                placeholder="Enter Supplier Name"
                            />
                        </div>
                    </div>
                    <div className="">
                        <label htmlFor="stock_alert_quantity" className="mb-1 block text-gray-500 text-sm">
                            Stock Alert Quantity
                        </label>
                        <input
                            ref={stockAlertQuantityRef}
                            defaultValue={stockAlertQuantity}
                            type="text"
                            name="stock_alert_quantity"
                            className="text-sm w-full border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                            placeholder="5"
                        />
                    </div>
                    

                    <div className="flex gap-4 w-full my-4 flex-col lg:flex-row">
                        <div className="flex-1">
                            <label
                                htmlFor="category"
                                className="mb-1 block text-gray-500 text-sm"
                            >
                                Category
                            </label>
                            <select
                                ref={categoryIdRef}
                                defaultValue={category}
                                name="category"
                                className="text-sm w-full border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                                placeholder="Select Category"
                            >
                                <option value="">None</option>
                                {categories.map((category, index) => {
                                    return (
                                        <option value={category.id} key={category.id}>
                                            {category.title}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}
