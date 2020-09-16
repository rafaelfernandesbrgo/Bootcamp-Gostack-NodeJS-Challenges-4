import { Router } from 'express';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import ListTransactionBalanceService from '../services/ListTransactionBalanceService';

const transactionRouter = Router();
const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  const listTransactionBalanceService = new ListTransactionBalanceService(
    transactionsRepository,
  );
  const listTransactionBalance = listTransactionBalanceService.execute();
  return response.json(listTransactionBalance);
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    );
    const transaction = createTransactionService.execute({
      title,
      value,
      type,
    });
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
