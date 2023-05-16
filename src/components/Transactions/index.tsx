import { useCallback } from "react";
import { useCustomFetch } from "src/hooks/useCustomFetch";
import { SetTransactionApprovalParams } from "src/utils/types";
import { TransactionPane } from "./TransactionPane";
import { SetTransactionApprovalFunction, TransactionsComponent } from "./types";

export const Transactions: TransactionsComponent = ({ transactions }) => {
  /* bug-7 fix: added a call to the `clearCacheByEndpoint` fuction (see useCustomFetch.ts)
  in the useCustomFetch() hook in order to clear the cacheded data for the 
  `paginatedTransactions` and `transactionsByEmployee` endpoints specifically. See line 24.
  This bug can technically be fixed using the clearCache() function, however, this clears
  the entire cache. This is inefficent as it will also remove useful cached data for `employees`
  and `setTransactionApproval`, causing unnecessary refetching of data, slowing down the application.*/
  const { fetchWithoutCache, clearCacheByEndpoint, loading } = useCustomFetch();

  const setTransactionApproval = useCallback<SetTransactionApprovalFunction>(
    async ({ transactionId, newValue }) => {
      await fetchWithoutCache<void, SetTransactionApprovalParams>(
        "setTransactionApproval",
        {
          transactionId,
          value: newValue,
        }
      );
      // clear cacheded data for paginatedTransactions and transactionsByEmployee only
      clearCacheByEndpoint(["paginatedTransactions", "transactionsByEmployee"]);
    },
    [fetchWithoutCache, clearCacheByEndpoint]
  );

  if (transactions === null) {
    return <div className="RampLoading--container">Loading...</div>;
  }

  return (
    <div data-testid="transaction-container">
      {transactions.map((transaction) => (
        <TransactionPane
          key={transaction.id}
          transaction={transaction}
          loading={loading}
          setTransactionApproval={setTransactionApproval}
        />
      ))}
    </div>
  );
};
