import React, { useEffect, useState } from "react";
import Page from "../../components/Page";
import { toast } from "react-hot-toast";
import { mutate } from "swr";
import { getEmployees } from '../../controllers/reports.controller';
import { addEmployeeFeedback } from "../../controllers/employee.controller";

const Rating = ({ value, onChange }) => (
    <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
            <span
                key={star}
                className={`text-3xl cursor-pointer ${value >= star ? "text-yellow-500" : "text-gray-300"}`}
                onClick={() => onChange(star)}
            >
                ★
            </span>
        ))}
    </div>
);
export const EmployeeFeedback = () => {
    const [employees, setEmployees] = useState([]);
    const [employeeName, setEmployeeName] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [punctuality, setPunctuality] = useState(0);
    const [service, setService] = useState(0);
    const [customerFeedback, setCustomerFeedback] = useState(0);
    const [managerFeedback, setManagerFeedback] = useState(0);

    console.log(employeeName);
    console.log(review);
    console.log(punctuality);
    console.log(rating);
    console.log(service);
    console.log(customerFeedback);
    console.log(managerFeedback);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getEmployees();
                setEmployees(data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };
        fetchEmployees();
    }, []);

    

    const handleSave = async () => {
        if (
            !employeeName ||
            !review ||
            !rating ||
            !service ||
            !punctuality ||
            !customerFeedback ||
            !managerFeedback
        ) {
            toast.error("All fields are required");
            return;
        }

        try {
            toast.loading("Saving feedback...");
            const response = await addEmployeeFeedback(
                employeeName,
                review,
                rating,
                service,
                punctuality,
                customerFeedback,
                managerFeedback
            );

            if (response.status === 201) {
                toast.dismiss();
                toast.success(response.data.message);

                // Reset form
                setEmployeeName("");
                setReview("");
                setRating(0);
                setPunctuality(0);
                setService(0);
                setCustomerFeedback(0);
                setManagerFeedback(0);
            }
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong!";
            toast.dismiss();
            toast.error(message);
        }
    };
    

    return (
        <Page>
            <h3 className="text-2xl"> Employee Feedback Form</h3>
            <div className="grid grid-cols-1 md:grid-cols-0 lg:grid-cols-1 gap-0 mt-2">

                <div className="mt-8 text-sm text-gray-500">
                    <div className="">
                        <label htmlFor="employee_name" className="block mb-1">
                            Employee Name
                        </label>
                        <select

                            name="employee_name"
                            id="employee_name"
                            value={employeeName}
                            onChange={(e) => setEmployeeName(e.target.value)}
                            className="block w-full h-10 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                            required
                        >
                            <option value="" disabled selected></option>
                            {employees.map((emp) => (
                                <option key={emp.employeeName} value={emp.employeeName}>
                                    {emp.employeeName} 
                                </option>
                            ))}

                        </select>
                    </div>

                    <div className="form-group mt-3">
                        <label>Punchuality</label>
                        <Rating value={punctuality} onChange={setPunctuality} />
                    </div>
                    <div className="form-group">
                        <label>Service</label>
                        <Rating value={service} onChange={setService} />

                    </div>
                    <div className="form-group">
                        <label>Customer feedback on staff</label>
                        <Rating value={customerFeedback} onChange={setCustomerFeedback} />
                        
                    </div>
                    <div className="form-group">
                        <label>Manager behaviour feedback on Employee</label>
                        <Rating value={managerFeedback} onChange={setManagerFeedback} />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="address" className="block mb-1">
                            Review
                        </label>
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            type="text"
                            name="review"
                            id="review"
                           
                            placeholder="Enter Review..."
                            className="block w-full h-20 lg:min-w-96 border rounded-lg px-4 py-2 bg-gray-50 outline-salespos-border-green-light"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Rating</label>
                        <Rating value={rating} onChange={setRating} />
                    </div>
                    <button onClick={handleSave} className="text-white w-full lg:min-w-96 bg-salespos-green transition hover:bg-salespos-green/80 active:scale-95 rounded-lg px-4 py-2 mt-6 outline-salespos-border-green-light">
                        Save
                    </button>
                </div>
            </div>
        </Page>
    )
}
