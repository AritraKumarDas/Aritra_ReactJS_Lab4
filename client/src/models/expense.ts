interface IExpenseItemModel {
    expenseDescription: string,
    payeeName: string,
    price: number,
    date: Date,
    id: string
}

type IExpenseItemCreateModel = Omit<IExpenseItemModel, 'id'>

export type { IExpenseItemModel, IExpenseItemCreateModel };