import styled from "styled-components";
import TransactionList from "../components/transaction/TransactionList";
import TransactionDetail from "../components/transaction/TransactionDetail";
import { useTransactionStore } from "../store/transactionStore";

const Transactions = () => {
  const { selectedTransactionId } = useTransactionStore();
  const showDetail = selectedTransactionId !== null;

  return (
    <TransactionsStyle>
      <LeftSection $showDetail={showDetail}>
        <TransactionList />
      </LeftSection>

      {showDetail && <div className="divider" />}
      {showDetail && (
        <RightSection>
          <TransactionDetail />
        </RightSection>
      )}
    </TransactionsStyle>
  );
};

const TransactionsStyle = styled.div`
  display: flex;
  height: 100%;
  align-items: stretch;

  .divider {
    width: 1px;
    background-color: ${({ theme }) => theme.color.border};
    margin: 0 9px;
  }
`;

const LeftSection = styled.div<{ $showDetail: boolean }>`
  width: ${({ $showDetail }) => ($showDetail ? "60%" : "100%")};
  transition: width 0.3s ease;
  overflow-y: auto;
`;

const RightSection = styled.div`
  width: 40%;
  overflow-y: auto;
  padding: 5px;
`;

export default Transactions;
