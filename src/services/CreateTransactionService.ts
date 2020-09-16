import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'outcome' | 'income';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const ListTransactionBalance = this.transactionsRepository.getBalance();

    if (!(type === 'income' || type === 'outcome')) {
      throw Error('Error type');
    }

    if (type === 'outcome' && value > ListTransactionBalance.total) {
      throw Error('Its can not afford');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
