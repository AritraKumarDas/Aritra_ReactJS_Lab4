import React, { useEffect, useState } from 'react'
import { fetchAllExpenses } from '../services/expense-service';
import { IExpenseItemModel } from '../models/expense';
import ExpenseLister from './ExpenseLister';
import { Col, Container, Row } from 'react-bootstrap';
import SummaryLister from './SummaryLister';
import AddExpenseForm from './AddExpenseForm';

const Home = () => {
    const [expenses, setExpenses] = useState<IExpenseItemModel[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)




    useEffect(() => {

        const helper = async () => {
            try {
                const data = await fetchAllExpenses()
                setLoading(false)
                setExpenses(data);
            } catch (err) {
                setLoading(false);
                setError(err as Error);
            }
        }

        helper();

    }, [])


    const addExpense = (newExpense: IExpenseItemModel) => {

        setExpenses((prev) => [...prev, newExpense])
    }

    return (
        <Container className="m-5">
            <Row>
                <Col className="bg-warning my-2"><h2 className="my-2">Expense Tracker</h2></Col>
            </Row>
            <Row>
                <Col md={9}>
                    {loading && <div>Loading</div>}
                    {!loading && error && <div>{error?.message}</div>}
                    {!loading && !error && <ExpenseLister expenses={expenses} />}
                </Col>
                <Col>
                    <AddExpenseForm addExpense={addExpense} />
                </Col>
            </Row>
            <Row>
                <Col md={9}>
                    <SummaryLister expenses={expenses}></SummaryLister>
                </Col>
            </Row>

        </Container>
    )
}

export default Home;
