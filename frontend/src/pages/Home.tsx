import styled from "styled-components";
import StockListTable from "@/components/stock/StockTableList";

const Home = () => {
  return (
    <HomeStyle>
      <StockListTable />
    </HomeStyle>
  );
};

const HomeStyle = styled.div`
  h1 {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

export default Home;
