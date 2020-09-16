import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface ListTransactioBalace {
  transactions: Transaction[];
  balance: Balance;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class ListTransactionBalanceService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): ListTransactioBalace {
    const transactions = this.transactionsRepository.all();
    const balance = this.transactionsRepository.getBalance();
    const listTransactioBalace = { transactions, balance };
    return listTransactioBalace;
  }
}

export default ListTransactionBalanceService;
