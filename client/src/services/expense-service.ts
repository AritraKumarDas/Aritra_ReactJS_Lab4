import axios from "axios"
import { IExpenseItemCreateModel } from "../models/expense";

const fetchAllExpenses = async () => {

    const response = await axios.get('http://localhost:4000/expenses')

    console.log(response)
    return response.data;
}


const createNewExpenseItem = async (newExpense: IExpenseItemCreateModel) => {
    const response = await axios.post('http://localhost:4000/expenses', newExpense, {
        headers: {
            'Content-Type': 'application/ json'

        }
    })

    return response.data;

}

export { fetchAllExpenses, createNewExpenseItem }