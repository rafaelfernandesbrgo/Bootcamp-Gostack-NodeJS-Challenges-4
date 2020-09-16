import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'outcome' | 'income';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;
    let total = 0;
    this.transactions.map(transaction => {
      if (transaction.type === 'income') {
        income += transaction.value;
        outcome += 0;
        total += transaction.value;
      } else {
        income += 0;
        outcome += transaction.value;
        total -= transaction.value;
      }
    });
    const balance: Balance = { income, outcome, total };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}


export default TransactionsRepository;
