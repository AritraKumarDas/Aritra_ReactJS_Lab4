import { Table } from "react-bootstrap";
import { IExpenseItemModel } from "../models/expense";

type Props = {
    expenses: IExpenseItemModel[],

}

const SummaryLister = (props: Props) => {

    const { expenses } = props;

    const namedExpenses = new Map<string, number>();

    const getMaxPayeeName = () => {
        for (let [key, value] of namedExpenses.entries()) {
            if (value === Math.max(...namedExpenses.values())) {
                return key;
            }
        }
    }

    const getAllPayeeNames = (): string[] => {
        const uniquePayees: string[] = [];
        expenses.forEach((expense) => {
            if (!uniquePayees.includes(expense.payeeName)) {
                uniquePayees.push(expense.payeeName)
            }
        })
        return uniquePayees;
    }

    const getContributionByPayeeName = (payeeName: string): number => {

        const tot = expenses.reduce((acc, next) => {
            if (next.payeeName === payeeName) {
                return acc + next.price;
            } else return acc;
        }, 0)
        return tot;
    }

    const totalExpense = expenses.reduce((acc, next) => acc + next.price, 0)


    const allPayeeNames = getAllPayeeNames();



    return (
        <Table striped bordered hover>
            <thead>
                <th colSpan={3}><h3>Payee Summary</h3></th>
            </thead>

            <tbody>
                <tr><th>Total</th><td>{totalExpense}</td></tr>
                {
                    allPayeeNames.map((payee, idx) => {
                        namedExpenses.set(payee, getContributionByPayeeName(payee))
                        return <tr key={idx}><th>{payee} Paid</th><td>{namedExpenses.get(payee)}</td></tr>
                    })
                }
                <tr>

                    <th>{`Pay ${getMaxPayeeName()} : `}</th>
                    <td>{Math.max(...namedExpenses.values()) - Math.min(...namedExpenses.values())}</td>
                </tr>
            </tbody>

        </Table>
    )
}

export default SummaryLister;