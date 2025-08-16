import { useCallback, useState } from "react";
import { Alert, Platform } from "react-native";
import { API_URL } from "../constants/api";

// Use your laptop's IP for mobile, localhost for web
// const API_URL = Platform.OS === 'web' 
//   ? "http://localhost:5001/api"           // For web browser
//   : "http://10.62.106.16:5001/api";       // For  physical mobile testing - your laptop's IP

// const API_URL = "http://localhost:5001/api";

// for real project host backend on any service like render and from that copy  the url and use like this 
// const API_URL="http://url/api"    like this
export const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expense: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
//   useCallback is used for performance reasons , it will memoize the function 
  const fetchTransactions = useCallback(async()=>{
    try {
        const response = await fetch(`${API_URL}/transactions/${userId}`)
        const data = await response.json()
        setTransactions(data)
    } catch (error) {
        console.error("Error fetching Transactions :",error)
    }
  },[userId])

   const fetchSummary = useCallback(async()=>{
    try {
        const response = await fetch(`${API_URL}/transactions/summary/${userId}`)
        const data = await response.json()
        setSummary(data)
    } catch (error) {
        console.error("Error fetching Transactions :",error)
    }
  },[userId])

  const loadData = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true)
    try {
        await Promise.all([fetchTransactions(),fetchSummary()])
    } catch (error) {
        console.error("Error loading  Data", error)
    }finally{
        setIsLoading(false)
    }
  },[fetchTransactions,fetchSummary,userId])


  const deleteTransaction = async (id) => {
    try {
        const response = await fetch(`${API_URL}/transactions/${id}`, {method:"DELETE"})
        if(!response.ok) throw new Error("Failed to delete Transaction")
            // refresh data after deletion
loadData()
Alert.alert("Success","Transaction Deleted Successfully")
    } catch (error) {
        console.error("Error deleting transaction",error)
        Alert.alert("Error",error.message)
    }
  }
  return{transactions,summary,isLoading,loadData,deleteTransaction}
};
