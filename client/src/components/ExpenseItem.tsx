import { IExpenseItemModel } from "../models/expense";

type Props = {
    expense: IExpenseItemModel,
}
const ExpenseItem = (props: Props) => {
    const { expenseDescription, price, date, payeeName } = props.expense;
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth() + 1;
    const day = new Date(date).getDate();
    const formatted_date = `${year}-${month}-${day}`

    return (
        <tr>

            <td>{formatted_date}</td>
            <td>{expenseDescription}</td>
            <td>{price}</td>
            <td>{payeeName}</td>
        </tr>
    )
}

export default ExpenseItem;

