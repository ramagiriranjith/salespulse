import axios from "axios";
import ApiClient from "../helpers/ApiClient";
import useSWR from "swr";
import { API } from "../config/config";

const fetcher = (url) => ApiClient.get(url).then((res) => res.data);

export function useReports({ type, from = null, to = null }) {
  const APIURL = `/reports?type=${type}&from=${from}&to=${to}`;
  const { data, error, isLoading } = useSWR(APIURL, fetcher);
  return {
    data,
    error,
    isLoading,
    APIURL,
  };
}

export async function getItemSaleReport(startDate = null, endDate = null) {
  try {
    const response = await axios.get(`${API}/reports/item-sale-report`, {
      params : {startDate, endDate},
    });
    return response.data;
    
  } catch (error) {
      console.error("Error fetching sales report:", error);
      return [];
  }
  
}
export async function getCustomerDueReport(startDate = null, endDate = null) {
  try {
    const response = await axios.get(`${API}/reports/customer-due-report`, {
      params : {startDate, endDate},
    });
    return response.data;
    
  } catch (error) {
      console.error("Error fetching sales report:", error);
      return [];
  }
  
}
export async function getSupplierDueReport(startDate = null, endDate = null) {
  try {
    const response = await axios.get(`${API}/reports/supplier-due-report`, {
      params : {startDate, endDate},
    });
    return response.data;
    
  } catch (error) {
      console.error("Error fetching sales report:", error);
      return [];
  }
  
}
export async function getEmployees() {
  try {
    const response = await axios.get(`${API}/reports/employees`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching employees", error);
    return [];
  }
};

export async function getAttendanceReport(employeeId, startDate = null, endDate = null){
  try {
    const response = await axios.get(`${API}/reports/attendance-report`, {
      params: { employeeId, startDate, endDate },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching attendance report", error);
    return [];
  }
};
export async function getExpenseReport(period, startDate , endDate) {
  try {
    const response = await axios.get(`${API}/reports/expense-report`, {
      params: { period, startDate, endDate },
    });
    console.log(response);
    
    return response.data.data;
  } catch (error) {
    console.error("Error fetching expense report:", error);
    return [];
  }
};

export async function getSalesReport (period, startDate, endDate) {
  try {
      const response = await axios.get(`${API}/reports/sales-report`, {
          params: { period, startDate, endDate }
      });
      return response.data.data;
  } catch (error) {
      console.error("Error fetching sales report:", error);
      return null;
  }
}
export async function getStockAlertReport() {
  try {
    const response = await axios.get(`${API}/reports/stock-alert`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching stock alert report", error);
    return [];
  }
};

export async function getPurchaseReport(period, startDate , endDate) {
  try {
    const response = await axios.get(`${API}/reports/purchase-report`, {
      params: { period, startDate, endDate },
    });
    console.log(response);
    
    return response.data.data;
  } catch (error) {
    console.error("Error fetching purchasereport:", error);
    return [];
  }
};

export async function getWorkPeriodReport(startDate = null, endDate = null) {
  try {
    const response = await axios.get(`${API}/reports/work-period-report`, {
      params : {startDate, endDate},
    });
    console.log(response);
    return response.data;
    
  } catch (error) {
      console.error("Error fetching work period report:", error);
      return [];
  }
  
}
export async function getSaleSummaryReport(startDate = null , endDate = null) {
  try {
      const response = await axios.get(`${API}/reports/sale-summary-report`, {
          params: { startDate, endDate }
      });
      return response.data;
  } catch (error) {
      console.error("Error fetching sale summary report", error);
      return [];
  }
};
export async function getSaleDetailedReport(startDate = null , endDate = null) {
  try {
      const response = await axios.get(`${API}/reports/sale-detailed-report`, {
          params: { startDate, endDate }
      });
      return response.data;
  } catch (error) {
      console.error("Error fetching sale detailed report", error);
      return [];
  }
};
export async function getEmployeePerformance() {
  try {
      const response = await axios.get(`${API}/reports/employee-performance`);
      return response.data;
      
  } catch (error) {
      console.error('Error fetching employee performance:', error);
      return[];
  }
  
}