import { Alert, Button, Form, Modal } from "react-bootstrap"
import { IExpenseItemModel, IExpenseItemCreateModel } from "../models/expense";
import { FormEvent, useRef, useState } from "react";
import { createNewExpenseItem } from "../services/expense-service";

type Props = {

    addExpense: (expense: IExpenseItemModel) => void,
}

const users = ["Rahul", "Ramesh"];

const AddExpense = (props: Props) => {

    const [show, setShow] = useState(false);
    const [error, setError] = useState<Error | null>(null)



    const handleClose = () => setShow(false);
    const handleShow = () => {

        setShow(true);
        setError(null);
    }

    const nameRef = useRef<HTMLSelectElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);

    const { addExpense } = props;

    const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("form submitted");

        const expenseDescription = descriptionRef?.current?.value;
        const payeeName = nameRef?.current?.value;
        const price = Number(priceRef?.current?.value);
        const date = new Date(dateRef?.current?.value as string);

        if (expenseDescription && payeeName && users.includes(payeeName) && price && date) {
            const newExpense: IExpenseItemCreateModel = {
                expenseDescription,
                payeeName,
                price,
                date
            }

            try {
                const response: IExpenseItemModel = await createNewExpenseItem(newExpense);
                addExpense(response);
                handleClose()

            } catch (e) {
                setError(e as Error);

            }


        }




    }

    return (
        <>
            <Button variant="success" onClick={handleShow} className="px-5"> Add </Button>

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={formSubmitHandler}>

                    <Modal.Header closeButton>
                        <Modal.Title>Add New Expense</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Select ref={nameRef} >
                                <option>Choose</option>
                                {users.map((user, idx) => <option key={idx} value={user}>{user}</option>)}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Product purchased</Form.Label>
                            <Form.Control type="text" ref={descriptionRef} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" ref={priceRef} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" ref={dateRef} />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button type="submit" variant="primary">Submit</Button>
                        <Button onClick={handleClose} variant="secondary">Close</Button>
                    </Modal.Footer>

                    {error && <Alert key="danger" variant="danger" className="mx-3">
                        {error.message}
                    </Alert>}
                </Form>



            </Modal>




        </>
    )
}

export default AddExpense;


