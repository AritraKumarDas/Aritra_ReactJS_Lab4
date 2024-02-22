import { IExpenseItemModel } from "../models/expense";
import ExpenseItem from "./ExpenseItem";
import { Table } from "react-bootstrap";

type Props = {
    expenses: IExpenseItemModel[],
}

const ExpenseLister = (props: Props) => {
    const { expenses } = props
    return (

        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Product Purchased</th>
                    <th>Price</th>
                    <th>Payee</th>
                </tr>
            </thead>
            <tbody>
                {
                    expenses.map((expense) => (
                        <ExpenseItem key={expense.id} expense={expense} />
                    ))
                }


            </tbody>
        </Table>

    )
}

export default ExpenseLister;